import React from "react";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import SEO from "@/components/SEO";
import Pricing from "@/components/sections/Pricing";
import WhyNua from "@/components/sections/WhyNua";
import FinalCta from "@/components/sections/FinalCta";

export default function PricingPage() {
  return (
    <PageShell testId="pricing-page">
      <SEO
        title="Pricing: NUA"
        description="Starter, Growth and Enterprise plans, plus a one-time Lifetime option. AI Agent, Voice POS and Loyalty ship in every plan, no add-on pricing."
        canonical="https://nuapos.com.au/pricing"
      />
      <PageHero
        eyebrow="Pricing"
        title="One platform. No à la carte tools."
        subtitle="The AI Agent, Voice POS, and Loyalty engine ship in every plan: no add-on pricing for the features that actually run your venue."
        accent="#f58c14"
        crumb="Pricing"
      />
      <Pricing />
      <WhyNua />
      <FinalCta />
    </PageShell>
  );
}
