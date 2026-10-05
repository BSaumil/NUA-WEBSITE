/**
 * Routes that must be rendered and served, but must not be in the sitemap.
 *
 * These are two different questions that are easy to conflate, and conflating
 * them breaks the site in a way nothing catches: the sitemap is the input to
 * prerendering, so removing a route from the sitemap also stops its HTML being
 * written. There is no SPA fallback — the Vercel output serves plain files —
 * so the page then 404s in production while still being linked from the
 * footer. That is exactly what happened when /customers was first set to
 * noindex, and it would have shipped.
 *
 * A route belongs here when its page carries `noIndex` in its SEO props.
 * Keeping the two in step is manual, so the list is short and says why.
 */
module.exports = [
  // No published customer stories yet, so the page asks crawlers to skip it.
  // It still has to render: it is linked from the footer and from /solutions.
  "/customers",
];
