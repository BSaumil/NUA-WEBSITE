/**
 * Build-time prerenderer.
 *
 * The app is a client-rendered CRA SPA, so the raw HTML GitHub Pages serves is
 * just `<div id="root"></div>` plus a JS bundle. Crawlers that don't execute
 * JavaScript (and Google's own indexing pass, which defers rendering) see no
 * product story at all.
 *
 * This renders every public route in a real browser at build time and writes
 * the resulting HTML to build/<route>/index.html, so GitHub Pages serves a
 * complete document per URL. React still boots on top of it for interactivity.
 *
 * Routes come from public/sitemap.xml, which is itself generated from the
 * route table + data files (see generate-sitemap.js), so the two can't drift.
 *
 * NotFound is rendered into 404.html. GitHub Pages serves that with a real 404
 * status, which replaces the previous redirect-to-index soft-404 behaviour.
 */
const fs = require("fs");
const path = require("path");
const http = require("http");

const BUILD_DIR = path.join(__dirname, "..", "build");
const SITE_URL = "https://nuapos.com.au";
const PORT = 45678;

function loadPlaywright() {
  try {
    return require("playwright").chromium;
  } catch (e) {
    return require("/opt/node22/lib/node_modules/playwright").chromium;
  }
}

function routesFromSitemap() {
  const xml = fs.readFileSync(path.join(BUILD_DIR, "sitemap.xml"), "utf8");
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((m) => m[1].replace(SITE_URL, ""))
    .map((r) => (r === "" ? "/" : r));
}

const MIME = {
  ".html": "text/html", ".js": "text/javascript", ".css": "text/css",
  ".json": "application/json", ".png": "image/png", ".jpg": "image/jpeg",
  ".svg": "image/svg+xml", ".ico": "image/x-icon", ".woff2": "font/woff2",
  ".webmanifest": "application/manifest+json", ".xml": "application/xml",
  ".txt": "text/plain",
};

// Static file server that falls back to the app shell, so client-side routes
// resolve during prerendering exactly as they would in the browser.
//
// The shell is read into memory once, up front. Prerendering writes back into
// build/ (including build/index.html for "/"), so reading it from disk per
// request would serve an already-rendered page as the template for the next
// route and compound stale markup across the run.
function startServer(shellHtml) {
  const server = http.createServer((req, res) => {
    const urlPath = decodeURIComponent(req.url.split("?")[0]);
    const filePath = path.join(BUILD_DIR, urlPath);
    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      res.writeHead(200, { "Content-Type": "text/html" });
      return res.end(shellHtml);
    }
    const ext = path.extname(filePath);
    res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
    return fs.createReadStream(filePath).pipe(res);
  });
  return new Promise((resolve) => server.listen(PORT, () => resolve(server)));
}

function outputPathFor(route) {
  if (route === "/404") return path.join(BUILD_DIR, "404.html");
  if (route === "/") return path.join(BUILD_DIR, "index.html");
  return path.join(BUILD_DIR, route, "index.html");
}

(async () => {
  const chromium = loadPlaywright();
  const routes = routesFromSitemap();
  // /404 isn't in the sitemap (correctly — it shouldn't be indexed), but it
  // still needs rendering so unknown URLs get real content with a 404 status.
  const allRoutes = [...routes, "/404"];

  const shellHtml = fs.readFileSync(path.join(BUILD_DIR, "index.html"), "utf8");
  const server = await startServer(shellHtml);
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

  // Third-party requests (analytics, font CDNs) are irrelevant to the HTML we
  // capture and can hang or stall the render, so drop them. Everything needed
  // to build the markup is served from the local build directory.
  await page.route("**/*", (route) => {
    const url = route.request().url();
    if (url.startsWith(`http://127.0.0.1:${PORT}`)) return route.continue();
    return route.abort();
  });

  let written = 0;
  const failures = [];

  for (const route of allRoutes) {
    try {
      await page.goto(`http://127.0.0.1:${PORT}${route}`, {
        waitUntil: "domcontentloaded",
        timeout: 30000,
      });
      // Wait for the route's own shell, not just any child of #root: routes are
      // code-split, so there's a window where the container is mounted but the
      // chunk hasn't rendered yet. Every page renders <main data-testid="...">.
      await page.waitForSelector("main[data-testid]", { timeout: 20000 });
      // Let the SEO effect write title/meta/canonical/JSON-LD into <head>.
      await page.waitForFunction(
        () => document.querySelector('link[rel="canonical"]') !== null
          || document.querySelector('meta[name="robots"]') !== null,
        { timeout: 10000 },
      );
      await page.waitForTimeout(150);

      // Framer Motion's scroll-triggered sections start at inline opacity:0
      // until they scroll into view. Below-the-fold copy is in the DOM either
      // way, but serving it visible avoids handing crawlers a page of
      // zero-opacity text. Only elements Framer actually touched are adjusted,
      // and this affects the static file only — React re-mounts on boot, so
      // real visitors still get the animations.
      await page.evaluate(() => {
        document.querySelectorAll('[style*="opacity"]').forEach((el) => {
          if (el.style.opacity === "0") el.style.opacity = "1";
          if (el.style.transform) el.style.transform = "none";
        });
      });

      let html = await page.content();
      // Absolute asset paths so the document works from any nested route depth.
      html = html.replace(/(src|href)="\/static\//g, '$1="/static/');

      const outPath = outputPathFor(route);
      fs.mkdirSync(path.dirname(outPath), { recursive: true });
      fs.writeFileSync(outPath, html);
      written++;
    } catch (err) {
      failures.push(`${route}: ${err.message.split("\n")[0]}`);
    }
  }

  await browser.close();
  server.close();

  console.log(`prerender: wrote ${written}/${allRoutes.length} routes`);
  if (failures.length) {
    console.error("prerender FAILED for:");
    failures.forEach((f) => console.error("  " + f));
    process.exit(1);
  }
})();
