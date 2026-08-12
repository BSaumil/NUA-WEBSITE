import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import {
  POSShowcase, KDSShowcase, MarketingShowcase, TemperatureMonitoringShowcase,
  PaymentsShowcase, DeliveryHubShowcase, ForecastingShowcase,
} from "@/components/graphics/ShowcaseGraphics";

const items = [
  { Component: POSShowcase, impact: "NUA: Checkout OS", color: "#f58c14", title: "Point of Sale", body: "Fast checkout that keeps working offline. Charges cards, splits bills, never goes down." },
  { Component: KDSShowcase, impact: "NUA: Kitchen OS", color: "#ec4899", title: "Kitchen Display", body: "Tickets route to the right station instantly, aging tracked to the second." },
  { Component: MarketingShowcase, impact: "NUA: Marketing OS", color: "#ec4899", title: "Marketing Automation", body: "Segments and win-back offers that trigger themselves: 24 hours a day." },
  { Component: TemperatureMonitoringShowcase, impact: "NUA: Compliance OS", color: "#f58c14", title: "Temperature Monitoring", body: "Fridges and freezers logged automatically: alerts sent the instant something drifts." },
  { Component: PaymentsShowcase, impact: "NUA: Payments OS", color: "#8b5cf6", title: "Payments & EFTPOS", body: "Tap, insert or scan: any method, settled instantly, no bundled markup." },
  { Component: DeliveryHubShowcase, impact: "NUA: Delivery OS", color: "#f58c14", title: "Delivery Hub", body: "Every delivery partner's orders land in one queue: no tablet farm at the pass." },
  { Component: ForecastingShowcase, impact: "NUA: Forecast OS", color: "#22c55e", title: "Demand Forecasting", body: "NUA predicts next week's rush and adjusts purchase orders before you even ask." },
];

export default function MoreModules() {
  return (
    <section id="more-modules" data-testid="more-modules-section" className="relative py-24 lg:py-32 bg-nua-bg overflow-hidden">
      <div className="absolute inset-0 bg-grid-dark opacity-25 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="font-mono text-[11px] uppercase tracking-widest text-[#f58c14]">The rest of the platform</span>
          <h2 className="font-display mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.05]">
            Everything else NUA replaces.
          </h2>
          <p className="mt-4 text-[#a1a1aa] text-lg">
            Checkout, kitchen routing, marketing, compliance, payments, delivery and forecasting: all built in, all live, all included.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-x-6 gap-y-16">
          {items.map(({ Component, impact, color, title, body }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 2) * 0.08 }}
              className="flex flex-col items-center text-center"
            >
              <div className="overflow-x-auto max-w-full py-2">
                <Component />
              </div>
              <h3 className="mt-5 font-display font-semibold text-white">{title}</h3>
              <span
                className="mt-1.5 inline-flex items-center px-2.5 py-1 rounded-full font-mono text-[10px] uppercase tracking-wider"
                style={{ background: `${color}18`, color }}
              >
                {impact}
              </span>
              <p className="mt-2.5 text-sm text-[#a1a1aa] max-w-xs">{body}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <Link
            to="/features"
            data-testid="more-modules-see-all-link"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/10 text-white text-sm font-medium hover:bg-white/5 transition-colors"
          >
            See how every feature works, graphically
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
