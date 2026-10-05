// Every "Book a Demo" / "Start Free Trial" button, and the contact form, are
// gated on this. It was false because there was no working submission path:
// the lead dialog posted to a backend that does not exist on a static deploy,
// so the only way to reach NUA was to compose an email by hand.
//
// There is a path now — see FORM_ENDPOINT below and src/lib/submitLead.js —
// and it degrades to a prefilled mail draft rather than failing when no
// endpoint is configured, so this does not need to wait on that setup.
export const LEAD_CAPTURE_ENABLED = true;

export const TRIAL_DAYS = 7;

export const SUPPORT_EMAIL = "info@nuapos.com.au";

/**
 * Where the contact form and the lead dialog POST.
 *
 * The site is static, so this is a third-party form backend (Formspree or an
 * equivalent). The destination inbox is configured in that service, not here —
 * which is deliberate: the endpoint id is a public token and safe in the
 * bundle, while the inbox it forwards to is not something the frontend should
 * be asserting.
 *
 * Unset is a supported state. src/lib/submitLead.js falls back to a prefilled
 * mail draft to SUPPORT_EMAIL rather than dropping the message, so the form
 * works before this is configured and works better after.
 *
 * Set REACT_APP_FORM_ENDPOINT in the Vercel project and as a GitHub Actions
 * secret, since CRA inlines REACT_APP_* at build time and the deploy builds in
 * CI.
 */
export const FORM_ENDPOINT = (process.env.REACT_APP_FORM_ENDPOINT || "").trim();

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

/**
 * Registered business address.
 *
 * Kept as parts rather than one string because the Organization structured
 * data needs them separately, and the legal pages need them rendered as a
 * block — deriving both from one source is what stops the schema and the
 * visible copy disagreeing, which is the failure mode that matters here: a
 * Privacy Policy naming one address while the markup claims another reads as
 * carelessness at best.
 *
 * Alphington is in Victoria, which matches the governing law named in the
 * Terms.
 */
export const ADDRESS = {
  street: "7 Rowe Street",
  locality: "Alphington",
  region: "VIC",
  postcode: "3078",
  country: COUNTRY,
};

/** Single-line form, for running copy. */
export const ADDRESS_LINE = `${ADDRESS.street}, ${ADDRESS.locality} ${ADDRESS.region} ${ADDRESS.postcode}`;
