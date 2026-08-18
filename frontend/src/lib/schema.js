import {
  SITE_URL, LEGAL_NAME, BRAND_NAME, ABN, COUNTRY, SUPPORT_EMAIL,
} from "@/config/siteConfig";
import { plans } from "@/data/plansData";

/**
 * Structured-data builders.
 *
 * Organization + WebSite ship on every page to establish the business entity.
 * SoftwareApplication ships on commercial pages where NUA is the subject.
 * Page-specific graphs (FAQPage, HowTo) are composed in via `extra`.
 *
 * Deliberately NOT emitting LocalBusiness: NUA is a SaaS product, not a
 * storefront with a physical service area, and claiming otherwise is exactly
 * the kind of schema Google treats as misleading.
 */

export const organizationSchema = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: BRAND_NAME,
  legalName: LEGAL_NAME,
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/nua-icon-512.png`,
    width: 512,
    height: 512,
  },
  identifier: { "@type": "PropertyValue", name: "ABN", value: ABN },
  address: { "@type": "PostalAddress", addressCountry: COUNTRY },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: SUPPORT_EMAIL,
    areaServed: COUNTRY,
    availableLanguage: "en",
  },
};

export const webSiteSchema = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: BRAND_NAME,
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "en-AU",
};

// Prices come from plansData so schema can't drift from the pricing page.
export const softwareApplicationSchema = {
  "@type": "SoftwareApplication",
  "@id": `${SITE_URL}/#software`,
  name: "NUA Restaurant OS",
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "Point of Sale Software",
  operatingSystem: "Web, iOS, Android",
  publisher: { "@id": `${SITE_URL}/#organization` },
  offers: plans.map((p) => ({
    "@type": "Offer",
    name: `${p.name} plan`,
    price: String(p.priceMonthly),
    priceCurrency: "AUD",
    category: "subscription",
    url: `${SITE_URL}/pricing`,
  })),
};

export function breadcrumbSchema(trail) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

/**
 * Composes one @graph document. Using a single graph with @id cross-references
 * keeps entities linked rather than emitting several disconnected blocks.
 */
export function buildGraph({ includeSoftware = false, breadcrumb, extra } = {}) {
  const graph = [organizationSchema, webSiteSchema];
  if (includeSoftware) graph.push(softwareApplicationSchema);
  if (breadcrumb) graph.push(breadcrumbSchema(breadcrumb));
  if (extra) graph.push(extra);
  return { "@context": "https://schema.org", "@graph": graph };
}
