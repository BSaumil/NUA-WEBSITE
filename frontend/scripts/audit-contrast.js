#!/usr/bin/env node
/**
 * Contrast audit against a real build.
 *
 * Run with:  node scripts/audit-contrast.js        (expects ./build to exist)
 *
 * This lives in the repo rather than in a scratch directory because every
 * contrast bug that has reached production so far got there the same way: the
 * audit did not look at that thing. Keeping it next to the code it checks is
 * the only version of this that stays true.
 *
 * Four categories were added after each one hid a real, shipped failure:
 *
 *   text            the original sweep
 *   icons           SVGs have no textContent, so a selector built from
 *                   h1..p,span,a was never going to see a charcoal icon on a
 *                   burgundy fill (measured 1.35:1 on the homepage hero)
 *   clipped text    .text-shimmer paints through background-clip and computes
 *                   to color: transparent, so an alpha guard skipped it. Its
 *                   gradient began and ended at #eaeaea — 1.13:1 on ivory —
 *                   across the homepage h1
 *   hover states    a button whose hover fill and hover text both changed was
 *                   only ever measured at rest (1.1:1 on hover)
 *   dialogs         the lead capture form is behind a click, so nothing in it
 *                   had ever been measured (1.24:1)
 *
 * KNOWN GAP: LEAD_CAPTURE_ENABLED is currently false in src/config/siteConfig,
 * so the lead dialog and both "Start Free Trial" buttons never render and this
 * audit cannot reach them — a clean run says nothing about those paths. Two
 * real failures were found there by reading the source (charcoal on #0f0f17 in
 * the dialog at 1.24:1, and a hover state painting white text on a 10% wash)
 * and both are fixed, but they are unverified by measurement. Re-run this with
 * the flag flipped to true before that feature is switched on.
 *
 * Thresholds are WCAG 2.1 AA: 4.5:1 body text, 3.0:1 large text, and 3.0:1 for
 * icons and other non-text UI components (1.4.11).
 */
const http = require("http");
const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");

const BUILD = path.join(__dirname, "..", "build");
const PORT = 5611;
const CHROME =
  process.env.CHROMIUM_PATH || "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";

const TYPES = {
  ".html": "text/html", ".css": "text/css", ".js": "application/javascript",
  ".webp": "image/webp", ".png": "image/png", ".svg": "image/svg+xml",
  ".ico": "image/x-icon", ".json": "application/json", ".woff2": "font/woff2",
  ".xml": "application/xml", ".txt": "text/plain",
};

const PAGES = [
  "/", "/pricing", "/restaurant-pos", "/cafe-pos", "/bar-pos", "/hospitality-pos",
  "/retail-pos", "/services-pos", "/docs/pos", "/contact", "/compare/toast",
  "/savings", "/about", "/blog", "/security", "/terms", "/privacy", "/gallery",
  "/features", "/platform", "/ai-agent", "/resources", "/integrations", "/careers",
  "/press", "/status", "/solutions", "/customers", "/docs", "/compare",
  "/blog/ai-rostering-forecast-not-guess", "/solutions/bars",
];

function resolveFile(url) {
  const clean = decodeURIComponent(url.split("?")[0]);
  const target = path.resolve(BUILD, "." + path.posix.normalize(clean));
  if (!target.startsWith(BUILD)) return null;
  if (fs.existsSync(target) && fs.statSync(target).isFile()) return target;
  const index = path.join(target, "index.html");
  return fs.existsSync(index) ? index : null;
}

const server = http.createServer((req, res) => {
  const file = resolveFile(req.url);
  if (!file) { res.writeHead(404); return res.end("not found"); }
  res.writeHead(200, { "Content-Type": TYPES[path.extname(file)] || "application/octet-stream" });
  fs.createReadStream(file).pipe(res);
});

/** Injected into the page. Returns every failing pair it can see. */
function collect() {
  const lin = (c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  const L = ([r, g, b]) => 0.2126 * lin(r / 255) + 0.7152 * lin(g / 255) + 0.0722 * lin(b / 255);
  const parse = (s) => { const m = s && s.match(/\d+(\.\d+)?/g); return m ? m.slice(0, 3).map(Number) : null; };
  // Count the components rather than grabbing the last number before the
  // paren: `rgb(117, 13, 40)` matches an `rgba?\(...([\d.]+)\)` pattern too,
  // and yields 40 — the blue channel — as the alpha.
  const alpha = (s) => {
    const m = s && s.match(/rgba?\(([^)]*)\)/);
    if (!m) return 1;
    const parts = m[1].split(/[,/\s]+/).filter(Boolean);
    return parts.length >= 4 ? parseFloat(parts[3]) : 1;
  };
  const ratio = (a, b) => { const l1 = L(a), l2 = L(b); return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05); };

  const IVORY = [250, 248, 243];

  // Composite a translucent fill over what is behind it, rather than walking
  // past it. The old version skipped anything under 0.5 alpha, which meant a
  // /15 wash was treated as the page background it sat on.
  function bgOf(el) {
    const stack = [];
    let n = el;
    while (n && n !== document.documentElement) {
      const cs = getComputedStyle(n);
      const bc = cs.backgroundColor;
      if (bc && bc !== "rgba(0, 0, 0, 0)") {
        const a = alpha(bc), rgb = parse(bc);
        if (rgb) { if (a >= 0.995) { stack.push([rgb, 1]); break; } stack.push([rgb, a]); }
      }
      // A gradient is a background-image, so reading backgroundColor alone
      // walks straight past it to the page behind — that reported white text
      // on a burgundy gradient badge as white-on-ivory.
      //
      // Stops must keep their alpha. `linear-gradient(135deg, #8b5cf60D,
      // #FFFDF9)` is a 5% tint over near-white; averaging the raw stop values
      // and discarding the 0.05 turns it into a bright pastel that nothing on
      // the page is actually sitting on. So the stops are recorded here and
      // composited over the real backdrop below, then averaged.
      const bi = cs.backgroundImage;
      if (bi && bi !== "none" && /gradient\(/.test(bi)) {
        const stops = (bi.match(/rgba?\([^)]*\)/g) || [])
          .map((s) => ({ rgb: parse(s), a: alpha(s) }))
          .filter((s) => s.rgb);
        if (stops.length) stack.push([null, null, stops]);
      }
      n = n.parentElement;
    }
    let out = stack.length && stack[stack.length - 1][1] === 1 ? stack.pop()[0] : IVORY.slice();
    for (let i = stack.length - 1; i >= 0; i--) {
      const [rgb, a, stops] = stack[i];
      if (stops) {
        // Composite every stop over what is behind it, then average those
        // results — not the raw stop values.
        const composited = stops.map((s) =>
          [0, 1, 2].map((k) => s.rgb[k] * s.a + out[k] * (1 - s.a)));
        out = [0, 1, 2].map((k) =>
          composited.reduce((sum, c) => sum + c[k], 0) / composited.length);
        continue;
      }
      out = [0, 1, 2].map((k) => rgb[k] * a + out[k] * (1 - a));
    }
    return out.map(Math.round);
  }

  const visible = (el) => {
    const r = el.getBoundingClientRect();
    if (r.width < 4 || r.height < 4) return false;
    const cs = getComputedStyle(el);
    return !(cs.visibility === "hidden" || cs.display === "none" || parseFloat(cs.opacity) < 0.5);
  };

  const out = [];
  const push = (kind, el, fg, bg, need, note) => {
    const r = ratio(fg, bg);
    if (r >= need) return;
    out.push({
      kind, need,
      ratio: +r.toFixed(2),
      fg: `rgb(${fg.map(Math.round).join(", ")})`,
      bg: `rgb(${bg.join(", ")})`,
      t: (note || el.textContent || "").trim().slice(0, 42),
    });
  };

  // --- 1. text -------------------------------------------------------------
  for (const el of document.querySelectorAll("h1,h2,h3,h4,h5,h6,p,span,a,li,label,button,td,th,dt,dd,figcaption,strong,em")) {
    if (!el.textContent.trim()) continue;
    if (!visible(el)) continue;
    if (el.querySelector("h1,h2,h3,h4,h5,h6,p,span,a,li,label,button,td,th,dt,dd,figcaption,strong,em")) continue;
    const cs = getComputedStyle(el);
    const bg = bgOf(el);
    const size = parseFloat(cs.fontSize);
    const large = size >= 24 || (size >= 18.66 && parseInt(cs.fontWeight, 10) >= 700);
    const need = large ? 3.0 : 4.5;

    // --- 2. text painted through a clipped background ----------------------
    const clip = cs.webkitBackgroundClip || cs.backgroundClip;
    if (clip === "text" && alpha(cs.color) < 0.6) {
      // The element's own gradient is the INK here, not the ground, so the
      // ground has to come from its parent — otherwise every stop is measured
      // against the average of the stops it belongs to and reads about 1:1.
      const inkBg = bgOf(el.parentElement || el);
      const stops = (cs.backgroundImage.match(/rgba?\([^)]*\)|#[0-9a-fA-F]{6}/g) || []);
      for (const stop of stops) {
        const rgb = stop.startsWith("#")
          ? [1, 3, 5].map((i) => parseInt(stop.substr(i, 2), 16))
          : parse(stop);
        if (rgb) push("clipped", el, rgb, inkBg, need, el.textContent);
      }
      continue;
    }

    if (alpha(cs.color) < 0.6) continue;
    const fg = parse(cs.color);
    if (fg) push("text", el, fg, bg, need);
  }

  // --- 3. icons ------------------------------------------------------------
  // Lucide renders stroke="currentColor", so the computed color IS the ink.
  for (const el of document.querySelectorAll("svg")) {
    if (!visible(el)) continue;
    if (el.closest("[data-testid='navbar-logo'], footer a[href='/']")) continue; // brand mark, intentionally multicolour
    const cs = getComputedStyle(el);
    const stroke = cs.stroke && cs.stroke !== "none" ? cs.stroke : null;
    const fill = cs.fill && cs.fill !== "none" && cs.fill !== "rgb(0, 0, 0)" ? cs.fill : null;
    const inkStr = stroke || fill || cs.color;
    if (alpha(inkStr) < 0.6) continue;
    const ink = parse(inkStr);
    if (!ink) continue;
    // A multicolour mark paints its own children; only judge single-ink icons.
    if (el.querySelector("[fill]:not([fill='none']):not([fill='currentColor'])")) continue;
    push("icon", el, ink, bgOf(el), 3.0, el.getAttribute("class") || "svg");
  }

  return out;
}

const key = (o) => `${o.kind}|${o.fg}|${o.bg}|${o.need}`;

(async () => {
  if (!fs.existsSync(BUILD)) {
    console.error(`No build at ${BUILD}. Run \`yarn build\` first.`);
    process.exit(2);
  }
  await new Promise((r) => server.listen(PORT, "127.0.0.1", r));
  const browser = await chromium.launch({ executablePath: CHROME });
  let total = 0;

  for (const url of PAGES) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });
    await page.goto(`http://127.0.0.1:${PORT}${url}`, { waitUntil: "networkidle" });
    await page.waitForTimeout(400);

    const seen = new Set();
    const bad = [];
    for (const o of await page.evaluate(collect)) {
      if (seen.has(key(o))) continue;
      seen.add(key(o));
      bad.push(o);
    }

    // --- 4. hover states ---------------------------------------------------
    // One representative per distinct class signature: 60 buttons on a page are
    // rarely more than a handful of actual styles.
    const hoverTargets = await page.evaluate(() => {
      const sigs = new Map();
      for (const el of document.querySelectorAll("a,button")) {
        const r = el.getBoundingClientRect();
        if (r.width < 8 || r.height < 8) continue;
        // Deliberately NOT limited to the initial viewport: page.hover()
        // scrolls an element into view itself, and the first version of this
        // filtered to `top <= innerHeight`, which silently excluded every
        // footer and final-CTA control — including the one button whose hover
        // state was actually broken.
        const sig = el.className.toString();
        if (!sig || sigs.has(sig)) continue;
        el.setAttribute("data-audit-hover", String(sigs.size));
        sigs.set(sig, true);
      }
      return sigs.size;
    });

    for (let i = 0; i < hoverTargets; i++) {
      const sel = `[data-audit-hover="${i}"]`;
      try {
        await page.hover(sel, { timeout: 800 });
        // Re-scan the whole page with the hover applied. Everything unchanged
        // dedupes against `seen`, so what survives is what the hover altered.
        for (const o of await page.evaluate(collect)) {
          const k = `hover|${key(o)}`;
          if (seen.has(k)) continue;
          seen.add(k);
          bad.push({ ...o, kind: `${o.kind}:hover` });
        }
      } catch { /* element moved or is covered; not a contrast finding */ }
    }

    // --- 5. dialogs --------------------------------------------------------
    const triggers = await page.$$("[data-testid$='-demo-btn'], [data-testid$='-trial-btn']");
    if (triggers.length) {
      try {
        await triggers[0].click({ timeout: 1500 });
        await page.waitForSelector("[data-testid='lead-dialog']", { timeout: 2000 });
        await page.waitForTimeout(350);
        for (const o of await page.evaluate(collect)) {
          const k = `dialog|${key(o)}`;
          if (seen.has(k)) continue;
          seen.add(k);
          bad.push({ ...o, kind: `${o.kind}:dialog` });
        }
      } catch { /* no lead dialog on this page */ }
    }

    if (bad.length) {
      console.log(`\n${url}  — ${bad.length} distinct failing pair(s)`);
      for (const o of bad.slice(0, 8)) {
        console.log(`   [${o.kind}] ${o.ratio}:1 (needs ${o.need})  ${o.fg} on ${o.bg}  "${o.t}"`);
      }
    }
    total += bad.length;
    await page.close();
  }

  console.log(`\n=== ${total} distinct failing pairs across ${PAGES.length} pages ===`);
  await browser.close();
  server.close();
  process.exit(total === 0 ? 0 : 1);
})();
