/**
 * Guards the one duplication in the canonical-origin design.
 *
 * SITE_URL is resolved twice — once in src/config/siteConfig.js for the bundle,
 * once in scripts/site-url.js for the build scripts — because the scripts run
 * outside the CRA bundle and cannot import from src/. If those two drift, the
 * sitemap and robots.txt would advertise a different origin than the canonical
 * tags the pages render, which is exactly the class of bug this refactor exists
 * to remove. Nothing at runtime would fail; the damage would be silent and SEO-
 * only, so it is asserted at build time instead.
 *
 * Runs as part of `prebuild`.
 */
const fs = require("fs");
const path = require("path");
const { SITE_URL } = require("./site-url");

const CONFIG = path.join(__dirname, "..", "src", "config", "siteConfig.js");
const src = fs.readFileSync(CONFIG, "utf8");

const problems = [];

// Both sides must read the same variable and fall back to the same default.
const envVar = /process\.env\.REACT_APP_SITE_URL/.test(src);
if (!envVar) {
  problems.push("siteConfig.js no longer reads process.env.REACT_APP_SITE_URL");
}

const defaultMatch = src.match(/REACT_APP_SITE_URL\s*\|\|\s*"([^"]+)"/);
if (!defaultMatch) {
  problems.push("siteConfig.js has no string default for REACT_APP_SITE_URL");
} else {
  const scriptDefault = "https://nuapos.com.au";
  if (defaultMatch[1].replace(/\/+$/, "") !== scriptDefault) {
    problems.push(
      `default origin differs: siteConfig.js has "${defaultMatch[1]}", scripts/site-url.js has "${scriptDefault}"`
    );
  }
}

// Both sides must strip trailing slashes, or `${SITE_URL}${path}` double-slashes.
if (!/replace\(\/\\\/\+\$\/, ""\)/.test(src) && !src.includes('replace(/\\/+$/, "")')) {
  problems.push("siteConfig.js no longer strips the trailing slash from SITE_URL");
}

// No page should reintroduce a hardcoded origin.
const SRC_DIR = path.join(__dirname, "..", "src");
const offenders = [];
(function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p);
    else if (/\.(js|jsx)$/.test(entry.name) && p !== CONFIG) {
      if (/https:\/\/nuapos\.com\.au/.test(fs.readFileSync(p, "utf8"))) {
        offenders.push(path.relative(path.join(__dirname, ".."), p));
      }
    }
  }
})(SRC_DIR);

if (offenders.length) {
  problems.push(
    `hardcoded production origin reintroduced in ${offenders.length} file(s): ${offenders.join(", ")}` +
      " — use the SEO `path` prop or canonicalUrl() from siteConfig instead"
  );
}

if (problems.length) {
  console.error("check-site-url-parity: FAILED");
  problems.forEach((p) => console.error("  " + p));
  process.exit(1);
}

console.log(`check-site-url-parity: OK — single canonical origin (${SITE_URL})`);
