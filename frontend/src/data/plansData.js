// Single source of truth for pricing: cards, the Lifetime offer, and any
// derived copy (e.g. "equivalent to X months of Growth") read from here so a
// price change only has to happen in one place.

export const CURRENCY = "AUD";

export const plans = [
  {
    id: "starter",
    name: "Starter",
    priceMonthly: 79,
    period: "per venue / mo",
    desc: "For single-venue operators ready to switch on intelligence.",
    accent: "#a1a1aa",
    cta: "Start free trial",
    featured: false,
    limits: "1 location, up to 5 users",
    features: [
      "Point of Sale (orders, payments, receipting)",
      "Bookings & Reservations",
      "Kitchen Display System",
      "Loyalty Engine (tiers + wallet pass)",
      "Voice POS",
      "NUA AI Agent — Suggest mode",
      "Core Analytics dashboard",
      "Compliance checklists (manual logging)",
      "Smart Bill Split (AI-assisted)",
      "1 location, up to 5 users",
      "Email & chat support",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    priceMonthly: 149,
    period: "per venue / mo",
    desc: "Multi-venue brands scaling with autonomous ops.",
    accent: "#8b5cf6",
    cta: "Book a demo",
    featured: true,
    limits: "Up to 10 locations, up to 40 users",
    features: [
      "Everything in Starter",
      "NUA AI Agent — full autonomous mode + guardrails",
      "Inventory & Pantry (recipe-level stock, invoice import)",
      "Staff & Rostering (AI-assisted, labour-cost forecasting)",
      "Marketing Automation (loyalty-triggered campaigns)",
      "Full Analytics & Reports (scheduled reports, alerts)",
      "Compliance Automation (sensor logs, certification tracking)",
      "Portfolio benchmarking across your own locations",
      "Dynamic Pricing Intelligence (margin-drift alerts)",
      "Live Upsell Nudges + Loss Prevention",
      "Auto Specials (AI-drafted, social publishing)",
      "Up to 10 locations, up to 40 users",
      "Priority support + guided onboarding",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    priceMonthly: 199,
    period: "per venue / mo",
    desc: "Hospitality groups, franchises and chains.",
    accent: "#f58c14",
    cta: "Talk to sales",
    featured: false,
    limits: "Unlimited locations & users",
    features: [
      "Everything in Growth",
      "Multi-location orchestration",
      "Franchise dashboards & role-based access control",
      "Network Benchmark Insights — anonymized peer comparison (opt-in)",
      "Surplus Exchange Network (opt-in)",
      "Franchise White-Label Mode",
      "Custom integrations & API access",
      "Unlimited locations & users",
      "Dedicated CSM + 24/7 support",
      "Custom onboarding & migration assistance",
    ],
  },
];

export const lifetime = {
  priceOneTime: 3499,
  includesPlanId: "growth",
  badge: "Founding members · limited",
  headlineTop: "One payment. Infinite swipes.",
  headlineAccent: "You're welcome.",
  body: "One-time payment, lifetime access. Lock in the full NUA platform (AI Agent, Voice POS, Loyalty, every future update) with no monthly fee, ever.",
  features: [
    "All Growth features, forever",
    "Up to 10 locations",
    "Lifetime free updates",
    "Priority onboarding",
    "Founding-member badge",
    "Direct line to product team",
  ],
  guarantee: "30-day money-back guarantee",
};

export function getIncludedPlan() {
  return plans.find((p) => p.id === lifetime.includesPlanId);
}

// Derived, not hardcoded: recomputes automatically whenever priceOneTime or
// the included plan's priceMonthly changes.
export function getLifetimeEquivalence() {
  const includedPlan = getIncludedPlan();
  const months = Math.round(lifetime.priceOneTime / includedPlan.priceMonthly);
  const breakEvenYears = Math.ceil(months / 12);
  return { months, breakEvenYears, includedPlanName: includedPlan.name };
}
