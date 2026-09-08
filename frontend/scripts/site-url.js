/**
 * Canonical origin for the build scripts.
 *
 * Node-side twin of SITE_URL in src/config/siteConfig.js. The build scripts run
 * outside the CRA bundle, so they cannot import from src/ — but they must
 * resolve the same origin from the same environment variable, or the sitemap
 * and prerendered canonicals would disagree with what the app renders.
 *
 * Keep the variable name, default and normalisation identical in both files.
 * scripts/check-site-url-parity.js asserts that on every build.
 */
const SITE_URL = (process.env.REACT_APP_SITE_URL || "https://nuapos.com.au").replace(/\/+$/, "");

/** Absolute URL for a root-relative path. Root keeps its trailing slash so
 *  canonical tags and sitemap entries agree. */
function canonicalUrl(pathname = "/") {
  const suffix = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${SITE_URL}${suffix}`;
}

module.exports = { SITE_URL, canonicalUrl };
