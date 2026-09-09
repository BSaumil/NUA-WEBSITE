/**
 * Regenerates public/sitemap.xml from the live route table + data-file
 * slugs, so it can't silently drift out of date as content is added.
 * Runs automatically before every production build (see package.json's
 * "prebuild" script).
 */
const fs = require("fs");
const path = require("path");

const { SITE_URL } = require("./site-url");
const SRC_DIR = path.join(__dirname, "..", "src");
const OUT_FILE = path.join(__dirname, "..", "public", "sitemap.xml");
const ROBOTS_FILE = path.join(__dirname, "..", "public", "robots.txt");

// Static routes, mirrored from src/App.js. Keep in sync when routes change.
const staticRoutes = [
  "/", "/features", "/platform", "/ai-agent", "/solutions", "/pricing",
  "/integrations", "/resources", "/docs", "/privacy", "/terms", "/savings",
  "/about", "/customers", "/careers", "/blog", "/press", "/contact",
  "/gallery", "/security", "/status", "/compare",
];

function extractSlugs(fileName) {
  const filePath = path.join(SRC_DIR, "data", fileName);
  const content = fs.readFileSync(filePath, "utf8");
  const matches = [...content.matchAll(/slug:\s*"([^"]+)"/g)];
  return matches.map((m) => m[1]);
}

const dynamicRoutes = [
  // Vertical landing pages sit at the root, so the slug is the whole path.
  ...extractSlugs("verticalsData.js").map((s) => `/${s}`),
  ...extractSlugs("solutionsData.js").map((s) => `/solutions/${s}`),
  ...extractSlugs("compareData.js").map((s) => `/compare/${s}`),
  ...extractSlugs("docsData.js").map((s) => `/docs/${s}`),
  ...extractSlugs("blogData.js").map((s) => `/blog/${s}`),
];

const allRoutes = [...staticRoutes, ...dynamicRoutes];
const today = new Date().toISOString().slice(0, 10);

const urlEntries = allRoutes
  .map(
    (route) => `  <url>
    <loc>${SITE_URL}${route}</loc>
    <lastmod>${today}</lastmod>
  </url>`
  )
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>
`;

fs.writeFileSync(OUT_FILE, xml);

// robots.txt carries an absolute sitemap URL, so it has to be generated from
// the same origin as the sitemap itself — otherwise moving the domain would
// leave robots.txt pointing at the old host.
const robots = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
fs.writeFileSync(ROBOTS_FILE, robots);

console.log(
  `sitemap.xml written with ${allRoutes.length} URLs (${staticRoutes.length} static + ${dynamicRoutes.length} dynamic); robots.txt written. Origin: ${SITE_URL}`
);
