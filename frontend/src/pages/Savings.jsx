import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Info } from "lucide-react";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import LiveNumber from "@/components/graphics/LiveNumber";
import { useModals } from "@/components/ModalProvider";
import {
  costRows, bonusItems, COMPETITOR_TOTAL, NUA_PLAN_COST, NUA_OPTIONAL_TERMINAL,
  NUA_TOTAL, MONTHLY_SAVING, ANNUAL_SAVING,
} from "@/data/savingsData";

export default function Savings() {
  const { openLead } = useModals();
  const nuaBarPct = Math.max(4, Math.round((NUA_TOTAL / COMPETITOR_TOTAL) * 100));

  return (
    <PageShell testId="savings-page">
      <PageHero
        eyebrow="— Total cost of ownership"
        title="What a 'stitched-together' POS stack really costs you."
        subtitle="Most venues aren't paying for one system — they're paying for eight or nine, quietly, across separate invoices. Here's the real monthly bill, itemised, next to a single NUA subscription."
        accent="#f58c14"
        crumb="Savings"
      />

      <div className="relative max-w-5xl mx-auto px-6 lg:px-10 pb-24 lg:pb-32">
        {/* Disclaimer */}
        <div className="flex items-start gap-3 rounded-2xl bg-white/[0.03] border border-white/5 p-4" data-testid="savings-disclaimer">
          <Info className="w-4 h-4 text-[#a1a1aa] mt-0.5 flex-shrink-0" />
          <p className="text-[13px] text-[#a1a1aa] leading-relaxed">
            Figures below are indicative monthly averages for a single, mid-size Australian venue, compiled from
            publicly listed pricing as at July 2026. Actual costs vary by provider, plan, region, transaction volume
            and negotiated rate — treat this as a guide, then <button type="button" onClick={() => openLead({ type: "demo" })} className="text-[#f58c14] hover:underline">book a demo</button> for a number based on your actual stack.
          </p>
        </div>

        {/* Headline comparison */}
        <div className="mt-10 grid lg:grid-cols-2 gap-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl bg-[#15151d] border border-white/5 p-6"
            data-testid="savings-competitor-total"
          >
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#a1a1aa]">Your current stack (est.)</span>
            <div className="mt-2 font-display text-4xl sm:text-5xl font-bold text-white">
              <LiveNumber value={COMPETITOR_TOTAL} prefix="$" suffix="/mo" />
            </div>
            <div className="mt-1 font-mono text-[11px] text-[#a1a1aa]">across {costRows.length} separate tools & invoices</div>
            <div className="mt-4 h-2.5 rounded-full bg-white/5 overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-[#f58c14] to-[#ec4899]" style={{ width: "100%" }} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="rounded-2xl bg-[#0b0b0f] border-2 border-[#22c55e]/30 p-6"
            data-testid="savings-nua-total"
          >
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#a1a1aa]">NUA Growth plan</span>
            <div className="mt-2 font-display text-4xl sm:text-5xl font-bold text-white">
              <LiveNumber value={NUA_TOTAL} prefix="$" suffix="/mo" />
            </div>
            <div className="mt-1 font-mono text-[11px] text-[#a1a1aa]">
              ${NUA_PLAN_COST}/mo platform + ${NUA_OPTIONAL_TERMINAL}/mo optional terminal
            </div>
            <div className="mt-4 h-2.5 rounded-full bg-white/5 overflow-hidden">
              <div className="h-full rounded-full bg-emerald-500" style={{ width: `${nuaBarPct}%` }} />
            </div>
          </motion.div>
        </div>

        {/* Savings banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.16 }}
          className="mt-5 rounded-2xl bg-gradient-to-br from-emerald-500/15 to-[#15151d] border border-emerald-500/30 p-6 sm:p-8 text-center"
          data-testid="savings-banner"
        >
          <span className="font-mono text-[11px] uppercase tracking-widest text-emerald-400">You save</span>
          <div className="mt-2 font-display text-4xl sm:text-6xl font-bold text-white">
            <LiveNumber value={MONTHLY_SAVING} prefix="$" suffix="/mo" />
          </div>
          <div className="mt-2 font-mono text-sm text-emerald-400">
            <LiveNumber value={ANNUAL_SAVING} prefix="$" suffix="/year" duration={1.8} />
          </div>
          <p className="mt-3 text-sm text-[#a1a1aa] max-w-lg mx-auto">
            Per venue. Running five venues on the old stack? That's roughly{" "}
            <LiveNumber value={MONTHLY_SAVING * 5} prefix="$" suffix="/mo" duration={1.2} /> back, every month.
          </p>
        </motion.div>

        {/* Itemised breakdown */}
        <div className="mt-16">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">The itemised breakdown.</h2>
          <p className="mt-2 text-[#a1a1aa]">Every line item most venues pay for separately — and what replaces it in NUA.</p>

          <div className="mt-6 rounded-2xl border border-white/10 bg-[#15151d] overflow-hidden">
            {costRows.map((r, i) => (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
                data-testid={`savings-row-${r.id}`}
                className="grid grid-cols-[auto_1fr_auto] sm:grid-cols-[auto_1fr_auto_auto] items-center gap-3 sm:gap-4 px-5 py-4 border-b border-white/5 last:border-b-0 hover:bg-white/[0.02] transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-[#f58c14]/15 flex items-center justify-center flex-shrink-0">
                  <r.icon className="w-4 h-4 text-[#f58c14]" />
                </div>
                <div className="min-w-0">
                  <div className="font-display text-sm font-semibold text-white">{r.category}</div>
                  <div className="text-[12px] text-[#a1a1aa] mt-0.5">{r.tool}</div>
                </div>
                <span className="font-mono text-sm text-[#a1a1aa] whitespace-nowrap">${r.cost}/mo</span>
                <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-mono text-[10px] uppercase whitespace-nowrap">
                  <CheckCircle2 className="w-3 h-3" /> In every plan
                </span>
              </motion.div>
            ))}
            <div className="grid grid-cols-[auto_1fr_auto] sm:grid-cols-[auto_1fr_auto_auto] items-center gap-3 sm:gap-4 px-5 py-4 bg-white/[0.03]">
              <div className="w-9 h-9" />
              <span className="font-display text-sm font-bold text-white">Total, across separate tools</span>
              <span className="font-mono text-sm font-bold text-white whitespace-nowrap">${COMPETITOR_TOTAL}/mo</span>
              <span className="hidden sm:block" />
            </div>
          </div>
        </div>

        {/* Bonus bundled items */}
        <div className="mt-16">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">And here's what else is bundled in.</h2>
          <p className="mt-2 text-[#a1a1aa]">Features many stacks charge extra for — or don't offer at all — that ship standard with NUA.</p>

          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {bonusItems.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="rounded-2xl bg-[#15151d] border border-white/5 p-5"
              >
                <div className="w-9 h-9 rounded-lg bg-[#8b5cf6]/15 flex items-center justify-center">
                  <b.icon className="w-4 h-4 text-[#8b5cf6]" />
                </div>
                <h3 className="mt-4 font-display font-semibold text-white text-sm">{b.title}</h3>
                <p className="mt-1.5 text-[13px] text-[#a1a1aa] leading-relaxed">{b.body}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 rounded-2xl bg-gradient-to-br from-[#f58c14]/15 to-[#15151d] border border-[#f58c14]/30 p-8 sm:p-10 text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Want your actual number, not an estimate?
          </h2>
          <p className="mt-3 text-[#a1a1aa] max-w-lg mx-auto">
            Bring us your current invoices — POS, EFTPOS, rostering, booking, delivery, whatever you're juggling — and
            we'll build a savings breakdown specific to your venue.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => openLead({ type: "demo" })}
              data-testid="savings-book-demo-btn"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#f58c14] hover:bg-[#d87b10] text-white font-medium text-sm shadow-xl shadow-[#f58c14]/25 transition-all duration-200 hover:-translate-y-0.5"
            >
              Get my savings breakdown
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => openLead({ type: "trial" })}
              data-testid="savings-start-trial-btn"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium text-sm transition-all duration-200"
            >
              Start Free Trial
            </button>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
