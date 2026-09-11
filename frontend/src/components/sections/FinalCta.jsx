import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import LeadCta from "@/components/LeadCta";
import { LEAD_CAPTURE_ENABLED, TRIAL_DAYS } from "@/config/siteConfig";

export default function FinalCta() {
  return (
    <section id="final-cta" data-testid="final-cta-section" className="relative py-28 lg:py-40 bg-nua-bg overflow-hidden">
      {/* A single warm lift off the page rather than two saturated orbs. At 25%
          and 20% over ivory those read as a lilac and a peach cloud, which is
          what they were never meant to be: they existed to glow against black. */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[720px] h-[720px] max-w-full rounded-full bg-nua-burgundy/[0.05] blur-[160px]" />
      </div>
      <div className="absolute inset-0 bg-grid-dark opacity-20 [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_60%)]" />

      <div className="relative max-w-5xl mx-auto px-6 lg:px-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-nua-border bg-nua-surface">
          <Sparkles className="w-3 h-3 text-nua-burgundy" />
          <span className="font-mono text-[11px] uppercase tracking-widest text-nua-ink2">The next chapter of hospitality</span>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-display mt-6 text-5xl sm:text-6xl lg:text-7xl xl:text-[88px] font-bold text-nua-ink leading-[0.95] tracking-tight"
        >
          Stop running systems.
          <br />
          <span className="text-shimmer">Start running intelligence.</span>
        </motion.h2>

        <p className="mt-7 text-lg text-nua-ink2 max-w-xl mx-auto">
          NUA is the AI operating system for hospitality. One platform. One brain. One source of truth.
        </p>

        {LEAD_CAPTURE_ENABLED && (
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <LeadCta
              type="demo"
              label="Book a Demo"
              icon={ArrowRight}
              iconClassName="w-4 h-4 transition-transform group-hover:translate-x-1"
              testId="final-book-demo-btn"
              className="group inline-flex items-center gap-2 px-7 py-4 rounded-full bg-nua-burgundy hover:bg-nua-burgundyDark text-white font-medium text-base shadow-2xl shadow-nua-burgundy/30 transition-all duration-200 hover:-translate-y-0.5"
            />
            <LeadCta
              type="trial"
              label="Start Free Trial"
              testId="final-start-trial-btn"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full border border-nua-burgundy/45 text-nua-burgundy hover:bg-nua-burgundyWash hover:border-nua-burgundy font-medium text-base transition-all duration-200"
            />
          </div>
        )}

        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 font-mono text-[10px] uppercase tracking-widest text-nua-ink2">
          <span>✓ {TRIAL_DAYS}-day free trial</span>
          <span>✓ No credit card required</span>
          <span>✓ Migration assistance included</span>
          <span>✓ 24/7 support</span>
        </div>
      </div>
    </section>
  );
}
