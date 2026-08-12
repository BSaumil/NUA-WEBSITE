import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, DollarSign, Users, Target, ArrowUpRight } from "lucide-react";
import LiveNumber from "@/components/graphics/LiveNumber";
import { InsightsCopilotShowcase } from "@/components/graphics/ShowcaseGraphics";

const kpis = [
  { icon: DollarSign, label: "Revenue today", value: 32418, prefix: "$", delta: "+18.4%", color: "#f58c14" },
  { icon: Users, label: "Covers", value: 248, delta: "+6.2%", color: "#8b5cf6" },
  { icon: TrendingUp, label: "AOV", value: 48.2, prefix: "$", decimals: 2, delta: "+3.1%", color: "#ec4899" },
  { icon: Target, label: "Margin", value: 63, suffix: "%", delta: "+1.2pp", color: "#22c55e" },
];

const todayPath = "M0,120 C40,100 60,90 90,75 C120,65 140,55 170,50 C200,40 220,55 250,35 C280,25 300,40 330,28 C360,20 380,30 400,18";

const matrix = [
  { name: "Truffle pasta", category: "Star", x: 88, y: 92 },
  { name: "Wagyu sirloin", category: "Star", x: 76, y: 84 },
  { name: "Sea bass", category: "Plowhorse", x: 28, y: 72 },
  { name: "Burrata", category: "Puzzle", x: 70, y: 22 },
  { name: "Tiramisu", category: "Star", x: 82, y: 76 },
  { name: "Caesar salad", category: "Plowhorse", x: 22, y: 80 },
  { name: "Espresso martini", category: "Star", x: 84, y: 64 },
  { name: "Olive plate", category: "Dog", x: 18, y: 14 },
  { name: "Carpaccio", category: "Puzzle", x: 64, y: 18 },
];

const catColor = {
  Star: "#f58c14",
  Plowhorse: "#8b5cf6",
  Puzzle: "#ec4899",
  Dog: "#71717a",
};

export default function Analytics() {
  return (
    <section id="analytics" data-testid="analytics-section" className="relative py-24 lg:py-32 bg-nua-bg overflow-hidden">
      <div className="absolute inset-0 bg-grid-dark opacity-25 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <div className="max-w-2xl mb-12">
          <span className="font-mono text-[11px] uppercase tracking-widest text-[#f58c14]">Analytics & intelligence</span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display mt-3 text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.02]"
          >
            See the venue
            <br />
            <span className="text-[#a1a1aa]">like never before.</span>
          </motion.h2>
          <p className="mt-5 text-[#a1a1aa] max-w-lg">
            Live revenue streams, menu engineering, retention heatmaps, profit analysis and forecasting: built into one executive dashboard.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* KPI cards */}
          {kpis.map((k, i) => (
            <motion.div
              key={k.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="lg:col-span-3 rounded-2xl bg-[#15151d] border border-white/5 p-5"
            >
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${k.color}15` }}>
                  <k.icon className="w-4 h-4" style={{ color: k.color }} />
                </div>
                <span className="font-mono text-[10px] text-emerald-400">{k.delta}</span>
              </div>
              <div className="mt-4 font-display text-3xl font-bold text-white">
                <LiveNumber value={k.value} prefix={k.prefix} suffix={k.suffix} decimals={k.decimals} />
              </div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-[#a1a1aa] mt-1">{k.label}</div>
            </motion.div>
          ))}

          {/* Revenue chart */}
          <div className="lg:col-span-8 rounded-2xl bg-[#15151d] border border-white/5 p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <div className="font-display text-lg font-semibold text-white">Revenue stream · last 24h</div>
                <div className="font-mono text-[11px] text-[#a1a1aa]">Live · updates every 60s</div>
              </div>
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-[#a1a1aa]">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#f58c14]" />Today</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#8b5cf6]" />Last week</span>
              </div>
            </div>

            <svg viewBox="0 0 400 140" className="w-full h-40">
              <defs>
                <linearGradient id="todayGrad" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#f58c14" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#f58c14" stopOpacity="0" />
                </linearGradient>
              </defs>
              {[0, 1, 2, 3].map((g) => (
                <line key={g} x1="0" x2="400" y1={35 * (g + 1)} y2={35 * (g + 1)} stroke="#ffffff10" strokeDasharray="2 4" />
              ))}
              {/* Last week */}
              <path
                d="M0,110 C40,95 60,100 90,80 C120,60 140,75 170,65 C200,55 220,70 250,50 C280,30 300,55 330,45 C360,40 380,55 400,40"
                stroke="#8b5cf6"
                strokeWidth="1.5"
                fill="none"
                opacity="0.6"
                strokeDasharray="3 3"
              />
              {/* Today */}
              <motion.path
                d={`${todayPath} L400,140 L0,140 Z`}
                fill="url(#todayGrad)"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
              />
              <motion.path
                d={todayPath}
                stroke="#f58c14"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease: "easeInOut" }}
              />
              <motion.circle
                cx="400"
                cy="18"
                r="4"
                fill="#f58c14"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: [0, 1, 0.4, 1] }}
                viewport={{ once: true }}
                transition={{ duration: 1.6, delay: 1.4, repeat: Infinity, repeatDelay: 0.4 }}
              />
            </svg>
          </div>

          {/* Menu Engineering matrix */}
          <div className="lg:col-span-4 rounded-2xl bg-[#15151d] border border-white/5 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="font-display text-lg font-semibold text-white">Menu engineering</div>
              <ArrowUpRight className="w-4 h-4 text-[#a1a1aa]" />
            </div>
            <div className="relative aspect-square rounded-xl bg-[#0b0b0f] border border-white/5">
              {/* axes */}
              <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
                {["Puzzle", "Star", "Dog", "Plowhorse"].map((c) => (
                  <div key={c} className="border border-white/5 flex items-start justify-start p-2">
                    <span className="font-mono text-[9px] uppercase text-[#666670]">{c}</span>
                  </div>
                ))}
              </div>
              {matrix.map((d, i) => (
                <motion.div
                  key={d.name}
                  className="absolute rounded-full ring-2 ring-[#0b0b0f]"
                  style={{
                    left: `${d.x}%`,
                    bottom: `${d.y}%`,
                    width: "10px",
                    height: "10px",
                    translateX: "-50%",
                    translateY: "50%",
                    background: catColor[d.category],
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.3 + i * 0.06 }}
                  title={d.name}
                />
              ))}
              {/* Axis labels */}
              <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 font-mono text-[10px] text-[#a1a1aa]">Popularity →</span>
              <span className="absolute -left-2 top-1/2 -translate-y-1/2 -rotate-90 origin-center font-mono text-[10px] text-[#a1a1aa] whitespace-nowrap">Margin →</span>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 flex flex-col items-center text-center"
        >
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#71717a] mb-5">See it live</span>
          <div className="overflow-x-auto max-w-full py-4">
            <InsightsCopilotShowcase />
          </div>
          <p className="mt-4 text-sm text-[#a1a1aa] max-w-sm">NUA: Insights OS. Ask a real question, get a real answer, in dollars.</p>
        </motion.div>
      </div>
    </section>
  );
}
