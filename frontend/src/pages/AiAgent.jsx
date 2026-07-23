import React from "react";
import { motion } from "framer-motion";
import { Eye, Gauge, ShieldCheck, Radio, Layers, Sparkles, CheckCircle2, Clock } from "lucide-react";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import MeetNua from "@/components/sections/MeetNua";
import Voice from "@/components/sections/Voice";

const steps = [
  { icon: Radio, title: "Signal received", body: "A closed table, a stock dip, a roster gap — every event streams in." },
  { icon: Layers, title: "Context enriched", body: "NUA cross-references history, benchmarks, and live conditions." },
  { icon: Gauge, title: "Confidence scored", body: "Every possible action gets a confidence score before anything happens." },
];

const outcomes = [
  { icon: CheckCircle2, label: "Executed", range: "95%+ confidence", body: "Acts automatically, no wait.", color: "#22c55e" },
  { icon: Sparkles, label: "Approved-pending", range: "75–94% confidence", body: "One-tap approval needed.", color: "#8b5cf6" },
  { icon: Clock, label: "Suggested", range: "Below 75%", body: "Surfaced, never auto-actioned.", color: "#f58c14" },
];

const principles = [
  { icon: Eye, title: "Always watching", body: "NUA consumes every signal across guests, stock, staff and margins in real time — no manual reporting required." },
  { icon: Gauge, title: "Confidence-scored", body: "Every action carries a confidence score. High-confidence moves auto-execute; the rest wait for a human tap." },
  { icon: ShieldCheck, title: "Fully auditable", body: "Nothing happens silently. Every suggestion, approval and execution is logged with the reasoning behind it." },
];

export default function AiAgent() {
  return (
    <PageShell testId="ai-agent-page">
      <PageHero
        eyebrow="— AI Agent"
        title="Meet NUA. The engine behind every module."
        subtitle="NUA isn't a chatbot bolted onto the side — it's the decision loop that every module reports into. Here's exactly how it decides what to suggest, approve, or execute."
        accent="#8b5cf6"
        crumb="AI Agent"
      />

      <section className="relative max-w-6xl mx-auto px-6 lg:px-10 pb-20">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">The decision loop.</h2>
            <p className="mt-3 text-[#a1a1aa] leading-relaxed">
              Every signal — a closed table, a stock dip, a roster gap — passes through the same evaluation loop. NUA scores its own confidence and decides how much autonomy to take.
            </p>
            <div className="mt-6 space-y-4">
              {principles.map((p) => (
                <div key={p.title} className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#8b5cf6]/15 flex items-center justify-center flex-shrink-0">
                    <p.icon className="w-4 h-4 text-[#8b5cf6]" />
                  </div>
                  <div>
                    <div className="font-display font-semibold text-white text-sm">{p.title}</div>
                    <div className="text-sm text-[#a1a1aa] mt-0.5 leading-relaxed">{p.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Graphical decision flow — replaces raw code */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            data-testid="ai-agent-decision-flow"
            className="rounded-2xl bg-[#15151d] border border-white/5 p-6 sm:p-7"
          >
            <div className="relative pl-11">
              <div className="absolute left-[19px] top-5 bottom-5 w-px bg-white/10" />
              {steps.map((s) => (
                <div key={s.title} className="relative flex items-start gap-3 pb-6 last:pb-0">
                  <div className="absolute -left-11 w-10 h-10 rounded-xl bg-[#8b5cf6]/15 border border-[#8b5cf6]/30 flex items-center justify-center">
                    <s.icon className="w-4 h-4 text-[#8b5cf6]" />
                  </div>
                  <div>
                    <div className="font-display font-semibold text-white text-sm">{s.title}</div>
                    <div className="text-[13px] text-[#a1a1aa] mt-0.5 leading-relaxed">{s.body}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-2 pt-5 border-t border-white/5">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#71717a]">Then, one of three outcomes</span>
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {outcomes.map((o) => (
                  <div key={o.label} className="rounded-xl bg-white/[0.03] border border-white/5 p-3">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${o.color}20` }}>
                      <o.icon className="w-3.5 h-3.5" style={{ color: o.color }} />
                    </div>
                    <div className="mt-2 text-[13px] font-semibold text-white">{o.label}</div>
                    <div className="font-mono text-[9px] uppercase tracking-wider mt-0.5" style={{ color: o.color }}>{o.range}</div>
                    <div className="text-[11px] text-[#a1a1aa] mt-1.5 leading-relaxed">{o.body}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <MeetNua />
      <Voice />
    </PageShell>
  );
}
