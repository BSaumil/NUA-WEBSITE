import React from "react";
import { motion } from "framer-motion";
import { Eye, Gauge, ShieldCheck } from "lucide-react";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import CodeWindow from "@/components/graphics/CodeWindow";
import MeetAsh from "@/components/sections/MeetAsh";
import Voice from "@/components/sections/Voice";

const loopCode = `function ashDecisionLoop(signals) {
  for (signal of signals.stream()) {       // guests, stock, staff, margins
    context = enrich(signal, history, benchmarks)
    action = model.evaluate(context)

    if (action.confidence >= 0.95) {
      execute(action)
      log(action, status: "executed")
    } else if (action.confidence >= 0.75) {
      propose(action)                       // needs one-tap approval
      log(action, status: "approved-pending")
    } else {
      suggest(action)                       // surfaced, not actioned
      log(action, status: "suggested")
    }

    auditTrail.append(action)
  }
}`;

const principles = [
  { icon: Eye, title: "Always watching", body: "Ash consumes every signal across guests, stock, staff and margins in real time — no manual reporting required." },
  { icon: Gauge, title: "Confidence-scored", body: "Every action carries a confidence score. High-confidence moves auto-execute; the rest wait for a human tap." },
  { icon: ShieldCheck, title: "Fully auditable", body: "Nothing happens silently. Every suggestion, approval and execution is logged with the reasoning behind it." },
];

export default function AiAgent() {
  return (
    <PageShell testId="ai-agent-page">
      <PageHero
        eyebrow="— AI Agent"
        title="Meet Ash. The engine behind every module."
        subtitle="Ash isn't a chatbot bolted onto the side — it's the decision loop that every module in NUA reports into. Here's exactly how it decides what to suggest, approve, or execute."
        accent="#8b5cf6"
        crumb="AI Agent"
      />

      <section className="relative max-w-6xl mx-auto px-6 lg:px-10 pb-20">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">The decision loop.</h2>
            <p className="mt-3 text-[#a1a1aa] leading-relaxed">
              Every signal — a closed table, a stock dip, a roster gap — passes through the same evaluation loop. Ash scores its own confidence and decides how much autonomy to take.
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
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <CodeWindow filename="ash-core.pseudo" code={loopCode} accent="#8b5cf6" />
          </motion.div>
        </div>
      </section>

      <MeetAsh />
      <Voice />
    </PageShell>
  );
}
