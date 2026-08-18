import { UtensilsCrossed, Coffee, Wine, Building2 } from "lucide-react";

/**
 * High-intent vertical landing pages.
 *
 * These target the category searches operators actually run ("restaurant POS
 * Australia", "cafe POS system") rather than the brand term. Each page answers
 * the same buyer questions in the same order: who it's for, what it replaces,
 * the operational pain, how the workflow runs, what it costs, and FAQs.
 */
const verticalsData = [
  {
    slug: "restaurant-pos",
    icon: UtensilsCrossed,
    color: "#f58c14",
    eyebrow: "Restaurant POS",
    title: "Restaurant POS built for the whole service, not just the payment.",
    metaTitle: "Restaurant POS System Australia: NUA",
    metaDescription:
      "An Australian restaurant POS that runs orders, tables, kitchen, bookings, stock and loyalty in one system, with an AI agent handling the admin between them.",
    intro:
      "Most restaurant POS systems record a transaction and stop there. The floor plan lives somewhere else, the kitchen runs on printed dockets, stock is a spreadsheet, and nothing tells you a table is running late until the guest does.",
    forWho: "Full-service restaurants running table service, courses, and a working kitchen line.",
    replaces: [
      "A legacy POS terminal that only handles payments",
      "A separate bookings/reservations platform",
      "Printed kitchen dockets or a standalone KDS",
      "Spreadsheet stocktakes and manual food-cost maths",
      "A disconnected loyalty or gift-card product",
    ],
    pains: [
      "Table turn-time is guesswork, so the waitlist is guesswork too",
      "Kitchen tickets bank up the moment service gets busy",
      "Food cost is only known weeks later, once invoices are reconciled",
      "86'ing an item means someone physically walking to the floor",
    ],
    workflow: [
      { step: "Order taken", body: "Server takes the order at the table on a handheld, or hands-free with Voice POS during a rush." },
      { step: "Kitchen routed", body: "Each item fires to its correct station automatically, with course timing and live aging alerts on the pass." },
      { step: "Stock decremented", body: "Recipe-level inventory drops as the item is sold, so food cost is current, not reconstructed later." },
      { step: "Guest recognised", body: "Loyalty tier and visit history surface at the table, so regulars get recognised without anyone remembering." },
      { step: "Paid and split", body: "Bill splits by item, evenly, or by voice instruction, and settles on the same terminal." },
    ],
    features: ["pos", "reservations", "kds", "inventory", "loyalty", "nua"],
    faqs: [
      { q: "Can NUA handle course timing and fire orders in sequence?", a: "Yes. Items are mapped to kitchen stations with course sequencing, so entrees and mains fire in the right order rather than all at once. Aging thresholds turn a ticket amber then red at wait times you set." },
      { q: "Does it work if the internet drops mid-service?", a: "The POS supports offline checkout, so you keep taking orders and payments through an outage and everything syncs once connectivity returns." },
      { q: "How long does migrating from our current restaurant POS take?", a: "Most single-venue migrations complete within a day once the menu is ready to import. NUA reads a spreadsheet or PDF export and maps items, modifiers and prices, flagging anything it isn't confident about." },
      { q: "Do we need new hardware?", a: "NUA runs on standard POS terminals and tablets. We can advise on specific hardware during onboarding, but you generally will not need to replace a working terminal fleet." },
    ],
  },
  {
    slug: "cafe-pos",
    icon: Coffee,
    color: "#8b5cf6",
    eyebrow: "Cafe POS",
    title: "Cafe POS that keeps the morning queue moving.",
    metaTitle: "Cafe POS System Australia: NUA",
    metaDescription:
      "An Australian cafe POS built for speed: fast order entry, takeaway and QR ordering, a tap-to-scan loyalty wallet, and stock that tracks itself.",
    intro:
      "A cafe lives or dies on throughput between 7am and 10am. Every extra second at the counter is a person deciding not to queue. The system should be invisible at peak and honest about margin the rest of the day.",
    forWho: "Cafes, coffee shops and takeaway-led venues where speed of service is the product.",
    replaces: [
      "A slow counter POS with deep modifier menus",
      "A punch-card or app-based loyalty scheme",
      "Separate takeaway/QR ordering tools",
      "Manual milk, bean and pastry stock counts",
    ],
    pains: [
      "Queues build fast and drop-off is invisible until sales dip",
      "Staff juggle orders, upsells and loyalty by hand at peak",
      "Thin per-cup margins mean waste matters more than it looks",
      "Rostering by gut feel leaves the counter short at exactly the wrong hour",
    ],
    workflow: [
      { step: "Order in seconds", body: "Common orders and modifiers are one tap, or called out hands-free with Voice POS while the barista keeps working." },
      { step: "Regular recognised", body: "A tap-to-scan wallet pass identifies the regular and applies their tier automatically, with no app download." },
      { step: "Made and called", body: "The order routes to the coffee and food stations with prep timing, so nothing sits waiting on the other half." },
      { step: "Stock tracks itself", body: "Milk, beans and pastries decrement per sale, and low-stock alerts fire before you run out mid-rush." },
      { step: "Staffed to demand", body: "AI rostering matches the roster to forecast covers hour by hour, not to a fixed weekly template." },
    ],
    features: ["pos", "loyalty", "inventory", "voice", "analytics"],
    faqs: [
      { q: "Does the loyalty program need customers to download an app?", a: "No. NUA issues an Apple or Google Wallet pass that guests add with one tap, so there is no app install standing between a regular and their second visit." },
      { q: "Can NUA handle takeaway and QR ordering alongside counter service?", a: "Yes. Takeaway and QR orders route into the same order flow and kitchen stations as counter orders, so staff work one queue rather than watching several screens." },
      { q: "How does it help with waste?", a: "Recipe-level stock tracking shows what is actually being consumed versus sold, and Auto Specials can draft a promotion for items approaching expiry before they become a write-off." },
      { q: "Is it affordable for a single cafe?", a: "The Starter plan is $79 AUD per venue per month plus GST and includes POS, bookings, KDS, loyalty, Voice POS and the AI agent in Suggest mode. Pricing shown is indicative; confirm a formal quote for your venue." },
    ],
  },
  {
    slug: "bar-pos",
    icon: Wine,
    color: "#ec4899",
    eyebrow: "Bar POS",
    title: "Bar POS for fast tabs, tight stock and loud rooms.",
    metaTitle: "Bar & Pub POS System Australia: NUA",
    metaDescription:
      "An Australian bar and pub POS with fast tab management, pour-level stock control, loss prevention and staffing tuned to the night.",
    intro:
      "A busy bar is a margin business fought pour by pour. Tabs need to move, stock shrinkage needs to be visible, and the roster needs to match how the night actually goes rather than how it was planned on Monday.",
    forWho: "Bars, pubs and late-night venues running open tabs and high-volume drink service.",
    replaces: [
      "A POS with clumsy tab and pre-auth handling",
      "Manual stocktakes on spirits and kegs",
      "Guesswork about pour variance and shrinkage",
      "Fixed rosters that ignore how busy the night is",
    ],
    pains: [
      "Tabs pile up and get slow to find at exactly the busiest moment",
      "Stock variance is only discovered at the next count, if at all",
      "Void and refund patterns are invisible until they are expensive",
      "Staffing is set before anyone knows what the night will do",
    ],
    workflow: [
      { step: "Tab opened fast", body: "Open, name and find tabs quickly, including pre-auth, so nothing slows down at the rail." },
      { step: "Poured and tracked", body: "Drinks decrement stock at pour level, so variance against expected usage is visible daily rather than at the next count." },
      { step: "Patterns watched", body: "Loss Prevention flags unusual void, refund or discount patterns against the venue's own baseline, cross-referenced with who was on shift." },
      { step: "Staffed to the night", body: "AI rostering tunes staffing to forecast demand, and staff can swap approved shifts without a manager in the loop." },
      { step: "Settled cleanly", body: "Split, transfer or settle tabs on the same terminal, with the full action history in the audit trail." },
    ],
    features: ["pos", "inventory", "staff", "loss-prevention", "analytics"],
    faqs: [
      { q: "Can NUA track pour-level stock variance?", a: "Yes. Drinks are linked to recipes with pour quantities, so stock decrements per sale and expected usage can be compared against a physical count to surface variance." },
      { q: "How does loss prevention work without accusing staff?", a: "It flags patterns, not people: for example, a void rate several times the team average. A flag is a prompt to look, with the roster context alongside it, not a conclusion." },
      { q: "Does it handle transferring a tab between staff or tables?", a: "Yes, and every transfer, void and discount is recorded in the audit trail, so the history of a tab is reconstructable after the fact." },
      { q: "Can we run last-minute promotions on slow nights?", a: "Marketing Automation can trigger offers to loyalty members, and Auto Specials can draft promotional copy from stock that needs moving." },
    ],
  },
  {
    slug: "hospitality-pos",
    icon: Building2,
    color: "#22c55e",
    eyebrow: "Hospitality POS",
    title: "One hospitality platform across every venue you run.",
    metaTitle: "Hospitality POS Software Australia: NUA",
    metaDescription:
      "Hospitality POS and management software for Australian multi-venue groups: central control, per-venue branding, group reporting and compliance in one platform.",
    intro:
      "Running several venues on separate systems means reconciling several versions of the truth. A group needs central control without flattening what makes each venue work locally.",
    forWho: "Hospitality groups, franchises and multi-venue operators.",
    replaces: [
      "A different POS stack per venue, acquired as the group grew",
      "Manual consolidation of reports across venues",
      "Inconsistent compliance and certification tracking by site",
      "Separate loyalty databases that do not recognise a shared guest",
    ],
    pains: [
      "Every venue reports differently, so group numbers arrive late",
      "Best practice at one venue never propagates to the others",
      "Compliance status per site is unknown until an inspection",
      "A regular at one venue is a stranger at the next",
    ],
    workflow: [
      { step: "Set group policy", body: "Decide centrally what is enforced group-wide (compliance rules, loyalty tiers) versus set locally (menu, pricing)." },
      { step: "Brand per venue", body: "Franchise White-Label Mode gives each venue its own logo, name and theme on shared group infrastructure." },
      { step: "Control access", body: "Role-based access means venue managers see their venue, while group admins see the portfolio." },
      { step: "Compare venues", body: "Portfolio benchmarking compares your own sites against each other, so an outlier is obvious rather than anecdotal." },
      { step: "Report as one", body: "Group reporting rolls up automatically instead of being reassembled from per-venue exports each month." },
    ],
    features: ["nua", "analytics", "compliance", "benchmarking", "franchise-mode"],
    faqs: [
      { q: "Can each venue keep its own branding and menu?", a: "Yes. Franchise White-Label Mode runs branded sub-instances per venue on shared group infrastructure, and you choose which settings are enforced group-wide versus set per venue." },
      { q: "How many locations does NUA support?", a: "Growth covers up to 10 locations; Enterprise supports unlimited locations and users with franchise dashboards and role-based access control." },
      { q: "Can we compare performance across our venues?", a: "Portfolio benchmarking compares your own locations against each other from day one. Anonymized comparison against similar venues elsewhere on the network is a separate, opt-in Enterprise feature." },
      { q: "How is compliance handled across sites?", a: "Compliance Automation tracks temperature logs, staff certifications and inspection checklists per venue, with group-level visibility of which sites are current and which are not." },
    ],
  },
];

export default verticalsData;
