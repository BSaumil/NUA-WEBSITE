import React from "react";
import { motion } from "framer-motion";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import {
  InsightsCopilotShowcase, AnalyticsMonitorShowcase, ScanToPayShowcase,
  POSShowcase, KDSShowcase, ReservationsShowcase, StaffShowcase,
  InventoryShowcase, MarketingShowcase, VoiceShowcase,
} from "@/components/graphics/ShowcaseGraphics";

const grid = [
  { Component: POSShowcase, title: "Point of Sale", body: "Fast checkout that keeps working offline." },
  { Component: KDSShowcase, title: "Kitchen Display", body: "Tickets route to the right station, aging tracked live." },
  { Component: ReservationsShowcase, title: "Reservations", body: "Every table's status, VIPs flagged automatically." },
  { Component: StaffShowcase, title: "Staff Management", body: "AI-optimised rosters, one tap to approve." },
  { Component: InventoryShowcase, title: "Inventory & Purchasing", body: "Buy, wait, or reorder — decided for you." },
  { Component: MarketingShowcase, title: "Marketing Automation", body: "Segments and campaigns that trigger themselves." },
  { Component: VoiceShowcase, title: "Voice POS", body: "Hands-free ordering, discounts and reports." },
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
      <PageHero
        eyebrow="— Product Gallery"
        title="See NUA, running."
        subtitle="Every screen below is a constructed render of the real NUA interface — not a stock photo, not a competitor's screenshot. This is what your team actually sees."
        accent="#8b5cf6"
        crumb="Gallery"
      />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-10 pb-24 lg:pb-32 space-y-24">
        {/* Flagship 1 */}
        <FadeIn>
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#8b5cf6]">— AI Command Center</span>
            <h2 className="font-display mt-3 text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Ask NUA anything about your business.
            </h2>
            <p className="mt-3 text-[#a1a1aa]">A real question, a real answer, a real dollar impact — right next to the dashboard it came from.</p>
          </div>
          <div className="flex justify-center overflow-x-auto py-4">
            <InsightsCopilotShowcase />
          </div>
        </FadeIn>

        {/* Flagship 2 */}
        <FadeIn delay={0.05}>
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#f58c14]">— Analytics Dashboard</span>
            <h2 className="font-display mt-3 text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Your entire venue, one screen.
            </h2>
            <p className="mt-3 text-[#a1a1aa]">Sales, orders, AOV and venue performance — live, without stitching reports together yourself.</p>
          </div>
          <div className="flex justify-center overflow-x-auto py-4">
            <AnalyticsMonitorShowcase />
          </div>
        </FadeIn>

        {/* Flagship 3 */}
        <FadeIn delay={0.1}>
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#ec4899]">— Loyalty & Wallet</span>
            <h2 className="font-display mt-3 text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Every sale earns loyalty, automatically.
            </h2>
            <p className="mt-3 text-[#a1a1aa]">No separate loyalty terminal, no manual entry — the wallet pass links itself to the sale.</p>
          </div>
          <div className="flex justify-center overflow-x-auto py-6 px-6">
            <ScanToPayShowcase />
          </div>
        </FadeIn>

        {/* Grid of the rest */}
        <div>
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#a1a1aa]">— Every other module</span>
            <h2 className="font-display mt-3 text-2xl sm:text-3xl font-bold text-white tracking-tight">
              The rest of the platform.
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-x-6 gap-y-14">
            {grid.map(({ Component, title, body }, i) => (
              <FadeIn key={title} delay={(i % 2) * 0.08}>
                <div className="flex flex-col items-center text-center">
                  <div className="overflow-x-auto max-w-full py-2">
                    <Component />
                  </div>
                  <h3 className="mt-5 font-display font-semibold text-white">{title}</h3>
                  <p className="mt-1 text-sm text-[#a1a1aa] max-w-xs">{body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
