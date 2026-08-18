import React from "react";
import { motion } from "framer-motion";
import {
  Eye, Gauge, ShieldCheck, Radio, Layers, Sparkles, CheckCircle2, Clock,
  TrendingUp, PackageSearch, UserMinus, Repeat, AlertTriangle, Timer, Download,
} from "lucide-react";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import SEO from "@/components/SEO";
import { Switch } from "@/components/ui/switch";
import MeetNua from "@/components/sections/MeetNua";
import Voice from "@/components/sections/Voice";

const steps = [
  { icon: Radio, title: "Signal received", body: "A closed table, a stock dip, a roster gap: every event streams in." },
  { icon: Layers, title: "Context enriched", body: "NUA cross-references history, benchmarks, and live conditions." },
  { icon: Gauge, title: "Confidence scored", body: "Every possible action gets a confidence score before anything happens." },
];

const outcomes = [
  { icon: CheckCircle2, label: "Executed", range: "95%+ confidence", body: "Acts automatically, no wait.", color: "#22c55e" },
  { icon: Sparkles, label: "Approved-pending", range: "75–94% confidence", body: "One-tap approval needed.", color: "#8b5cf6" },
  { icon: Clock, label: "Suggested", range: "Below 75%", body: "Surfaced, never auto-actioned.", color: "#f58c14" },
];

const principles = [
  { icon: Eye, title: "Always watching", body: "NUA consumes every signal across guests, stock, staff and margins in real time: no manual reporting required." },
  { icon: Gauge, title: "Confidence-scored", body: "Every action carries a confidence score. High-confidence moves auto-execute; the rest wait for a human tap." },
  { icon: ShieldCheck, title: "Fully auditable", body: "Nothing happens silently. Every suggestion, approval and execution is logged with the reasoning behind it." },
];

const automations = [
  { icon: Sparkles, name: "VIP re-engagement", body: "Notifies front-of-house and assigns a comp the moment a top-tier guest walks in.", on: true },
  { icon: Repeat, name: "Lapsed-guest winback", body: "Sends a personalised offer after 21 days without a visit.", on: true },
  { icon: PackageSearch, name: "Slow-mover clearance", body: "Flags stock trending under forecast before it expires or gets wasted.", on: true },
  { icon: AlertTriangle, name: "Price-drift correction", body: "Reprices a dish when its margin drifts below your target threshold.", on: false },
  { icon: UserMinus, name: "Understaffed shift alert", body: "Flags any shift forecast to run below the demand curve, with a swap suggestion.", on: true },
  { icon: Timer, name: "Late-ticket escalation", body: "Pings the pass the moment a ticket ages past your warning threshold.", on: true },
];

const auditLog = [
  { time: "09:42:12", module: "Loyalty", action: "VIP guest re-detected, comp assigned", status: "executed" },
  { time: "09:38:55", module: "Inventory", action: "Purchase qty increased 14kg: Supplier A", status: "approved" },
  { time: "09:31:08", module: "Analytics", action: "Wagyu sirloin usage anomaly flagged", status: "suggested" },
  { time: "09:24:41", module: "Analytics", action: "Set Menu B repriced +$2 to restore margin", status: "executed" },
  { time: "09:18:02", module: "Staff", action: "Shift swap drafted for Saturday brunch", status: "suggested" },
];

const auditStatusColor = { executed: "#22c55e", approved: "#8b5cf6", suggested: "#f58c14" };

export default function AiAgent() {
  return (
    <PageShell testId="ai-agent-page">
      <SEO
        title="AI Agent: NUA"
        description="Meet NUA, the decision loop every module reports into. See exactly how it decides what to suggest, approve or execute."
        canonical="https://nuapos.com.au/ai-agent"
        includeSoftware
      />
      <PageHero
        eyebrow="AI Agent"
        title="Meet NUA. The engine behind every module."
        subtitle="NUA isn't a chatbot bolted onto the side. It's the decision loop that every module reports into. Here's exactly how it decides what to suggest, approve, or execute."
        accent="#8b5cf6"
        crumb="AI Agent"
      />

      <section className="relative max-w-6xl mx-auto px-6 lg:px-10 pb-20">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">The decision loop.</h2>
            <p className="mt-3 text-[#a1a1aa] leading-relaxed">
              Every signal (a closed table, a stock dip, a roster gap) passes through the same evaluation loop. NUA scores its own confidence and decides how much autonomy to take.
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

          {/* Graphical decision flow: replaces raw code */}
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
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#a1a1aa]">Then, one of three outcomes</span>
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

      {/* Forecasting */}
      <section id="forecasting" data-testid="ai-agent-forecasting-section" className="relative py-20 lg:py-28 bg-[#f6f7fb] text-[#0f0f14]">
        <div className="relative max-w-6xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-widest text-[#6d28d9]">Forecasting</span>
              <h2 className="font-display mt-3 text-3xl sm:text-4xl font-bold tracking-tight leading-[1.05]">
                Demand forecasting,
                <br />
                <span className="text-[#666670]">not guesswork.</span>
              </h2>
              <p className="mt-4 text-[#444450] leading-relaxed max-w-md">
                NUA cross-references historical sales, bookings and day-of-week patterns to predict covers, stock
                needs and staffing demand up to 30 days out, with an honest confidence band, not false precision.
              </p>
              <ul className="mt-6 space-y-2.5">
                {[
                  "Predicts covers per hour, per day, per section",
                  "Feeds automatic reorder points in Inventory",
                  "Feeds AI rostering in Staff Management",
                  "Shows its confidence, never overstates certainty",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-[#1a1a22]">
                    <CheckCircle2 className="w-4 h-4 text-[#8b5cf6] flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl bg-white border border-black/5 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.08)] p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="font-display font-semibold text-sm">Covers forecast · next 14 days</div>
                  <div className="font-mono text-[11px] text-[#666670]">Actual vs predicted, with confidence band</div>
                </div>
                <TrendingUp className="w-4 h-4 text-[#8b5cf6]" />
              </div>
              <svg viewBox="0 0 400 140" className="w-full h-40">
                <path
                  d="M200,50 C230,38 260,42 290,25 C320,15 350,18 400,5 L400,35 C350,50 320,45 290,55 C260,65 230,62 200,70 Z"
                  fill="#8b5cf6" opacity="0.12"
                />
                <path d="M0,100 C30,90 60,95 90,80 C120,70 150,75 200,60" stroke="#0f0f14" strokeWidth="2" fill="none" />
                <motion.path
                  d="M200,60 C230,50 260,55 290,40 C320,30 350,35 400,20"
                  stroke="#8b5cf6" strokeWidth="2" strokeDasharray="5 4" fill="none"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.1, ease: "easeInOut" }}
                />
                <circle cx="200" cy="60" r="3.5" fill="#0f0f14" />
                <line x1="200" y1="0" x2="200" y2="140" stroke="#00000015" strokeDasharray="2 4" />
              </svg>
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-[#666670]">
                <span>← actual</span>
                <span className="text-[#6d28d9]">predicted →</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Automation library */}
      <section id="automation-library" data-testid="ai-agent-automation-library-section" className="relative py-20 lg:py-28 bg-nua-bg">
        <div className="absolute inset-0 bg-grid-dark opacity-20 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
        <div className="relative max-w-6xl mx-auto px-6 lg:px-10">
          <div className="max-w-2xl">
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#f58c14]">Automation library</span>
            <h2 className="font-display mt-3 text-3xl sm:text-4xl font-bold text-white tracking-tight leading-[1.05]">
              A library of automations, ready on day one.
            </h2>
            <p className="mt-4 text-[#a1a1aa] leading-relaxed">
              Most AI tools make you build your own workflows from scratch. NUA ships with dozens of pre-built
              automations covering the scenarios every venue hits. Turn them on, tune the thresholds, done.
            </p>
          </div>

          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {automations.map((a, i) => (
              <motion.div
                key={a.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="rounded-2xl bg-[#15151d] border border-white/5 p-5"
              >
                <div className="flex items-start justify-between">
                  <div className="w-9 h-9 rounded-lg bg-[#f58c14]/15 flex items-center justify-center">
                    <a.icon className="w-4 h-4 text-[#f58c14]" />
                  </div>
                  <Switch defaultChecked={a.on} aria-label={`${a.name} toggle`} />
                </div>
                <h3 className="mt-4 font-display font-semibold text-white text-sm">{a.name}</h3>
                <p className="mt-1.5 text-[13px] text-[#a1a1aa] leading-relaxed">{a.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Audit trail */}
      <section id="audit-trail" data-testid="ai-agent-audit-trail-section" className="relative py-20 lg:py-28 bg-[#f6f7fb] text-[#0f0f14]">
        <div className="relative max-w-6xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-5">
              <span className="font-mono text-[11px] uppercase tracking-widest text-[#6d28d9]">Audit trail</span>
              <h2 className="font-display mt-3 text-3xl sm:text-4xl font-bold tracking-tight leading-[1.05]">
                Every decision, fully logged.
              </h2>
              <p className="mt-4 text-[#444450] leading-relaxed max-w-md">
                Nothing NUA does is a black box. Every suggestion, approval and auto-executed action is captured in
                an immutable log, who approved it, when, and why NUA scored it the way it did.
              </p>
              <ul className="mt-6 space-y-2.5">
                {[
                  "Exportable for compliance & franchise reporting",
                  "Filter by module, staff member or confidence level",
                  "Immutable: entries can't be edited after the fact",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-[#1a1a22]">
                    <ShieldCheck className="w-4 h-4 text-[#8b5cf6] flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7 rounded-2xl bg-white border border-black/5 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.08)] overflow-hidden"
            >
              <div className="flex items-center justify-between px-5 py-3 border-b border-black/5 bg-[#fafafb]">
                <span className="font-display text-sm font-semibold">Audit log · today</span>
                <button type="button" data-testid="audit-export-btn" className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-[#666670] hover:text-[#0f0f14] transition-colors">
                  <Download className="w-3 h-3" /> Export CSV
                </button>
              </div>
              <ul className="divide-y divide-black/5">
                {auditLog.map((l, i) => (
                  <motion.li
                    key={l.time}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: i * 0.06 }}
                    className="px-5 py-3.5 flex items-center gap-3"
                  >
                    <span className="font-mono text-[10px] text-[#666670] w-16 flex-shrink-0">{l.time}</span>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#8b5cf6] w-20 flex-shrink-0">{l.module}</span>
                    <span className="text-sm text-[#0f0f14] flex-1 min-w-0 truncate">{l.action}</span>
                    <span
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-mono text-[9px] uppercase flex-shrink-0"
                      style={{ background: `${auditStatusColor[l.status]}18`, color: auditStatusColor[l.status] }}
                    >
                      <span className="w-1 h-1 rounded-full" style={{ background: auditStatusColor[l.status] }} />
                      {l.status}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      <MeetNua />
      <Voice />
    </PageShell>
  );
}
