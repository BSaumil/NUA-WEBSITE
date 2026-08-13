import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, Info } from "lucide-react";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import compareData from "@/data/compareData";

const MotionLink = motion(Link);

export default function Compare() {
  return (
    <PageShell testId="compare-page">
      <PageHero
        eyebrow="Compare"
        title="NUA, next to the platforms you're already evaluating."
        subtitle="A straight, feature-level comparison: not a takedown. Pick the one you're weighing against NUA."
        accent="#f58c14"
        crumb="Compare"
      />

      <div className="relative max-w-5xl mx-auto px-6 lg:px-10 pb-24 lg:pb-32">
        <div className="flex items-start gap-3 rounded-2xl bg-white/[0.03] border border-white/5 p-4" data-testid="compare-disclaimer">
          <Info className="w-4 h-4 text-[#a1a1aa] mt-0.5 flex-shrink-0" />
          <p className="text-[13px] text-[#a1a1aa] leading-relaxed">
            Competitor details reflect general, publicly-known category positioning, not confirmed current pricing. 
            Plans and features change often. Confirm specifics directly with each provider; NUA's own figures are
            accurate as of the pricing page.
          </p>
        </div>

        <div className="mt-8 grid sm:grid-cols-2 gap-4">
          {compareData.map((c, i) => (
            <MotionLink
              key={c.slug}
              to={`/compare/${c.slug}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              data-testid={`compare-card-${c.slug}`}
              className="group block rounded-2xl bg-[#15151d] border border-white/5 p-6 hover:-translate-y-1 hover:border-white/10 transition-all duration-300"
            >
              <div className="flex items-start justify-between">
                <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: c.color }}>{c.category}</span>
                <ArrowUpRight className="w-4 h-4 text-[#a1a1aa] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="mt-3 font-display text-xl font-bold text-white">NUA vs {c.name}*</h3>
              <p className="mt-2 text-[13px] text-[#a1a1aa] leading-relaxed">{c.summary}</p>
            </MotionLink>
          ))}
        </div>

        <p className="mt-8 text-center text-[11px] text-[#666670] max-w-2xl mx-auto">
          *For illustration only. Confirm current pricing and features directly with each provider before deciding.
        </p>
      </div>
    </PageShell>
  );
}
