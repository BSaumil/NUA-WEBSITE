import React from "react";
import { motion } from "framer-motion";
import { Check, Sparkles, ArrowRight, Infinity as InfinityIcon, Zap } from "lucide-react";
import LeadCta from "@/components/LeadCta";
import { TRIAL_DAYS } from "@/config/siteConfig";
import { plans, lifetime, getLifetimeEquivalence } from "@/data/plansData";

export default function Pricing() {
  // null when lifetime.includesPlanId no longer matches a plan — the block that
  // uses it is skipped rather than crashing this section, which also renders on
  // the homepage.
  const equivalence = getLifetimeEquivalence();

  return (
    <section id="pricing" data-testid="pricing-section" className="relative py-24 lg:py-32 bg-nua-bgAlt text-nua-ink">
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="font-mono text-[11px] uppercase tracking-widest text-[#8a4a00]">Pricing</span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display mt-3 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.02]"
          >
            Pricing as transparent as your kitchen.
          </motion.h2>
          <p className="mt-5 text-nua-ink2">
            AI Agent, Voice POS and the Loyalty engine are included in <span className="font-semibold text-nua-ink">every</span> plan.
            All prices in AUD.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {plans.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              data-testid={`pricing-${p.id}-card`}
              className={`relative rounded-2xl p-7 flex flex-col ${
                p.featured
                  ? "bg-nua-bg text-nua-ink border-2 border-[#8b5cf6] shadow-[0_30px_60px_-15px_rgba(139,92,246,0.4)] lg:-translate-y-3"
                  : "bg-white border border-nua-border shadow-sm"
              }`}
            >
              {p.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-nua-burgundy text-white font-mono text-[10px] uppercase tracking-widest flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Most popular
                </div>
              )}

              <div>
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-2xl font-bold">{p.name}</h3>
                  <span className={`w-2 h-2 rounded-full`} style={{ background: p.accent }} />
                </div>
                <p className={`mt-2 text-sm ${p.featured ? "text-nua-ink2" : "text-nua-ink2"}`}>{p.desc}</p>

                <div className="mt-6">
                  <span className={`font-mono text-xs mr-1 ${p.featured ? "text-nua-ink2" : "text-nua-muted"}`}>AUD</span>
                  <span className="font-display text-5xl font-bold">${p.priceMonthly}</span>
                  <span className={`font-display text-lg font-bold ${p.featured ? "text-nua-ink2" : "text-nua-muted"}`}>*</span>
                  <span className={`ml-2 font-mono text-xs ${p.featured ? "text-nua-ink2" : "text-nua-muted"}`}>+ GST · {p.period}</span>
                </div>
              </div>

              <ul className="mt-6 space-y-3 flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <div
                      className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: `${p.accent}25` }}
                    >
                      <Check className="w-2.5 h-2.5" style={{ color: p.accent }} />
                    </div>
                    <span className={p.featured ? "text-nua-ink" : "text-[#1a1a22]"}>{f}</span>
                  </li>
                ))}
              </ul>

              <LeadCta
                type={p.name === "Starter" ? "trial" : "demo"}
                plan={p.name}
                label={p.cta}
                icon={ArrowRight}
                testId={`pricing-${p.id}-cta`}
                className={`mt-7 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-medium transition-all ${
                  p.featured
                    ? "bg-nua-burgundy text-white hover:bg-nua-burgundyDark shadow-lg shadow-nua-burgundy/30"
                    : p.name === "Enterprise"
                    ? "bg-nua-bg text-nua-ink hover:bg-nua-surface"
                    : "border border-black/10 hover:bg-nua-bgAlt"
                }`}
              />
            </motion.div>
          ))}
        </div>

        <p className="mt-10 text-center font-mono text-[11px] uppercase tracking-widest text-nua-muted">
          All plans · {TRIAL_DAYS}-day free trial · no card required · cancel anytime
        </p>

        {/* Lifetime offer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          data-testid="pricing-lifetime-card"
          className="relative mt-14 max-w-5xl mx-auto"
        >
          <div className="absolute -inset-px rounded-3xl bg-nua-burgundy/10" />
          <div className="relative rounded-3xl bg-nua-surface border border-nua-border overflow-hidden">
            {/* ambient glows */}
            <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[#f58c14]/30 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-[#8b5cf6]/30 blur-3xl pointer-events-none" />
            <div className="absolute inset-0 bg-grid-dark opacity-10 pointer-events-none" />

            <div className="relative grid lg:grid-cols-[1.3fr_1fr] gap-8 p-8 sm:p-10">
              {/* Left */}
              <div className="text-nua-ink">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-nua-burgundy/40 bg-[#f58c14]/10">
                  <Zap className="w-3 h-3 text-nua-burgundy" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-nua-burgundy">
                    {lifetime.badge}
                  </span>
                </div>

                <h3 className="font-display mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.02]">
                  {lifetime.headlineTop}
                  <br />
                  <span className="text-shimmer">{lifetime.headlineAccent}</span>
                </h3>

                <p className="mt-4 text-nua-ink2 max-w-md leading-relaxed">
                  {lifetime.body}
                </p>

                <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm">
                  {lifetime.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-nua-ink">
                      <div className="w-4 h-4 rounded-full bg-[#f58c14]/20 flex items-center justify-center flex-shrink-0">
                        <Check className="w-2.5 h-2.5 text-nua-burgundy" />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right: price card */}
              <div className="flex flex-col justify-center">
                <div className="rounded-2xl bg-white/[0.04] border border-nua-border p-6 backdrop-blur">
                  <div className="flex items-center gap-2 mb-3">
                    <InfinityIcon className="w-4 h-4 text-nua-burgundy" />
                    <span className="font-mono text-[10px] uppercase tracking-widest text-nua-burgundy">
                      Lifetime · one-time
                    </span>
                  </div>

                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-sm text-nua-ink2">AUD</span>
                    <span className="font-display text-6xl font-bold text-nua-ink tracking-tight">
                      ${lifetime.priceOneTime.toLocaleString()}
                    </span>
                    <span className="font-display text-2xl font-bold text-nua-ink2">*</span>
                  </div>
                  <div className="mt-1 font-mono text-[11px] text-nua-ink2 uppercase tracking-wider">
                    + GST · paid once
                  </div>

                  {equivalence && (
                    <div className="mt-4 p-3 rounded-lg bg-[#8b5cf6]/10 border border-[#8b5cf6]/20">
                      <div className="text-[11px] text-nua-burgundy leading-relaxed">
                        Equivalent to <span className="font-mono">~{equivalence.months} months</span> of {equivalence.includedPlanName}.
                        Break-even in under {equivalence.breakEvenYears} years: free forever after.
                      </div>
                    </div>
                  )}

                  <LeadCta
                    type="demo"
                    plan={`Lifetime ($${lifetime.priceOneTime.toLocaleString()} + GST)`}
                    label="Claim lifetime access"
                    icon={ArrowRight}
                    testId="pricing-lifetime-cta"
                    className="mt-5 w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-nua-burgundy hover:bg-nua-burgundyDark text-white text-sm font-semibold shadow-lg shadow-nua-burgundy/30 transition-all hover:-translate-y-0.5"
                  />

                  <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-widest text-nua-muted">
                    {lifetime.guarantee}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <p className="mt-6 text-center text-[11px] text-nua-muted max-w-2xl mx-auto">
          *Pricing shown is indicative and may vary by region, add-ons or promotional offers. Confirm a formal quote for your venue before purchase.
        </p>
      </div>
    </section>
  );
}
