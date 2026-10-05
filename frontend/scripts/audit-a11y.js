#!/usr/bin/env node
/**
 * Accessibility audit against a real build.
 *
 * Run with:  node scripts/audit-a11y.js        (expects ./build to exist)
 *
 * Companion to audit-contrast.js, and written because that one's existence was
 * not enough: four rounds went into measuring 1.4.3 contrast to two decimal
 * places while 2.4.7 Focus Visible — the same conformance level — failed on
 * every page, because nothing was looking for it. Hand-picking the checks you
 * happen to think of is how that happens, so this runs axe-core, which is the
 * standard rule engine, rather than a list of my own guesses.
 *
 * axe is configured for WCAG 2.1 A and AA. Colour contrast is excluded here:
 * audit-contrast.js already measures it, composites translucent grounds and
 * gradients, and covers icons, clipped text, hover and dialog states, which
 * axe does not. Running both would double-report and the weaker check would
 * set the standard.
 *
 * Three checks axe cannot make are added afterwards, each covering something
 * that was actually broken on this site:
 *
 *   skip link       present, first in tab order, and actually targets an
 *                   element that exists
 *   landmarks       header/main/footer are siblings, not nested. <main> used
 *                   to wrap the navbar and footer, which makes "skip to main
 *                   content" meaningless because main starts at the top
 *   focus ring      every interactive element's computed style actually
 *                   CHANGES under :focus-visible. A rule can exist in the
 *                   stylesheet and still be overridden to nothing, so this
 *                   measures the rendered difference rather than trusting it
 */
const http = require("http");
const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");

const BUILD = path.join(__dirname, "..", "build");
const AXE = require.resolve("axe-core");
const PORT = 5641;
// Let Playwright resolve its own browser by default. An absolute path here
// only works on the machine it was written for: CI installs Chromium to
// Playwright's own cache, so a hardcoded sandbox path would fail every run.
// CHROMIUM_PATH overrides it where a specific build has to be used.
const CHROME = process.env.CHROMIUM_PATH || undefined;

const TYPES = {
  ".html": "text/html", ".css": "text/css", ".js": "application/javascript",
  ".webp": "image/webp", ".png": "image/png", ".svg": "image/svg+xml",
  ".ico": "image/x-icon", ".json": "application/json", ".woff2": "font/woff2",
  ".xml": "application/xml", ".txt": "text/plain",
};

// The same route list audit-contrast.js uses, for the same reason: every page
// type, not a sample. A page type nobody audits is where the next one hides.
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

/** Structural checks axe does not make. Runs in the page. */
function structural() {
  const out = [];

  // --- skip link ---------------------------------------------------------
  const focusables = Array.from(
    document.querySelectorAll('a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])')
  ).filter((el) => {
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    // sr-only elements are clipped to 1px but still in tab order, which is
    // exactly what a skip link is, so size alone cannot be the filter.
    return cs.visibility !== "hidden" && cs.display !== "none" && (r.width > 0 || r.height > 0 || el.className.includes("sr-only"));
  });
  const skip = document.querySelector('[data-testid="skip-to-content"]');
  if (!skip) {
    out.push({ id: "skip-link-missing", impact: "serious", help: "No skip link" });
  } else {
    if (focusables[0] !== skip) {
      out.push({ id: "skip-link-not-first", impact: "serious", help: "Skip link is not the first focusable element" });
    }
    const target = document.querySelector(skip.getAttribute("href"));
    if (!target) {
      out.push({ id: "skip-link-target-missing", impact: "serious", help: `Skip link points at ${skip.getAttribute("href")}, which does not exist` });
    }
  }

  // --- landmark nesting --------------------------------------------------
  const main = document.querySelector("main");
  if (!main) {
    out.push({ id: "no-main", impact: "serious", help: "No <main> landmark" });
  } else {
    if (main.querySelector("header")) {
      out.push({ id: "header-inside-main", impact: "moderate", help: "<header> is nested inside <main>" });
    }
    if (main.querySelector("footer")) {
      out.push({ id: "footer-inside-main", impact: "moderate", help: "<footer> is nested inside <main>" });
    }
  }

  return out;
}

const key = (v) => `${v.id}|${v.help}`;

(async () => {
  if (!fs.existsSync(BUILD)) {
    console.error(`No build at ${BUILD}. Run \`yarn build\` first.`);
    process.exit(2);
  }
  const axeSource = fs.readFileSync(AXE, "utf8");

  await new Promise((r) => server.listen(PORT, "127.0.0.1", r));
  const browser = await chromium.launch({ executablePath: CHROME });
  let total = 0;

  for (const url of PAGES) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });
    await page.goto(`http://127.0.0.1:${PORT}${url}`, { waitUntil: "networkidle" });
    await page.waitForTimeout(400);

    const findings = [];

    // --- axe-core ---------------------------------------------------------
    await page.addScriptTag({ content: axeSource });
    const results = await page.evaluate(async () => {
      return await window.axe.run(document, {
        runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"] },
        // Measured properly by audit-contrast.js, which handles the cases axe
        // cannot: translucent grounds, gradients, background-clip text, icons,
        // hover and dialog states.
        rules: { "color-contrast": { enabled: false } },
      });
    });
    for (const v of results.violations) {
      findings.push({ id: v.id, impact: v.impact, help: v.help, nodes: v.nodes.length });
    }

    // --- structural -------------------------------------------------------
    for (const v of await page.evaluate(structural)) findings.push(v);

    // --- focus ring actually renders --------------------------------------
    // A :focus-visible rule can exist and still be overridden to nothing. The
    // only trustworthy check is to focus the element and compare what paints.
    const focusGaps = await page.evaluate(() => {
      const sigSeen = new Set();
      const gaps = [];
      const els = Array.from(document.querySelectorAll("a[href], button"))
        .filter((el) => {
          const r = el.getBoundingClientRect();
          if (r.width <= 8 || r.height <= 8) return false;
          // A disabled control is correctly not focusable, so .focus() is a
          // no-op and the computed style cannot change. Flagging it reports a
          // missing focus ring on something that must never take focus — the
          // first version of this check did exactly that on the blog
          // pagination arrows, which are disabled on the first and last page.
          if (el.disabled || el.getAttribute("aria-disabled") === "true") return false;
          if (el.tabIndex < 0) return false;
          return true;
        });
      for (const el of els) {
        const sig = el.tagName + "|" + el.className.toString();
        if (sigSeen.has(sig)) continue;
        sigSeen.add(sig);

        const before = getComputedStyle(el);
        const rest = `${before.outlineStyle}|${before.outlineWidth}|${before.boxShadow}`;
        el.focus();
        const after = getComputedStyle(el);
        const focused = `${after.outlineStyle}|${after.outlineWidth}|${after.boxShadow}`;
        el.blur();

        // :focus-visible only matches keyboard focus; .focus() from script
        // counts, which is what makes this measurable at all.
        if (rest === focused) {
          gaps.push({
            id: "focus-not-visible",
            impact: "serious",
            help: `No rendered focus indicator: <${el.tagName.toLowerCase()} class="${el.className.toString().slice(0, 60)}">`,
          });
        }
      }
      return gaps;
    });
    for (const g of focusGaps) findings.push(g);

    // --- report -----------------------------------------------------------
    const seen = new Set();
    const unique = findings.filter((f) => {
      if (seen.has(key(f))) return false;
      seen.add(key(f));
      return true;
    });

    if (unique.length) {
      console.log(`\n${url}  — ${unique.length} issue(s)`);
      for (const f of unique.slice(0, 8)) {
        const n = f.nodes ? ` (${f.nodes} node${f.nodes === 1 ? "" : "s"})` : "";
        console.log(`   [${f.impact || "n/a"}] ${f.id}: ${f.help}${n}`);
      }
    }
    total += unique.length;
    await page.close();
  }

  console.log(`\n=== ${total} accessibility issue(s) across ${PAGES.length} pages ===`);
  await browser.close();
  server.close();
  process.exit(total === 0 ? 0 : 1);
})();
