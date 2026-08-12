import {
  Monitor, Layers, CreditCard, CalendarRange, PhoneCall, Truck, Users, Boxes,
  Thermometer, Gift, Megaphone, QrCode, Wallet, ChefHat, Globe2, Star, BarChart3, Mic,
} from "lucide-react";

// Indicative monthly AUD costs for a single, mid-size venue, compiled from
// publicly listed pricing as at July 2026. See the disclaimer on the page: 
// actual pricing varies by provider, plan, region and negotiated rate.
export const costRows = [
  {
    id: "pos-software",
    icon: Monitor,
    category: "POS software subscription",
    tool: "Typical major POS provider: base plan",
    cost: 199,
  },
  {
    id: "pos-addons",
    icon: Layers,
    category: "POS add-ons",
    tool: "Extra register licence, advanced reporting, online ordering module",
    cost: 110,
  },
  {
    id: "eftpos",
    icon: CreditCard,
    category: "EFTPOS & payment processing markup",
    tool: "Bundled in-house processing + terminal rental",
    cost: 140,
  },
  {
    id: "booking",
    icon: CalendarRange,
    category: "Booking & reservations",
    tool: "OpenTable / NowBookIt",
    cost: 220,
  },
  {
    id: "phone-ai",
    icon: PhoneCall,
    category: "AI phone booking agent",
    tool: "Sadie-style AI phone answering & booking agent",
    cost: 249,
  },
  {
    id: "delivery",
    icon: Truck,
    category: "Delivery platform integration",
    tool: "Doshii / Deliverect",
    cost: 130,
  },
  {
    id: "roster",
    icon: Users,
    category: "Staff rostering & scheduling",
    tool: "Tanda / Deputy",
    cost: 120,
  },
  {
    id: "inventory",
    icon: Boxes,
    category: "Inventory management",
    tool: "Stock app + manual counting & ordering time",
    cost: 220,
  },
  {
    id: "compliance",
    icon: Thermometer,
    category: "Food safety & temperature logging",
    tool: "Compliance app + manual logging time",
    cost: 150,
  },
  {
    id: "loyalty",
    icon: Gift,
    category: "Loyalty & rewards program",
    tool: "Standalone loyalty / CRM platform",
    cost: 150,
  },
  {
    id: "marketing",
    icon: Megaphone,
    category: "Marketing automation",
    tool: "Email/SMS campaign tool + agency hours",
    cost: 180,
  },
  {
    id: "digital-menu",
    icon: QrCode,
    category: "Digital menu & QR ordering",
    tool: "Separate contactless ordering app",
    cost: 60,
  },
  {
    id: "giftcards",
    icon: Wallet,
    category: "Gift card platform",
    tool: "Add-on gift card module",
    cost: 40,
  },
];

export const COMPETITOR_TOTAL = costRows.reduce((sum, r) => sum + r.cost, 0);
export const NUA_PLAN_COST = 99;
export const NUA_OPTIONAL_TERMINAL = 20;
export const NUA_TOTAL = NUA_PLAN_COST + NUA_OPTIONAL_TERMINAL;
export const MONTHLY_SAVING = COMPETITOR_TOTAL - NUA_TOTAL;
export const ANNUAL_SAVING = MONTHLY_SAVING * 12;

export const bonusItems = [
  { icon: ChefHat, title: "Kitchen Display System", body: "Often sold as a separate hardware-and-software add-on elsewhere: built into every NUA plan." },
  { icon: Globe2, title: "Multi-location dashboard", body: "Franchise and group reporting is usually an enterprise upsell, included from the Growth plan up." },
  { icon: Star, title: "Guest reviews & feedback", body: "NUA surfaces guest sentiment automatically to the AI agent. No separate reputation-management tool needed." },
  { icon: BarChart3, title: "Menu engineering & profit analytics", body: "Usually gated behind a premium analytics tier elsewhere: standard in NUA's Analytics Dashboard." },
  { icon: Mic, title: "Voice ordering", body: "Rarely offered by legacy POS at all: built into NUA as Voice POS, included in every plan." },
];
