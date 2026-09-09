// Set back to true once the email backend (Formspree) is wired up, and every
// "Book a Demo" / "Start Free Trial" button will reappear automatically.
export const LEAD_CAPTURE_ENABLED = false;

export const TRIAL_DAYS = 7;

export const SUPPORT_EMAIL = "info@nuapos.com.au";

/**
 * Canonical origin for this deployment — the single source of truth for every
 * absolute URL the site emits (canonical tags, og:url, sitemap, robots,
 * structured data).
 *
 * Driven by REACT_APP_SITE_URL so the site can be moved to another domain by
 * configuration rather than a code change. CRA inlines REACT_APP_* at build
 * time, so this resolves once per build. The default keeps local dev and any
 * unconfigured build pointing at production, matching previous behaviour.
 *
 * Normalised to have no trailing slash, so `${SITE_URL}${path}` is always
 * correct and never produces a double slash.
 */
export const SITE_URL = (
  process.env.REACT_APP_SITE_URL || "https://nuapos.com.au"
).replace(/\/+$/, "");

/**
 * Absolute URL for a root-relative path. `canonicalUrl("/pricing")`.
 *
 * The root keeps its trailing slash ("https://host/") so canonical tags match
 * the sitemap, which generates the same way. Special-casing it away made the
 * two disagree for the homepage.
 */
export function canonicalUrl(path = "/") {
  const suffix = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${suffix}`;
}

// Legal entity details, used for the Organization structured data and the
// contact page. Keep these in one place so schema and visible copy agree.
export const LEGAL_NAME = "NUA AUS PTY LTD";
export const BRAND_NAME = "NUA";
export const ABN = "54 299 131 653";
export const COUNTRY = "AU";
