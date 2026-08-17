import React from "react";
import { motion } from "framer-motion";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import SEO from "@/components/SEO";
import {
  InsightsCopilotShowcase, AnalyticsMonitorShowcase, ScanToPayShowcase,
  POSShowcase, KDSShowcase, StaffShowcase, InventoryShowcase, MarketingShowcase, VoiceShowcase,
  LoyaltyWalletLiveShowcase, AICommandCenterShowcase, MultiVenueLiveShowcase,
  TemperatureMonitoringShowcase, PaymentsShowcase, DeliveryHubShowcase,
  BookingWaitlistShowcase, ForecastingShowcase,
} from "@/components/graphics/ShowcaseGraphics";

const groups = [
  {
    label: "Front of House",
    title: "Every guest touchpoint, live.",
    color: "#f58c14",
    items: [
      { Component: POSShowcase, title: "Point of Sale", stat: "Zero downtime, ever", body: "Charges cards, splits bills and keeps ringing up sales even when the internet drops." },
      { Component: VoiceShowcase, title: "Voice POS", stat: "Zero clicks", body: "Apply discounts, fire reports, all without your hands leaving the pass." },
      { Component: KDSShowcase, title: "Kitchen Display", stat: "Zero paper tickets", body: "Orders route to the right station instantly, aging tracked to the second." },
      { Component: BookingWaitlistShowcase, title: "Reservations & Waitlist", stat: "Zero double-bookings", body: "The waitlist converts to a table automatically the second one turns over." },
    ],
  },
  {
    label: "Back of House Intelligence",
    title: "The work that runs itself.",
    color: "#22c55e",
    items: [
      { Component: InventoryShowcase, title: "Inventory & Purchasing", stat: "Stockouts prevented", body: "Buy, wait, or reorder: decided for you before you ever run out." },
      { Component: TemperatureMonitoringShowcase, title: "Temperature Monitoring", stat: "Zero manual logs, zero fines", body: "Fridges and freezers logged automatically: alerts sent the instant something drifts." },
      { Component: StaffShowcase, title: "Staff Management", stat: "Hours saved every week on rostering", body: "AI drafts the roster and balances labour cost, one tap to approve." },
      { Component: ForecastingShowcase, title: "Demand Forecasting", stat: "Know tomorrow's rush, today", body: "NUA predicts next week's demand and adjusts purchase orders before you even ask." },
    ],
  },
  {
    label: "Growth, Loyalty & Payments",
    title: "Revenue that compounds.",
    color: "#8b5cf6",
    items: [
      { Component: LoyaltyWalletLiveShowcase, title: "Loyalty & Wallet", stat: "$1 spent = 1 point, instantly", body: "Every sale earns loyalty automatically: no separate terminal, no manual entry." },
      { Component: MarketingShowcase, title: "Marketing Automation", stat: "Campaigns that trigger themselves", body: "Segments and win-back offers fire on their own: 24 hours a day." },
      { Component: PaymentsShowcase, title: "Payments & EFTPOS", stat: "$0 markup on bank rates", body: "Tap, insert or scan: any method, settled instantly, no bundled markup." },
      { Component: DeliveryHubShowcase, title: "Delivery Hub", stat: "Every platform, one queue", body: "Orders from every delivery partner land in a single ticket queue: no tablet farm." },
      { Component: MultiVenueLiveShowcase, title: "Multi-Venue Command", stat: "5 venues, 1 login", body: "Every location's revenue, live, on one screen: no consolidating spreadsheets." },
      { Component: AICommandCenterShowcase, title: "AI Autonomous Actions", stat: "Decisions made while you sleep", body: "NUA watches every venue and acts (forecasts, reorders, roster fixes) with no manual required." },
    ],
  },
];

const FadeIn = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.6, delay }}
  >
    {children}
  </motion.div>
);

export default function Gallery() {
  return (
    <PageShell testId="gallery-page">
      <SEO
        title="Product Gallery: NUA"
        description="Live-animated renders of the real NUA interface: POS, AI copilot, loyalty wallet and more."
        canonical="https://nuapos.com.au/gallery"
      />
      <PageHero
        eyebrow="Product Gallery"
        title="See NUA, running."
        subtitle="Every screen below is a constructed, live-animated render of the real NUA interface, not a stock photo, not a competitor's screenshot. This is what your team actually sees, updating in real time."
        accent="#8b5cf6"
        crumb="Gallery"
      />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-10 pb-24 lg:pb-32 space-y-24">
        {/* Flagship 1 */}
        <FadeIn>
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#8b5cf6]">AI Command Center</span>
            <h2 className="font-display mt-3 text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Ask NUA anything about your business.
            </h2>
            <p className="mt-3 text-[#a1a1aa]">A real question, a real answer, a real dollar impact, right next to the dashboard it came from.</p>
          </div>
          <div className="flex justify-center overflow-x-auto py-4">
            <InsightsCopilotShowcase />
          </div>
        </FadeIn>

        {/* Flagship 2 */}
        <FadeIn delay={0.05}>
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#f58c14]">Analytics Dashboard</span>
            <h2 className="font-display mt-3 text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Your entire venue, one screen.
            </h2>
            <p className="mt-3 text-[#a1a1aa]">Sales, orders, AOV and venue performance: live, without stitching reports together yourself.</p>
          </div>
          <div className="flex justify-center overflow-x-auto py-4">
            <AnalyticsMonitorShowcase />
          </div>
        </FadeIn>

        {/* Flagship 3 */}
        <FadeIn delay={0.1}>
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#ec4899]">Loyalty & Wallet</span>
            <h2 className="font-display mt-3 text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Every sale earns loyalty, automatically.
            </h2>
            <p className="mt-3 text-[#a1a1aa]">No separate loyalty terminal, no manual entry: the wallet pass links itself to the sale.</p>
          </div>
          <div className="flex justify-center overflow-x-auto py-6 px-6">
            <ScanToPayShowcase />
          </div>
        </FadeIn>

        {/* Grouped grid: every other module, categorised */}
        {groups.map((group) => (
          <div key={group.label}>
            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="font-mono text-[11px] uppercase tracking-widest" style={{ color: group.color }}>{group.label}</span>
              <h2 className="font-display mt-3 text-2xl sm:text-3xl font-bold text-white tracking-tight">{group.title}</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-14">
              {group.items.map(({ Component, title, stat, body }, i) => (
                <FadeIn key={title} delay={(i % 2) * 0.08}>
                  <div className="flex flex-col items-center text-center">
                    <div className="overflow-x-auto max-w-full py-2">
                      <Component />
                    </div>
                    <h3 className="mt-5 font-display font-semibold text-white">{title}</h3>
                    <span
                      className="mt-1.5 inline-flex items-center px-2.5 py-1 rounded-full font-mono text-[10px] uppercase tracking-wider"
                      style={{ background: `${group.color}18`, color: group.color }}
                    >
                      {stat}
                    </span>
                    <p className="mt-2.5 text-sm text-[#a1a1aa] max-w-xs">{body}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
