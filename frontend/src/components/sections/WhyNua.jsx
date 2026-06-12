import React from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const rows = [
  { label: "AI automation", nua: true, them: false, note: "Ash runs ops end-to-end" },
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
      <div className={`inline-flex items-center justify-center w-8 h-8 rounded-lg ${win ? "bg-[#f58c14]/15" : "bg-white/5"}`}>
        <Check className={`w-4 h-4 ${win ? "text-[#f58c14]" : "text-[#a1a1aa]"}`} />
      </div>
    );
  }
  if (value === false) {
    return (
      <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-white/5">
        <X className="w-4 h-4 text-[#71717a]" />
      </div>
    );
  }
  return (
    <span className={`font-mono text-[11px] uppercase tracking-wider ${win ? "text-[#8b5cf6]" : "text-[#a1a1aa]"}`}>
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
          <span className="font-mono text-[11px] uppercase tracking-widest text-[#8b5cf6]">— Why NUA</span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display mt-3 text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.02]"
          >
            NUA vs traditional POS.
          </motion.h2>
          <p className="mt-5 text-[#a1a1aa]">
            Legacy systems were built to record. NUA is built to think — and act.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#15151d] overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-[1.6fr_0.6fr_0.6fr_1fr] gap-2 px-5 py-4 border-b border-white/5 bg-white/[0.02]">
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#a1a1aa]">Capability</span>
            <span className="font-display text-sm font-semibold text-[#f58c14] text-center">NUA</span>
            <span className="font-display text-sm font-semibold text-[#a1a1aa] text-center">Traditional POS</span>
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#a1a1aa] hidden md:block">Notes</span>
          </div>

          {rows.map((r, i) => (
            <motion.div
              key={r.label}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              className="grid grid-cols-[1.6fr_0.6fr_0.6fr_1fr] gap-2 items-center px-5 py-4 border-b border-white/5 last:border-b-0 hover:bg-white/[0.02] transition-colors"
            >
              <span className="font-display text-sm font-semibold text-white">{r.label}</span>
              <div className="text-center"><Cell value={r.nua} win /></div>
              <div className="text-center"><Cell value={r.them} /></div>
              <span className="font-mono text-[11px] text-[#a1a1aa] hidden md:block">{r.note}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
