import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import SEO from "@/components/SEO";

/**
 * This page used to render six quotes attributed to named roles at named
 * venues — "Ops Lead · Saltgrass", "Restaurant Director · Lumière" — under the
 * heading "Operators who run on NUA" and the line "here's who trusts NUA to
 * run the floor". None of them are customers. The same venue names appear in
 * the homepage trust strip, where they carry the disclaimer "Illustrative
 * business names for evaluation purposes, not customers", so the site was
 * asserting both things at once.
 *
 * Attributed testimonials that nobody gave are a different category from
 * optimistic copy: they are representations about third parties, and under
 * Australian Consumer Law a testimonial nobody made is specifically called
 * out. So they are gone rather than disclaimed, here and on the six
 * /solutions/* pages that rendered the same quotes.
 *
 * What is left is deliberately plain. Inventing a replacement would repeat the
 * original mistake in a quieter voice, so the page says what is true: there
 * are no published stories yet. It is noindex until there are — a page that
 * promises social proof and delivers none is worse in search results than no
 * page at all.
 *
 * The real decision — delete this route, or fill it with stories operators
 * have actually agreed to — belongs to the business, not to this file.
 */
export default function Customers() {
  return (
    <PageShell testId="customers-page">
      <SEO
        title="Customer stories: NUA"
        description="NUA has no published customer stories yet. When operators agree to share how they run on NUA, they will appear here."
        path="/customers"
        noIndex
      />
      <PageHero
        eyebrow="Customers"
        title="No customer stories yet."
        subtitle="When operators agree to share how they run their venue on NUA, their words will appear here, with their names on them. Until then this page stays empty rather than borrowing someone else's."
        accent="#BF3A7B"
        crumb="Customers"
      />

      <div className="relative max-w-3xl mx-auto px-6 lg:px-10 pb-24 lg:pb-32">
        <div className="rounded-2xl bg-nua-surface border border-nua-border p-6 sm:p-8">
          <p className="text-nua-ink leading-relaxed">
            If you run on NUA and would be happy to talk about it, we would like to hear from you.
            In the meantime, the pages below describe what the system actually does, in the
            language of the trade it does it in.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link
              to="/solutions"
              data-testid="customers-solutions-link"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-nua-burgundy hover:bg-nua-burgundyDark text-white text-sm font-medium transition-colors"
            >
              Browse solutions
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              data-testid="customers-contact-link"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-nua-border text-nua-ink text-sm font-medium hover:bg-nua-bgAlt transition-colors"
            >
              Talk to us
            </Link>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
