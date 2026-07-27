import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Database, ShieldCheck, Cpu, Layers, Zap, Radio, Share2, Eye } from "lucide-react";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";

const nodes = [
  { label: "POS", color: "#f58c14" },
  { label: "Reservations", color: "#8b5cf6" },
  { label: "KDS", color: "#ec4899" },
  { label: "Loyalty", color: "#ec4899" },
  { label: "Inventory", color: "#8b5cf6" },
  { label: "Staff", color: "#f58c14" },
  { label: "Analytics", color: "#f58c14" },
  { label: "Marketing", color: "#ec4899" },
];

const positioned = nodes.map((n, i) => {
  const angle = (i / nodes.length) * 2 * Math.PI - Math.PI / 2;
  return { ...n, x: 50 + 40 * Math.cos(angle), y: 50 + 40 * Math.sin(angle) };
});

const pillars = [
  { icon: Database, title: "Unified data layer", body: "One customer, one menu, one truth — every module reads and writes the same graph." },
  { icon: Cpu, title: "Real-time event bus", body: "Every order, booking, and shift change emits an event the AI layer observes instantly." },
  { icon: ShieldCheck, title: "Role-based access", body: "Owners, managers, and staff see exactly what they need — nothing more." },
  { icon: Layers, title: "Edge API for AI", body: "NUA's inference runs at the edge for sub-second suggestions, even mid-service." },
];

const eventFlow = [
  { icon: Radio, label: "Event fires", body: "e.g. a bill closes" },
  { icon: Share2, label: "Bus publishes", body: "broadcast to modules" },
  { icon: Zap, label: "Modules react", body: "loyalty, inventory..." },
  { icon: Eye, label: "NUA observes", body: "feeds the decision loop" },
];

export default function Platform() {
  return (
    <PageShell testId="platform-page">
      <PageHero
        eyebrow="— Platform architecture"
        title="One intelligence layer. Every module wired in."
        subtitle="NUA isn't ten disconnected apps duct-taped together — it's a single data graph and event bus that every module reads from and writes to, with NUA sitting at the center of it all."
        accent="#8b5cf6"
        crumb="Platform"
      />

      <section className="relative max-w-6xl mx-auto px-6 lg:px-10 pb-24">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-10 items-center">
          {/* Diagram */}
          <div className="relative aspect-square max-w-lg mx-auto w-full" data-testid="platform-architecture-diagram">
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
              {positioned.map((n) => (
                <line key={n.label} x1="50" y1="50" x2={n.x} y2={n.y} stroke="rgba(255,255,255,0.08)" strokeWidth="0.4" />
              ))}
            </svg>

            {/* Center node */}
            <div
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-gradient-to-br from-[#8b5cf6] to-[#7c3aed] shadow-lg shadow-[#8b5cf6]/40 px-4 py-3 flex flex-col items-center gap-1"
              style={{ left: "50%", top: "50%" }}
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span className="font-display text-xs font-semibold text-white whitespace-nowrap">NUA · Core</span>
            </div>

            {positioned.map((n, i) => (
              <motion.div
                key={n.label}
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="absolute -translate-x-1/2 -translate-y-1/2 rounded-xl bg-[#15151d] border border-white/10 px-3 py-2"
                style={{ left: `${n.x}%`, top: `${n.y}%` }}
              >
                <span className="font-mono text-[10px] whitespace-nowrap" style={{ color: n.color }}>{n.label}</span>
              </motion.div>
            ))}
          </div>

          {/* Explanation + graphical flow */}
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Every action is an event. Every event feeds the loop.
            </h2>
            <p className="mt-4 text-[#a1a1aa] leading-relaxed">
              When a table closes, a shift ends, or stock dips below par — that's an event on the bus. Modules subscribe to what they need, and NUA observes everything, building the context it uses to forecast, suggest, and act.
            </p>
            <div className="mt-6 rounded-2xl bg-[#15151d] border border-white/5 p-5" data-testid="event-flow-graphic">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {eventFlow.map((s, i) => (
                  <div key={s.label} className="relative rounded-xl bg-white/[0.03] border border-white/5 p-3">
                    <div className="w-8 h-8 rounded-lg bg-[#8b5cf6]/15 flex items-center justify-center">
                      <s.icon className="w-4 h-4 text-[#8b5cf6]" />
                    </div>
                    <div className="mt-2 text-[12px] font-semibold text-white leading-tight">{s.label}</div>
                    <div className="text-[10px] text-[#a1a1aa] mt-0.5">{s.body}</div>
                    {i < eventFlow.length - 1 && (
                      <span className="hidden sm:block absolute top-1/2 -right-[13px] -translate-y-1/2 text-[#71717a] text-xs">→</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Pillars */}
        <div className="mt-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="rounded-2xl bg-[#15151d] border border-white/5 p-5"
            >
              <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center">
                <p.icon className="w-4 h-4 text-[#8b5cf6]" />
              </div>
              <h3 className="mt-4 font-display font-semibold text-white">{p.title}</h3>
              <p className="mt-1.5 text-sm text-[#a1a1aa] leading-relaxed">{p.body}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
