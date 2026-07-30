import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import {
  AICommandCenterShowcase, MultiVenueLiveShowcase, LoyaltyWalletLiveShowcase,
  TemperatureMonitoringShowcase, PaymentsShowcase, DeliveryHubShowcase,
  BookingWaitlistShowcase, ForecastingShowcase,
} from "@/components/graphics/ShowcaseGraphics";

const cards = [
  { Component: AICommandCenterShowcase, impact: "NUA — Autopilot OS", body: "Decisions made while you sleep." },
  { Component: MultiVenueLiveShowcase, impact: "NUA — Growth OS", body: "Every venue's revenue, live, on one screen." },
  { Component: LoyaltyWalletLiveShowcase, impact: "NUA — Loyalty OS", body: "$1 spent = 1 point, credited instantly." },
  { Component: TemperatureMonitoringShowcase, impact: "NUA — Compliance OS", body: "Zero manual logs. Zero fines." },
  { Component: PaymentsShowcase, impact: "NUA — Payments OS", body: "$0 markup on top of bank rates." },
  { Component: DeliveryHubShowcase, impact: "NUA — Delivery OS", body: "Every platform's orders, one queue." },
  { Component: BookingWaitlistShowcase, impact: "NUA — Booking OS", body: "Zero double-bookings, ever." },
  { Component: ForecastingShowcase, impact: "NUA — Forecast OS", body: "Know tomorrow's rush, today." },
];

export default function LiveGallery() {
  return (
    <section id="live-gallery" data-testid="live-gallery-section" className="relative py-24 lg:py-32 bg-nua-bg overflow-hidden">
      <div className="absolute inset-0 bg-grid-dark opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_65%)]" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03]">
            <Sparkles className="w-3.5 h-3.5 text-[#8b5cf6]" />
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#a1a1aa]">— Live, right now</span>
          </div>
          <h2 className="font-display mt-5 text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.05]">
            Every module. Live. All the time.
          </h2>
          <p className="mt-4 text-[#a1a1aa] text-lg">
            Not mockups. Not screenshots. The exact screens your team sees — updating in real time, right now, on this page.
          </p>
        </motion.div>

        <div className="flex gap-6 overflow-x-auto pb-6 px-1 snap-x snap-mandatory [scrollbar-width:thin]">
          {cards.map(({ Component, impact, body }, i) => (
            <motion.div
              key={impact}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.06 }}
              className="flex-shrink-0 snap-center rounded-3xl border border-white/5 bg-[#101018] p-6 flex flex-col items-center text-center"
            >
              <div className="overflow-x-auto max-w-full py-1">
                <Component />
              </div>
              <div className="mt-5 font-display font-bold text-lg bg-gradient-to-r from-[#f58c14] via-[#ec4899] to-[#8b5cf6] bg-clip-text text-transparent">
                {impact}
              </div>
              <p className="mt-1.5 text-sm text-[#a1a1aa] max-w-[220px]">{body}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-4 flex justify-center">
          <Link
            to="/gallery"
            data-testid="live-gallery-see-all-link"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-[#0f0f14] text-sm font-semibold hover:bg-white/90 transition-colors"
          >
            Explore the full Product Gallery
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
