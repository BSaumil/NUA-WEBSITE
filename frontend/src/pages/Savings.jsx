import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Info, Minus, Plus, RotateCcw } from "lucide-react";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import SEO from "@/components/SEO";
import LiveNumber from "@/components/graphics/LiveNumber";
import { useModals } from "@/components/ModalProvider";
import { LEAD_CAPTURE_ENABLED } from "@/config/siteConfig";
import {
  costRows, bonusItems, COMPETITOR_TOTAL, NUA_PLAN_COST, NUA_OPTIONAL_TERMINAL,
  NUA_TOTAL,
} from "@/data/savingsData";

export default function Savings() {
  const { openLead } = useModals();
  const [venues, setVenues] = useState(1);
  const [stackSpend, setStackSpend] = useState(COMPETITOR_TOTAL);

  const competitorTotal = stackSpend * venues;
  const nuaTotal = NUA_TOTAL * venues;
  const monthlySaving = Math.max(0, competitorTotal - nuaTotal);
  const annualSaving = monthlySaving * 12;
  const nuaBarPct = Math.max(4, Math.round((nuaTotal / Math.max(competitorTotal, 1)) * 100));

  const resetCalculator = () => {
    setVenues(1);
    setStackSpend(COMPETITOR_TOTAL);
  };
  const isCustomized = venues !== 1 || stackSpend !== COMPETITOR_TOTAL;

  return (
    <PageShell testId="savings-page">
      <SEO
        title="Savings Calculator: NUA"
        description="Most venues pay for eight or nine separate systems. See the real monthly bill, itemised, next to a single NUA subscription."
        path="/savings"
      />
      <PageHero
        eyebrow="Total cost of ownership"
        title="What a 'stitched-together' POS stack really costs you."
        subtitle="Most venues aren't paying for one system. They're paying for eight or nine, quietly, across separate invoices. Here's the real monthly bill, itemised, next to a single NUA subscription."
        accent="#A45D0D"
        crumb="Savings"
      />

      <div className="relative max-w-5xl mx-auto px-6 lg:px-10 pb-24 lg:pb-32">
        {/* Disclaimer */}
        <div className="flex items-start gap-3 rounded-2xl bg-nua-bgAlt border border-nua-border p-4" data-testid="savings-disclaimer">
          <Info className="w-4 h-4 text-nua-ink2 mt-0.5 flex-shrink-0" />
          <p className="text-[13px] text-nua-ink2 leading-relaxed">
            Figures below are indicative monthly averages for a single, mid-size Australian venue, compiled from
            publicly listed pricing as at July 2026. Actual costs vary by provider, plan, region, transaction volume
            and negotiated rate{LEAD_CAPTURE_ENABLED ? (
              <>, treat this as a guide, then <button type="button" onClick={() => openLead({ type: "demo" })} className="text-nua-burgundy hover:underline">book a demo</button> for a number based on your actual stack.</>
            ) : (
              ", so treat this as a guide."
            )}
          </p>
        </div>

        {/* Interactive calculator controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-10 rounded-2xl bg-nua-surface border border-nua-border p-6"
          data-testid="savings-calculator"
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-widest text-nua-ink2">Your numbers</span>
            {isCustomized && (
              <button
                type="button"
                onClick={resetCalculator}
                data-testid="savings-calculator-reset"
                className="inline-flex items-center gap-1.5 text-[11px] font-mono text-nua-ink2 hover:text-nua-ink transition-colors"
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            )}
          </div>
          <div className="mt-4 grid sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="venues-input" className="text-[13px] text-nua-ink2">Number of venues</label>
              <div className="mt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setVenues((v) => Math.max(1, v - 1))}
                  data-testid="savings-venues-minus"
                  className="w-9 h-9 rounded-lg border border-nua-border flex items-center justify-center text-nua-ink hover:bg-nua-bgAlt transition-colors flex-shrink-0"
                  aria-label="Decrease venues"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <input
                  id="venues-input"
                  data-testid="savings-venues-input"
                  type="number"
                  min={1}
                  max={200}
                  value={venues}
                  onChange={(e) => setVenues(Math.min(200, Math.max(1, Number(e.target.value) || 1)))}
                  className="w-20 text-center bg-nua-surface border border-nua-border rounded-lg py-2 font-display text-lg font-bold text-nua-ink [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <button
                  type="button"
                  onClick={() => setVenues((v) => Math.min(200, v + 1))}
                  data-testid="savings-venues-plus"
                  className="w-9 h-9 rounded-lg border border-nua-border flex items-center justify-center text-nua-ink hover:bg-nua-bgAlt transition-colors flex-shrink-0"
                  aria-label="Increase venues"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div>
              <label htmlFor="stack-spend-input" className="text-[13px] text-nua-ink2">Current monthly spend, per venue</label>
              <div className="mt-2 relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-nua-ink2 font-display font-bold">$</span>
                <input
                  id="stack-spend-input"
                  data-testid="savings-stack-spend-input"
                  type="number"
                  min={0}
                  step={10}
                  value={stackSpend}
                  onChange={(e) => setStackSpend(Math.max(0, Number(e.target.value) || 0))}
                  className="w-full pl-7 pr-3 bg-nua-surface border border-nua-border rounded-lg py-2 font-display text-lg font-bold text-nua-ink [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
              <div className="mt-1.5 font-mono text-[11px] text-nua-ink2">Defaults to our {costRows.length}-tool estimate below: edit to use your own invoices.</div>
            </div>
          </div>
        </motion.div>

        {/* Headline comparison */}
        <div className="mt-5 grid lg:grid-cols-2 gap-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl bg-nua-surface border border-nua-border p-6"
            data-testid="savings-competitor-total"
          >
            <span className="font-mono text-[10px] uppercase tracking-widest text-nua-ink2">Your current stack{venues > 1 ? `, ${venues} venues` : ""}</span>
            <div className="mt-2 font-display text-4xl sm:text-5xl font-bold text-nua-ink">
              <LiveNumber value={competitorTotal} prefix="$" suffix="/mo" />
            </div>
            <div className="mt-1 font-mono text-[11px] text-nua-ink2">
              {venues > 1 ? `$${stackSpend}/mo × ${venues} venues` : `across ${costRows.length} separate tools & invoices`}
            </div>
            <div className="mt-4 h-2.5 rounded-full bg-nua-bgAlt overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-nua-burgundy to-nua-burgundyBright" style={{ width: "100%" }} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="rounded-2xl bg-nua-bg border-2 border-nua-burgundy/35 p-6"
            data-testid="savings-nua-total"
          >
            <span className="font-mono text-[10px] uppercase tracking-widest text-nua-ink2">NUA Growth plan{venues > 1 ? `, ${venues} venues` : ""}</span>
            <div className="mt-2 font-display text-4xl sm:text-5xl font-bold text-nua-ink">
              <LiveNumber value={nuaTotal} prefix="$" suffix="/mo" />
            </div>
            <div className="mt-1 font-mono text-[11px] text-nua-ink2">
              ${NUA_PLAN_COST}/mo platform + ${NUA_OPTIONAL_TERMINAL}/mo optional terminal, per venue
            </div>
            <div className="mt-4 h-2.5 rounded-full bg-nua-bgAlt overflow-hidden">
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
          className="mt-5 rounded-2xl bg-nua-bgAlt border border-emerald-500/30 p-6 sm:p-8 text-center"
          data-testid="savings-banner"
        >
          <span className="font-mono text-[11px] uppercase tracking-widest text-nua-burgundy">You save</span>
          <div className="mt-2 font-display text-4xl sm:text-6xl font-bold text-nua-ink">
            <LiveNumber value={monthlySaving} prefix="$" suffix="/mo" />
          </div>
          <div className="mt-2 font-mono text-sm text-nua-burgundy">
            <LiveNumber value={annualSaving} prefix="$" suffix="/year" duration={1.8} />
          </div>
          <p className="mt-3 text-sm text-nua-ink2 max-w-lg mx-auto">
            {venues > 1
              ? `Across all ${venues} venues, on your numbers above.`
              : "Per venue. Running five venues on the old stack? That's roughly"}
            {venues === 1 && <> <LiveNumber value={monthlySaving * 5} prefix="$" suffix="/mo" duration={1.2} /> back, every month.</>}
          </p>
        </motion.div>

        {/* Itemised breakdown */}
        <div className="mt-16">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-nua-ink tracking-tight">The itemised breakdown.</h2>
          <p className="mt-2 text-nua-ink2">Every line item most venues pay for separately, and what replaces it in NUA.</p>

          <div className="mt-6 rounded-2xl border border-nua-border bg-nua-surface overflow-hidden">
            {costRows.map((r, i) => (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
                data-testid={`savings-row-${r.id}`}
                className="grid grid-cols-[auto_1fr_auto] sm:grid-cols-[auto_1fr_auto_auto] items-center gap-3 sm:gap-4 px-5 py-4 border-b border-nua-border last:border-b-0 hover:bg-nua-bgAlt transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-nua-burgundyWash flex items-center justify-center flex-shrink-0">
                  <r.icon className="w-4 h-4 text-nua-burgundy" />
                </div>
                <div className="min-w-0">
                  <div className="font-display text-sm font-semibold text-nua-ink">{r.category}</div>
                  <div className="text-[12px] text-nua-ink2 mt-0.5">{r.tool}</div>
                </div>
                <span className="font-mono text-sm text-nua-ink2 whitespace-nowrap">${r.cost}/mo</span>
                <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-nua-burgundy font-mono text-[10px] uppercase whitespace-nowrap">
                  <CheckCircle2 className="w-3 h-3" /> In every plan
                </span>
              </motion.div>
            ))}
            <div className="grid grid-cols-[auto_1fr_auto] sm:grid-cols-[auto_1fr_auto_auto] items-center gap-3 sm:gap-4 px-5 py-4 bg-nua-bgAlt">
              <div className="w-9 h-9" />
              <span className="font-display text-sm font-bold text-nua-ink">Total, across separate tools</span>
              <span className="font-mono text-sm font-bold text-nua-ink whitespace-nowrap">${COMPETITOR_TOTAL}/mo</span>
              <span className="hidden sm:block" />
            </div>
          </div>
        </div>

        {/* Bonus bundled items */}
        <div className="mt-16">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-nua-ink tracking-tight">And here's what else is bundled in.</h2>
          <p className="mt-2 text-nua-ink2">Features many stacks charge extra for, or don't offer at all, that ship standard with NUA.</p>

          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {bonusItems.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="rounded-2xl bg-nua-surface border border-nua-border p-5"
              >
                <div className="w-9 h-9 rounded-lg bg-nua-burgundyWash flex items-center justify-center">
                  <b.icon className="w-4 h-4 text-nua-burgundy" />
                </div>
                <h3 className="mt-4 font-display font-semibold text-nua-ink text-sm">{b.title}</h3>
                <p className="mt-1.5 text-[13px] text-nua-ink2 leading-relaxed">{b.body}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        {LEAD_CAPTURE_ENABLED && (
          <div className="mt-16 rounded-2xl bg-nua-burgundyWash border border-nua-burgundy/30 p-8 sm:p-10 text-center">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-nua-ink tracking-tight">
              Want your actual number, not an estimate?
            </h2>
            <p className="mt-3 text-nua-ink2 max-w-lg mx-auto">
              Bring us your current invoices: POS, EFTPOS, rostering, booking, delivery, whatever you're juggling, and
              we'll build a savings breakdown specific to your venue.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => openLead({ type: "demo" })}
                data-testid="savings-book-demo-btn"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-nua-burgundy hover:bg-nua-burgundyDark text-white font-medium text-sm shadow-xl shadow-nua-burgundy/25 transition-all duration-200 hover:-translate-y-0.5"
              >
                Get my savings breakdown
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => openLead({ type: "trial" })}
                data-testid="savings-start-trial-btn"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-nua-bgAlt hover:bg-nua-bgAlt border border-nua-border text-nua-ink font-medium text-sm transition-all duration-200"
              >
                Start Free Trial
              </button>
            </div>
          </div>
        )}
      </div>
    </PageShell>
  );
}
