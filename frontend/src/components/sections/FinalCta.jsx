import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useModals } from "@/components/ModalProvider";

export default function FinalCta() {
  const { openLead } = useModals();
  return (
    <section id="final-cta" data-testid="final-cta-section" className="relative py-28 lg:py-40 bg-nua-bg overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-[#8b5cf6]/25 blur-[160px]" />
      </div>
      <div className="absolute inset-0 flex items-center justify-end pointer-events-none">
        <div className="w-[500px] h-[500px] rounded-full bg-[#f58c14]/20 blur-[160px]" />
      </div>
      <div className="absolute inset-0 bg-grid-dark opacity-20 [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_60%)]" />
      <div className="absolute inset-0 bg-noise opacity-[0.04] mix-blend-overlay pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-6 lg:px-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-sm">
          <Sparkles className="w-3 h-3 text-[#f58c14]" />
          <span className="font-mono text-[11px] uppercase tracking-widest text-[#a1a1aa]">The next chapter of hospitality</span>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-display mt-6 text-5xl sm:text-6xl lg:text-7xl xl:text-[88px] font-bold text-white leading-[0.95] tracking-tight"
        >
          Stop running systems.
          <br />
          <span className="text-shimmer">Start running intelligence.</span>
        </motion.h2>

        <p className="mt-7 text-lg text-[#a1a1aa] max-w-xl mx-auto">
          NUA is the AI operating system for hospitality. One platform. One brain. One source of truth.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => openLead({ type: "demo" })}
            data-testid="final-book-demo-btn"
            className="group inline-flex items-center gap-2 px-7 py-4 rounded-full bg-[#f58c14] hover:bg-[#d87b10] text-white font-medium text-base shadow-2xl shadow-[#f58c14]/30 transition-all duration-200 hover:-translate-y-0.5"
          >
            Book a Demo
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
          <button
            type="button"
            onClick={() => openLead({ type: "trial" })}
            data-testid="final-start-trial-btn"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-full border border-[#8b5cf6]/50 text-[#c4b5fd] hover:bg-[#8b5cf6]/10 hover:text-white font-medium text-base transition-all duration-200"
          >
            Start Free Trial
          </button>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 font-mono text-[10px] uppercase tracking-widest text-[#a1a1aa]">
          <span>✓ 14-day free trial</span>
          <span>✓ No credit card required</span>
          <span>✓ Migration assistance included</span>
          <span>✓ 24/7 support</span>
        </div>
      </div>
    </section>
  );
}
