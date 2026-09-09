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
    // Take the pathname rather than string-stripping SITE_URL: if the sitemap
    // was generated under a different origin (a stale file, or a build whose
    // prebuild hook did not run), stripping would silently leave a full URL
    // here and every route would fail to navigate.
    .map((m) => new URL(m[1]).pathname)
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
    let filePath;
    try {
      // decodeURIComponent throws URIError on malformed escapes (a bare "%").
      // Uncaught inside a request handler that kills the whole process, so the
      // build dies mid-run and neither the browser nor the server is closed.
      const urlPath = decodeURIComponent(req.url.split("?")[0]);
      // Resolve, then confirm the result is still inside BUILD_DIR: path.join
      // happily walks out of the root on "/../../etc/passwd".
      filePath = path.resolve(BUILD_DIR, "." + path.posix.normalize(urlPath));
      if (filePath !== BUILD_DIR && !filePath.startsWith(BUILD_DIR + path.sep)) {
        res.writeHead(403, { "Content-Type": "text/plain" });
        return res.end("Forbidden");
      }
    } catch {
      res.writeHead(400, { "Content-Type": "text/plain" });
      return res.end("Bad Request");
    }

    let stat = null;
    try {
      stat = fs.statSync(filePath);
    } catch {
      /* missing file falls through to the SPA shell, as before */
    }
    if (!stat || stat.isDirectory()) {
      res.writeHead(200, { "Content-Type": "text/html" });
      return res.end(shellHtml);
    }

    const ext = path.extname(filePath);
    res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
    const stream = fs.createReadStream(filePath);
    // A read error after headers are sent can't be turned into a status code;
    // destroy the socket rather than letting the 'error' event go unhandled.
    stream.on("error", () => res.destroy());
    return stream.pipe(res);
  });
  // Bind to loopback explicitly. listen(PORT) alone binds 0.0.0.0, exposing the
  // build directory to anything that can reach the CI runner or dev machine.
  return new Promise((resolve) => server.listen(PORT, "127.0.0.1", () => resolve(server)));
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
      // A nested route is served from build/<route>/index.html, so any relative
      // asset path resolves against that directory and 404s ("./static/..." at
      // /pricing/ becomes /pricing/static/...), leaving a blank page for real
      // visitors while the prerendered HTML still looks fine to the verifier.
      // CRA emits absolute paths while package.json "homepage" is an absolute
      // URL; this rewrites them if that ever changes to a relative value.
      html = html.replace(/(src|href)="\.\/(static\/|favicon|manifest)/g, '$1="/$2');

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
