import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Check, X, ArrowRight } from "lucide-react";

const rows = [
  { label: "AI automation", nua: true, them: false, note: "NUA runs ops end-to-end" },
  { label: "Demand forecasting", nua: true, them: false, note: "Predicts covers, stock, labour" },
  { label: "Voice control", nua: true, them: false, note: "Natural language POS" },
  { label: "Loyalty intelligence", nua: true, them: "limited", note: "Tiers, perks, behaviour-triggered" },
  { label: "Inventory optimisation", nua: true, them: "limited", note: "Recipe-level + supplier compare" },
  { label: "Staff automation", nua: true, them: false, note: "AI rostering + swaps" },
  { label: "Unified data layer", nua: true, them: false, note: "One source of truth" },
  { label: "Multi-location orchestration", nua: true, them: "limited", note: "Central control, local nuance" },
  { label: "Setup time", nua: "24h", them: "weeks–months", note: "Magic onboarding" },
];

const Cell = ({ value, win }) => {
  if (value === true) {
    return (
      <div className={`inline-flex items-center justify-center w-8 h-8 rounded-lg ${win ? "bg-nua-burgundyWash" : "bg-nua-bgAlt"}`}>
        <Check className={`w-4 h-4 ${win ? "text-nua-burgundy" : "text-nua-ink2"}`} />
      </div>
    );
  }
  if (value === false) {
    return (
      <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-nua-bgAlt">
        <X className="w-4 h-4 text-nua-ink2" />
      </div>
    );
  }
  return (
    <span className={`font-mono text-[11px] uppercase tracking-wider ${win ? "text-nua-burgundy" : "text-nua-ink2"}`}>
      {value}
    </span>
  );
};

export default function WhyNua() {
  return (
    <section id="why-nua" data-testid="why-nua-section" className="relative py-24 lg:py-32 bg-nua-bg overflow-hidden">
      <div className="absolute inset-0 bg-grid-dark opacity-20 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" />
      <div className="relative max-w-5xl mx-auto px-6 lg:px-10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="font-mono text-[11px] uppercase tracking-widest text-nua-burgundy">Why NUA</span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display mt-3 text-4xl sm:text-5xl lg:text-6xl font-bold text-nua-ink tracking-tight leading-[1.02]"
          >
            NUA vs traditional POS.
          </motion.h2>
          <p className="mt-5 text-nua-ink2">
            Legacy systems were built to record. NUA is built to think, and act.
          </p>
        </div>

        <div className="rounded-2xl border border-nua-border bg-nua-surface overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-[1.6fr_0.6fr_0.6fr_1fr] gap-2 px-5 py-4 border-b border-nua-border bg-nua-bgAlt">
            <span className="font-mono text-[11px] uppercase tracking-widest text-nua-ink2">Capability</span>
            <span className="font-display text-sm font-semibold text-nua-burgundy text-center">NUA</span>
            <span className="font-display text-sm font-semibold text-nua-ink2 text-center">Traditional POS*</span>
            <span className="font-mono text-[11px] uppercase tracking-widest text-nua-ink2 hidden md:block">Notes</span>
          </div>

          {rows.map((r, i) => (
            <motion.div
              key={r.label}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              className="grid grid-cols-[1.6fr_0.6fr_0.6fr_1fr] gap-2 items-center px-5 py-4 border-b border-nua-border last:border-b-0 hover:bg-nua-bgAlt transition-colors"
            >
              <span className="font-display text-sm font-semibold text-nua-ink">{r.label}</span>
              <div className="text-center"><Cell value={r.nua} win /></div>
              <div className="text-center"><Cell value={r.them} /></div>
              <span className="font-mono text-[11px] text-nua-ink2 hidden md:block">{r.note}</span>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            to="/savings"
            data-testid="why-nua-see-cost-breakdown-link"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-nua-border text-nua-ink text-sm font-medium hover:bg-nua-bgAlt transition-colors"
          >
            See the full cost breakdown, dollar for dollar
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <p className="mt-6 text-center text-[11px] text-nua-muted max-w-2xl mx-auto">
          *"Traditional POS" refers to a generic legacy category, not any specific named vendor. Example comparison only, individual products vary.
        </p>
      </div>
    </section>
  );
}
