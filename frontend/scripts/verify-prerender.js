/**
 * Post-prerender safety net.
 *
 * Prerendering can fail quietly: a route still gets a file written, but the
 * file contains the empty app shell instead of the page. That reintroduces the
 * exact problem prerendering exists to solve, so this asserts the output is
 * genuinely populated and fails the build if not.
 *
 * Checks every route in the sitemap for: a real title, a canonical URL, an H1,
 * structured data, internal links, and a plausible amount of body text.
 */
const fs = require("fs");
const path = require("path");

const BUILD_DIR = path.join(__dirname, "..", "build");
const SITE_URL = "https://nuapos.com.au";
const MIN_TEXT_CHARS = 300;

function textOf(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const xml = fs.readFileSync(path.join(BUILD_DIR, "sitemap.xml"), "utf8");
const routes = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map((m) => m[1].replace(SITE_URL, ""))
  .map((r) => (r === "" ? "/" : r));

const failures = [];
const seenTitles = new Map();

for (const route of routes) {
  const file = route === "/"
    ? path.join(BUILD_DIR, "index.html")
    : path.join(BUILD_DIR, route, "index.html");

  if (!fs.existsSync(file)) {
    failures.push(`${route}: no prerendered file`);
    continue;
  }

  const html = fs.readFileSync(file, "utf8");
  const problems = [];

  if (html.includes("You need to enable JavaScript to run this app.")
      && !/<div id="root"><[^>]/.test(html)) {
    problems.push("empty app shell");
  }

  const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || "";
  if (!title) problems.push("no title");
  else {
    if (!seenTitles.has(title)) seenTitles.set(title, []);
    seenTitles.get(title).push(route);
  }

  if (!/<link rel="canonical"/.test(html)) problems.push("no canonical");
  if (!/<meta property="og:url"/.test(html)) problems.push("no og:url");
  if (!/<h1[\s>]/.test(html)) problems.push("no H1");
  if (!/application\/ld\+json/.test(html)) problems.push("no structured data");
  if (!/<a [^>]*href="\//.test(html)) problems.push("no internal links");

  const chars = textOf(html).length;
  if (chars < MIN_TEXT_CHARS) problems.push(`only ${chars} chars of text`);

  if (problems.length) failures.push(`${route}: ${problems.join(", ")}`);
}

// Duplicate titles across routes are the signal that per-page metadata
// regressed back to the shared shell defaults.
for (const [title, urls] of seenTitles) {
  if (urls.length > 1) {
    failures.push(`duplicate title ${JSON.stringify(title)} on: ${urls.slice(0, 5).join(", ")}${urls.length > 5 ? ` (+${urls.length - 5})` : ""}`);
  }
}

if (failures.length) {
  console.error(`verify-prerender: FAILED (${failures.length} problem(s))`);
  failures.forEach((f) => console.error("  " + f));
  process.exit(1);
}

console.log(`verify-prerender: OK — ${routes.length} routes have real HTML, unique titles, canonical, H1, schema and links.`);
