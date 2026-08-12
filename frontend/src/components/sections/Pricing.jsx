import React from "react";
import { motion } from "framer-motion";
import { Check, Sparkles, ArrowRight, Infinity as InfinityIcon, Zap } from "lucide-react";
import { useModals } from "@/components/ModalProvider";
import { LEAD_CAPTURE_ENABLED, TRIAL_DAYS } from "@/config/siteConfig";

const plans = [
  {
    name: "Starter",
    price: "$59",
    period: "per venue / mo",
    desc: "For single-venue operators ready to switch on intelligence.",
    accent: "#a1a1aa",
    cta: "Start free trial",
    features: [
      "POS + Reservations + KDS",
      "AI Agent: NUA (basic)",
      "Voice POS included",
      "Loyalty engine included",
      "1 location, up to 5 users",
      "Email & chat support",
    ],
    featured: false,
  },
  {
    name: "Growth",
    price: "$99",
    period: "per venue / mo",
    desc: "Multi-venue brands scaling with autonomous ops.",
    accent: "#8b5cf6",
    cta: "Book a demo",
    features: [
      "Everything in Starter",
      "NUA AI: full autonomous mode",
      "Marketing automation",
      "Smart Pantry + supplier compare",
      "Up to 10 locations",
      "Priority support + onboarding",
    ],
    featured: true,
  },
  {
    name: "Enterprise",
    price: "$149",
    period: "per venue / mo",
    desc: "Hospitality groups, franchises and chains.",
    accent: "#f58c14",
    cta: "Talk to sales",
    features: [
      "Everything in Growth",
      "Multi-location orchestration",
      "Franchise dashboards & RBAC",
      "Custom integrations & API",
      "Unlimited locations & users",
      "Dedicated CSM + 24/7 support",
    ],
    featured: false,
  },
];

export default function Pricing() {
  const { openLead } = useModals();
  return (
    <section id="pricing" data-testid="pricing-section" className="relative py-24 lg:py-32 bg-[#f6f7fb] text-[#0f0f14]">
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="font-mono text-[11px] uppercase tracking-widest text-[#f58c14]">Pricing</span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display mt-3 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.02]"
          >
            Pricing as transparent as your kitchen.
          </motion.h2>
          <p className="mt-5 text-[#444450]">
            AI Agent, Voice POS and the Loyalty engine are included in <span className="font-semibold text-[#0f0f14]">every</span> plan.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {plans.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              data-testid={`pricing-${p.name.toLowerCase()}-card`}
              className={`relative rounded-2xl p-7 flex flex-col ${
                p.featured
                  ? "bg-[#0b0b0f] text-white border-2 border-[#8b5cf6] shadow-[0_30px_60px_-15px_rgba(139,92,246,0.4)] lg:-translate-y-3"
                  : "bg-white border border-black/5 shadow-sm"
              }`}
            >
              {p.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] text-white font-mono text-[10px] uppercase tracking-widest flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Most popular
                </div>
              )}

              <div>
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-2xl font-bold">{p.name}</h3>
                  <span className={`w-2 h-2 rounded-full`} style={{ background: p.accent }} />
                </div>
                <p className={`mt-2 text-sm ${p.featured ? "text-[#a1a1aa]" : "text-[#444450]"}`}>{p.desc}</p>

                <div className="mt-6">
                  <span className="font-display text-5xl font-bold">{p.price}</span>
                  <span className={`ml-2 font-mono text-xs ${p.featured ? "text-[#a1a1aa]" : "text-[#666670]"}`}>{p.period}</span>
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
                    <span className={p.featured ? "text-[#eaeaea]" : "text-[#1a1a22]"}>{f}</span>
                  </li>
                ))}
              </ul>

              {LEAD_CAPTURE_ENABLED && (
                <button
                  type="button"
                  onClick={() => openLead({ type: p.name === "Starter" ? "trial" : "demo", plan: p.name })}
                  data-testid={`pricing-${p.name.toLowerCase()}-cta`}
                  className={`mt-7 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-medium transition-all ${
                    p.featured
                      ? "bg-[#f58c14] text-white hover:bg-[#d87b10] shadow-lg shadow-[#f58c14]/30"
                      : p.name === "Enterprise"
                      ? "bg-[#0b0b0f] text-white hover:bg-[#1c1c26]"
                      : "border border-black/10 hover:bg-[#f6f7fb]"
                  }`}
                >
                  {p.cta}
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </motion.div>
          ))}
        </div>

        <p className="mt-10 text-center font-mono text-[11px] uppercase tracking-widest text-[#666670]">
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
          <div className="absolute -inset-px rounded-3xl bg-gradient-to-r from-[#f58c14] via-[#ec4899] to-[#8b5cf6] opacity-80 blur-xl" />
          <div className="relative rounded-3xl bg-gradient-to-br from-[#0b0b0f] via-[#15151d] to-[#0b0b0f] border border-white/10 overflow-hidden">
            {/* ambient glows */}
            <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[#f58c14]/30 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-[#8b5cf6]/30 blur-3xl pointer-events-none" />
            <div className="absolute inset-0 bg-grid-dark opacity-10 pointer-events-none" />

            <div className="relative grid lg:grid-cols-[1.3fr_1fr] gap-8 p-8 sm:p-10">
              {/* Left */}
              <div className="text-white">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#f58c14]/40 bg-[#f58c14]/10">
                  <Zap className="w-3 h-3 text-[#f58c14]" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#fbbf24]">
                    Founding members · limited
                  </span>
                </div>

                <h3 className="font-display mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.02]">
                  Pay once.
                  <br />
                  <span className="text-shimmer">Use NUA forever.</span>
                </h3>

                <p className="mt-4 text-[#a1a1aa] max-w-md leading-relaxed">
                  One-time payment, lifetime access. Lock in the full NUA platform (AI Agent,
                  Voice POS, Loyalty, every future update) with no monthly fee, ever.
                </p>

                <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm">
                  {[
                    "All Enterprise features",
                    "Unlimited locations",
                    "Lifetime free updates",
                    "Priority onboarding",
                    "Founding-member badge",
                    "Direct line to product team",
                  ].map((f) => (
                    <li key={f} className="flex items-center gap-2 text-[#eaeaea]">
                      <div className="w-4 h-4 rounded-full bg-[#f58c14]/20 flex items-center justify-center flex-shrink-0">
                        <Check className="w-2.5 h-2.5 text-[#f58c14]" />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right: price card */}
              <div className="flex flex-col justify-center">
                <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 backdrop-blur">
                  <div className="flex items-center gap-2 mb-3">
                    <InfinityIcon className="w-4 h-4 text-[#ec4899]" />
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#fbcfe8]">
                      Lifetime · one-time
                    </span>
                  </div>

                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-6xl font-bold text-white tracking-tight">
                      $2,499
                    </span>
                  </div>
                  <div className="mt-1 font-mono text-[11px] text-[#a1a1aa] uppercase tracking-wider">
                    + GST · paid once
                  </div>

                  <div className="mt-4 p-3 rounded-lg bg-[#8b5cf6]/10 border border-[#8b5cf6]/20">
                    <div className="text-[11px] text-[#c4b5fd] leading-relaxed">
                      Equivalent to <span className="font-mono">~21 months</span> of Enterprise.
                      Break-even in under 2 years: free forever after.
                    </div>
                  </div>

                  {LEAD_CAPTURE_ENABLED && (
                    <button
                      type="button"
                      onClick={() => openLead({ type: "demo", plan: "Lifetime ($2,499 + GST)" })}
                      data-testid="pricing-lifetime-cta"
                      className="mt-5 w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-[#f58c14] hover:bg-[#d87b10] text-white text-sm font-semibold shadow-lg shadow-[#f58c14]/30 transition-all hover:-translate-y-0.5"
                    >
                      Claim lifetime access
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}

                  <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-widest text-[#666670]">
                    30-day money-back guarantee
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
