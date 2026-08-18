import { useEffect } from "react";
import { buildGraph } from "@/lib/schema";

function upsertMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

/**
 * Lightweight per-page <head> manager: no react-helmet dependency.
 * Sets title/meta description/OG tags/canonical, and optionally injects a
 * single JSON-LD script (e.g. FAQPage schema) that gets replaced on navigation.
 */
function snapshotMeta(attr, key) {
  const el = document.head.querySelector(`meta[${attr}="${key}"]`);
  return el ? el.getAttribute("content") : null;
}

export default function SEO({
  title, description, canonical, jsonLd, noIndex,
  breadcrumb, includeSoftware = false,
}) {
  // Every page carries the Organization + WebSite entity graph; `jsonLd` is
  // folded in as the page-specific node (FAQPage, HowTo, ...).
  const graph = noIndex
    ? null
    : buildGraph({ includeSoftware, breadcrumb, extra: jsonLd });

  useEffect(() => {
    const prevTitle = document.title;
    const prevDescription = snapshotMeta("name", "description");
    const prevOgDescription = snapshotMeta("property", "og:description");
    const prevTwitterDescription = snapshotMeta("name", "twitter:description");
    const prevOgTitle = snapshotMeta("property", "og:title");
    const prevTwitterTitle = snapshotMeta("name", "twitter:title");
    const prevRobots = snapshotMeta("name", "robots");
    const prevOgUrl = snapshotMeta("property", "og:url");
    const prevCanonicalEl = document.head.querySelector('link[rel="canonical"]');
    const prevCanonicalHref = prevCanonicalEl ? prevCanonicalEl.getAttribute("href") : null;

    if (title) document.title = title;
    if (description) {
      upsertMeta("name", "description", description);
      upsertMeta("property", "og:description", description);
      upsertMeta("name", "twitter:description", description);
    }
    if (title) {
      upsertMeta("property", "og:title", title);
      upsertMeta("name", "twitter:title", title);
    }
    if (noIndex) upsertMeta("name", "robots", "noindex, nofollow");
    // og:url must point at the page being shared, not the site root, or every
    // shared link resolves to the homepage in social previews.
    if (canonical) upsertMeta("property", "og:url", canonical);

    if (canonical) {
      let canonicalEl = document.head.querySelector('link[rel="canonical"]');
      if (!canonicalEl) {
        canonicalEl = document.createElement("link");
        canonicalEl.setAttribute("rel", "canonical");
        document.head.appendChild(canonicalEl);
      }
      canonicalEl.setAttribute("href", canonical);
    }

    if (graph) {
      let jsonLdEl = document.getElementById("seo-jsonld");
      if (!jsonLdEl) {
        jsonLdEl = document.createElement("script");
        jsonLdEl.type = "application/ld+json";
        jsonLdEl.id = "seo-jsonld";
        document.head.appendChild(jsonLdEl);
      }
      jsonLdEl.textContent = JSON.stringify(graph);
    }

    return () => {
      document.title = prevTitle;
      if (prevDescription !== null) upsertMeta("name", "description", prevDescription);
      if (prevOgDescription !== null) upsertMeta("property", "og:description", prevOgDescription);
      if (prevTwitterDescription !== null) upsertMeta("name", "twitter:description", prevTwitterDescription);
      if (prevOgTitle !== null) upsertMeta("property", "og:title", prevOgTitle);
      if (prevTwitterTitle !== null) upsertMeta("name", "twitter:title", prevTwitterTitle);
      if (prevOgUrl !== null) upsertMeta("property", "og:url", prevOgUrl);
      if (noIndex) {
        if (prevRobots !== null) upsertMeta("name", "robots", prevRobots);
        else document.head.querySelector('meta[name="robots"]')?.remove();
      }

      const canonicalEl = document.head.querySelector('link[rel="canonical"]');
      if (canonicalEl) {
        if (prevCanonicalHref !== null) canonicalEl.setAttribute("href", prevCanonicalHref);
        else canonicalEl.remove();
      }

      const el = document.getElementById("seo-jsonld");
      if (el) el.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, canonical, JSON.stringify(graph), noIndex]);

  return null;
}
