import React from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Clock, AlertTriangle, TrendingDown, Sparkles } from "lucide-react";

const cards = [
  {
    icon: ShoppingCart,
    accent: "#22c55e",
    label: "Buy now",
    title: "Heirloom tomatoes — 8kg",
    body: "Demand forecast +24% next 7 days. Supplier A holding inventory; price stable.",
    meta: "Supplier A · $4.20/kg · ETA 6h",
  },
  {
    icon: Clock,
    accent: "#8b5cf6",
    label: "Wait 3 days",
    title: "Yellowfin tuna — 3kg",
    body: "Price drops 11% projected. Current stock covers Mon–Wed service. Hold for Thursday delivery.",
    meta: "Confidence 92% · auto-monitor",
  },
  {
    icon: AlertTriangle,
    accent: "#f58c14",
    label: "Price increasing",
    title: "Olive oil — 20L",
    body: "Bulk pricing rising 8% from supplier B next week. Lock 4-week stock today.",
    meta: "Supplier B · save $186 this month",
  },
  {
    icon: TrendingDown,
    accent: "#ec4899",
    label: "Waste alert",
    title: "Burrata — 2.1kg",
    body: "Usage trending 31% under forecast. Suggest 86 from Friday menu or run staff special.",
    meta: "Expires in 2 days · cost $94",
  },
];

const stats = [
  { label: "Avg. food cost", value: "−4.8%" },
  { label: "Waste reduction", value: "32%" },
  { label: "Auto-reordered SKUs", value: "184" },
];

export default function Inventory() {
  return (
    <section id="inventory" data-testid="inventory-section" className="relative py-24 lg:py-32 bg-[#f6f7fb] text-[#0f0f14]">
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
          <div className="max-w-2xl">
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#f58c14]">— Inventory & smart purchasing</span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-display mt-3 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.02]"
            >
              Smart Pantry that
              <br />
              <span className="text-[#666670]">orders for you.</span>
            </motion.h2>
            <p className="mt-5 text-[#444450] max-w-lg leading-relaxed">
              Recipe-level costing, supplier comparison, demand forecasting and waste tracking — Ash recommends the exact buy at the exact time.
            </p>
          </div>

          <div className="flex gap-3">
            {stats.map((s) => (
              <div key={s.label} className="px-4 py-3 rounded-xl bg-white border border-black/5 shadow-sm">
                <div className="font-display text-2xl font-bold">{s.value}</div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-[#666670]">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                data-testid={`inventory-card-${i}`}
                className="group relative rounded-2xl bg-white border border-black/5 p-5 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div
                  className="absolute top-0 left-5 right-5 h-px"
                  style={{ background: `linear-gradient(90deg, transparent, ${c.accent}, transparent)` }}
                />
                <div className="flex items-center justify-between">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: `${c.accent}15`, color: c.accent }}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span
                    className="px-2 py-0.5 rounded-full font-mono text-[10px] uppercase tracking-wider"
                    style={{ background: `${c.accent}15`, color: c.accent }}
                  >
                    {c.label}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold">{c.title}</h3>
                <p className="mt-1.5 text-sm text-[#444450] leading-relaxed">{c.body}</p>
                <div className="mt-4 pt-4 border-t border-black/5 flex items-center gap-2">
                  <Sparkles className="w-3 h-3 text-[#8b5cf6]" />
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#666670]">{c.meta}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
