// Comparison content is intentionally framed around general, commonly-known category
// positioning rather than specific claims about a named competitor's current pricing or
// policies (which change often and aren't something we track live). Each page carries its
// own disclaimer pointing readers to confirm specifics directly with that provider.

const sharedRows = [
  { label: "AI-scored automated actions", nua: "Included" },
  { label: "Offline-first checkout (works with no connection)", nua: "Included" },
  { label: "Native voice ordering", nua: "Included" },
  { label: "Kitchen Display System", nua: "Included" },
  { label: "Loyalty wallet pass (Apple/Google Wallet)", nua: "Included" },
  { label: "Multi-location dashboard", nua: "From Growth plan" },
  { label: "Pricing published online", nua: "Yes, always" },
  { label: "Modules under one login", nua: "10" },
];

const compareData = [
  {
    slug: "toast",
    name: "Toast",
    category: "Enterprise-first restaurant POS",
    color: "#f58c14",
    summary: "Toast is a widely-used, enterprise-oriented restaurant POS with its own proprietary hardware ecosystem — a common reference point for venues comparing full-service platforms.",
    rows: sharedRows.map((r) => ({ ...r, competitor: "Varies by plan and hardware bundle" })),
    switchNote: "Teams evaluating Toast alongside NUA are usually weighing proprietary hardware commitments and modular add-on pricing against a single AI-native platform with transparent, published pricing.",
  },
  {
    slug: "square",
    name: "Square for Restaurants",
    category: "Small-business-first POS",
    color: "#8b5cf6",
    summary: "Square for Restaurants extends Square's broader small-business payments platform into food service — strong for simplicity and fast setup, built on general-purpose retail foundations.",
    rows: sharedRows.map((r) => ({ ...r, competitor: "Varies by plan; some features restaurant-specific tier only" })),
    switchNote: "Venues that outgrow Square's general-purpose roots often want deeper restaurant-specific depth — real kitchen routing, table turn-time prediction, and AI-driven ops — without switching payment providers entirely.",
  },
  {
    slug: "clover",
    name: "Clover",
    category: "Flexible, hardware-first POS",
    color: "#ec4899",
    summary: "Clover runs on a flexible app-marketplace model — a base POS extended with paid apps for the specific features a venue needs, sold largely through acquiring banks and resellers.",
    rows: sharedRows.map((r) => ({ ...r, competitor: "Often a separate marketplace app purchase" })),
    switchNote: "The app-marketplace model means costs and capability both grow with each add-on — teams comparing against NUA are often adding up what a fully-featured Clover setup actually costs once every needed app is included.",
  },
  {
    slug: "lightspeed",
    name: "Lightspeed Restaurant",
    category: "Retail-and-hospitality POS",
    color: "#22c55e",
    summary: "Lightspeed serves both retail and hospitality from a shared platform heritage, with restaurant-specific tooling layered on top — a common comparison for multi-concept operators.",
    rows: sharedRows.map((r) => ({ ...r, competitor: "Varies by plan; some capabilities enterprise-tier only" })),
    switchNote: "Multi-venue groups comparing Lightspeed against NUA are typically weighing enterprise-tier gating of multi-location reporting against NUA including it from the Growth plan up.",
  },
  {
    slug: "touchbistro",
    name: "TouchBistro",
    category: "Dedicated restaurant POS",
    color: "#f58c14",
    summary: "TouchBistro is a restaurant-dedicated iPad POS with a long track record in full-service dining — a natural comparison for venues that want hospitality-first design.",
    rows: sharedRows.map((r) => ({ ...r, competitor: "Varies by plan; AI and voice ordering not core to the platform" })),
    switchNote: "Teams comparing TouchBistro against NUA are usually asking one question: does the platform's AI layer actually act on signals, or just report them. That's the core difference to dig into on a demo call.",
  },
];

export default compareData;
