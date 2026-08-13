import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Check, Info } from "lucide-react";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import { useModals } from "@/components/ModalProvider";
import { LEAD_CAPTURE_ENABLED, TRIAL_DAYS } from "@/config/siteConfig";
import compareData from "@/data/compareData";

export default function CompareDetail() {
  const { slug } = useParams();
  const { openLead } = useModals();
  const data = compareData.find((c) => c.slug === slug);

  if (!data) return <Navigate to="/compare" replace />;

  return (
    <PageShell testId="compare-detail-page">
      <PageHero
        eyebrow={`Compare · ${data.category}`}
        title={`NUA vs ${data.name}`}
        subtitle={data.summary}
        accent={data.color}
        crumb={`NUA vs ${data.name}`}
      />

      <div className="relative max-w-4xl mx-auto px-6 lg:px-10 pb-24 lg:pb-32">
        <div className="flex items-start gap-3 rounded-2xl bg-white/[0.03] border border-white/5 p-4" data-testid="compare-detail-disclaimer">
          <Info className="w-4 h-4 text-[#a1a1aa] mt-0.5 flex-shrink-0" />
          <p className="text-[13px] text-[#a1a1aa] leading-relaxed">
            {data.name}'s column reflects general category positioning, not confirmed current pricing or policy. 
            Those change often. Confirm specifics directly with {data.name}; ask us anything about NUA's column on a call.
          </p>
        </div>

        <div className="mt-8 rounded-2xl border border-white/10 bg-[#15151d] overflow-hidden">
          <div className="grid grid-cols-[1fr_auto_auto] items-center gap-3 px-5 py-4 border-b border-white/10 bg-white/[0.03]">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#a1a1aa]">Capability</span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#a1a1aa] text-center w-28">{data.name}*</span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-center w-28" style={{ color: data.color }}>NUA</span>
          </div>
          {data.rows.map((r, i) => (
            <motion.div
              key={r.label}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              data-testid={`compare-row-${i}`}
              className="grid grid-cols-[1fr_auto_auto] items-center gap-3 px-5 py-4 border-b border-white/5 last:border-b-0"
            >
              <span className="text-sm text-white">{r.label}</span>
              <span className="text-[12px] text-[#71717a] text-center w-28 leading-snug">{r.competitor}</span>
              <span
                className="inline-flex items-center justify-center gap-1 w-28 mx-auto px-2 py-1 rounded-full font-mono text-[10px] font-bold"
                style={{ background: `${data.color}20`, color: data.color }}
              >
                <Check className="w-3 h-3" /> {r.nua}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-10 rounded-2xl p-6 sm:p-8"
          style={{ background: `linear-gradient(135deg, ${data.color}15, #15151d)`, border: `1px solid ${data.color}30` }}
        >
          <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: data.color }}>Why teams switch</span>
          <p className="mt-3 text-white text-base sm:text-lg leading-relaxed max-w-2xl">{data.switchNote}</p>
        </motion.div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 rounded-2xl border border-white/5 bg-white/[0.02] p-6 sm:p-8">
          <div>
            <div className="font-display text-lg font-semibold text-white">See the difference on your own menu.</div>
            <div className="text-sm text-[#a1a1aa] mt-1">{TRIAL_DAYS}-day free trial · no card required</div>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            {LEAD_CAPTURE_ENABLED && (
              <button
                type="button"
                onClick={() => openLead({ type: "demo" })}
                data-testid="compare-detail-book-demo-btn"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#f58c14] hover:bg-[#d87b10] text-white text-sm font-medium transition-all duration-200"
              >
                Book a Demo
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
            <Link
              to="/compare"
              data-testid="compare-detail-back-link"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/10 text-white text-sm font-medium hover:bg-white/5 transition-colors"
            >
              All comparisons
            </Link>
          </div>
        </div>

        <p className="mt-6 text-center text-[11px] text-[#666670] max-w-2xl mx-auto">
          *For illustration only. Confirm current pricing and features directly with {data.name} before deciding.
        </p>
      </div>
    </PageShell>
  );
}
