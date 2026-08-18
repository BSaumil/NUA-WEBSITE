import React from "react";
import { motion } from "framer-motion";
import { MapPin, TrendingUp, DollarSign, Globe2 } from "lucide-react";
import LiveNumber from "@/components/graphics/LiveNumber";
import { MultiVenueLiveShowcase } from "@/components/graphics/ShowcaseGraphics";

const locations = [
  { city: "Sydney", x: 78, y: 78, status: "vip", revenue: "$48.2k" },
  { city: "Melbourne", x: 70, y: 85, status: "live", revenue: "$36.7k" },
  { city: "Auckland", x: 92, y: 80, status: "live", revenue: "$24.1k" },
  { city: "Singapore", x: 72, y: 56, status: "live", revenue: "$31.5k" },
  { city: "Tokyo", x: 86, y: 38, status: "alert", revenue: "$42.9k" },
  { city: "Bangkok", x: 70, y: 52, status: "live", revenue: "$19.2k" },
  { city: "Dubai", x: 58, y: 47, status: "live", revenue: "$28.4k" },
  { city: "London", x: 48, y: 28, status: "live", revenue: "$62.1k" },
  { city: "Paris", x: 49, y: 30, status: "live", revenue: "$54.8k" },
  { city: "New York", x: 26, y: 38, status: "vip", revenue: "$71.3k" },
  { city: "LA", x: 14, y: 42, status: "live", revenue: "$45.2k" },
  { city: "Toronto", x: 24, y: 32, status: "live", revenue: "$22.9k" },
];

const statusColor = {
  live: "#22c55e",
  vip: "#8b5cf6",
  alert: "#f58c14",
};

export default function MultiLocation() {
  return (
    <section id="multi-location" data-testid="multi-location-section" className="relative py-24 lg:py-32 bg-[#f6f7fb] text-[#0f0f14]">
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="font-mono text-[11px] uppercase tracking-widest text-[#6d28d9]">Multi-location control</span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display mt-3 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.02]"
          >
            From one venue to a global group.
          </motion.h2>
          <p className="mt-5 text-[#444450]">
            Franchise dashboards, central pricing, menu syncing, benchmarking: your entire estate, one source of truth.
          </p>
        </div>

        <div className="rounded-2xl bg-white border border-black/5 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.08)] overflow-hidden">
          <div className="grid lg:grid-cols-[1fr_320px]">
            {/* Map */}
            <div className="relative aspect-[16/9] bg-[#fafafb] border-r border-black/5 overflow-hidden">
              {/* Dotted globe */}
              <svg className="absolute inset-0 w-full h-full opacity-50" viewBox="0 0 100 56" preserveAspectRatio="none">
                {Array.from({ length: 30 }).map((_, row) =>
                  Array.from({ length: 60 }).map((_, col) => {
                    const cx = (col / 60) * 100;
                    const cy = (row / 30) * 56;
                    const rx = ((cx - 50) / 50);
                    const ry = ((cy - 28) / 28);
                    const inGlobe = rx * rx + ry * ry < 0.85;
                    if (!inGlobe) return null;
                    return <circle key={`${row}-${col}`} cx={cx} cy={cy} r="0.3" fill="#0f0f14" opacity="0.2" />;
                  })
                )}
              </svg>

              {/* Pulse points */}
              {locations.map((l, i) => {
                const c = statusColor[l.status];
                return (
                  <div
                    key={l.city}
                    className="absolute"
                    style={{ left: `${l.x}%`, top: `${l.y}%`, transform: "translate(-50%, -50%)" }}
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.04 }}
                      className="relative"
                    >
                      <span className="absolute inset-0 -m-2 rounded-full animate-pulse-dot" style={{ background: c, opacity: 0.25 }} />
                      <span className="block w-2.5 h-2.5 rounded-full ring-2 ring-white shadow" style={{ background: c }} />
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 whitespace-nowrap font-mono text-[10px] text-[#0f0f14] hidden md:inline-block">
                        {l.city}
                      </span>
                    </motion.div>
                  </div>
                );
              })}
            </div>

            {/* Sidebar */}
            <div className="p-5 space-y-4">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-[#666670]">Global today</div>
                <div className="font-display text-3xl font-bold mt-1"><LiveNumber value={1.42} prefix="$" decimals={2} suffix="M" /></div>
                <div className="font-mono text-[11px] text-emerald-600">▲ 14.6% vs LW</div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-xl bg-[#f6f7fb] border border-black/5 p-3">
                  <Globe2 className="w-4 h-4 text-[#8b5cf6]" />
                  <div className="mt-2 font-display text-lg font-bold"><LiveNumber value={42} /></div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-[#666670]">Venues live</div>
                </div>
                <div className="rounded-xl bg-[#f6f7fb] border border-black/5 p-3">
                  <TrendingUp className="w-4 h-4 text-[#f58c14]" />
                  <div className="mt-2 font-display text-lg font-bold">+22%</div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-[#666670]">YoY growth</div>
                </div>
              </div>

              <div className="space-y-1 max-h-56 overflow-y-auto pr-1">
                {locations.slice(0, 8).map((l) => (
                  <div key={l.city} className="flex items-center justify-between py-1.5 px-2 rounded-md hover:bg-[#f6f7fb] transition-colors">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: statusColor[l.status] }} />
                      <span className="text-sm text-[#0f0f14]">{l.city}</span>
                    </div>
                    <span className="font-mono text-[11px] text-[#666670]">{l.revenue}</span>
                  </div>
                ))}
              </div>
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
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#666670] mb-5">See it live</span>
          <div className="overflow-x-auto max-w-full py-1">
            <MultiVenueLiveShowcase />
          </div>
          <p className="mt-4 text-sm text-[#666670] max-w-sm">NUA: Growth OS. Every venue's revenue, live, on one screen.</p>
        </motion.div>
      </div>
    </section>
  );
}
