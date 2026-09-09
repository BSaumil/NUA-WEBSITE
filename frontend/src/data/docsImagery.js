/**
 * Photography for the module documentation pages.
 *
 * Keyed by docsData slug. Every entry is optional — a module without a
 * matching scene renders exactly as it does today, so this file never needs a
 * placeholder and a new module does not need an asset batch before it ships.
 *
 * Only modules with a scene that genuinely shows that module's work are listed.
 * Five are deliberately absent: dynamic-pricing, surplus-exchange,
 * upsell-nudges, loss-prevention and bill-split have no photograph in the pack
 * that depicts what they actually do, and a loosely related image on a
 * documentation page is worse than none — it implies the reader is looking at
 * the feature being described.
 *
 * Alt text describes the frame, not the filename.
 */
const docsImagery = {
  pos: {
    group: "finance-compliance",
    id: "connected-accounting-for-every-sale",
    alt: "A sale completing at the counter, with the resulting accounting entry shown alongside.",
  },
  kds: {
    group: "hospitality",
    id: "real-time-kitchen-clarity",
    alt: "A kitchen display on the pass showing open tickets grouped by course.",
  },
  reservations: {
    group: "hospitality",
    id: "nua-automated-restaurant-reservations",
    alt: "A reservations screen showing the evening's bookings against the floor.",
  },
  loyalty: {
    group: "hospitality",
    id: "turn-every-guest-into-a-regular",
    alt: "A returning guest recognised at the counter, their history shown on the terminal.",
  },
  nua: {
    group: "ash-intelligence",
    id: "protect-margins-automatically",
    alt: "A margin dashboard flagging items whose cost has moved against their price.",
  },
  inventory: {
    group: "finance-compliance",
    id: "nua-hospitality-invoice-insights",
    alt: "A supplier invoice being read into stock records, with cost changes highlighted.",
  },
  staff: {
    group: "finance-compliance",
    id: "payroll-built-for-australia",
    alt: "A payroll summary on screen showing hours worked against award conditions.",
  },
  voice: {
    group: "hospitality",
    id: "voice-powered-cafe-service",
    alt: "A barista working the machine with both hands while placing an order by voice.",
  },
  analytics: {
    group: "ash-intelligence",
    id: "restaurant-pulse-dashboard-marketing-scene",
    alt: "A live performance dashboard showing the venue's current trading position.",
  },
  compliance: {
    group: "finance-compliance",
    id: "bas-and-gst-cafe-dashboard",
    alt: "A BAS and GST summary on screen, compiled from the period's takings.",
  },
  benchmarking: {
    group: "enterprise-multi-location",
    id: "every-store-one-view",
    alt: "One screen listing every location with its current trading position side by side.",
  },
  "franchise-mode": {
    group: "enterprise-multi-location",
    id: "scale-every-venue-with-clarity",
    alt: "A multi-venue dashboard comparing several sites against group settings.",
  },
  "auto-specials": {
    group: "hospitality",
    id: "market-the-venue-while-service-runs",
    alt: "A promotion being drafted on screen while service continues in the background.",
  },
};

export default docsImagery;
