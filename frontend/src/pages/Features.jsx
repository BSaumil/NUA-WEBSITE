import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CheckCircle2, ArrowRight } from "lucide-react";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import { VISUAL_REGISTRY } from "@/components/graphics/FeatureVisuals";
import featuresData from "@/data/featuresData";

export default function Features() {
  return (
    <PageShell testId="features-page">
      <PageHero
        eyebrow="How it works"
        title="Every feature, graphically explained."
        subtitle="NUA isn't a black box. Here's exactly how each module works, plainly explained, side-by-side with the interface your team sees. No code, just how it plays out."
        accent="#f58c14"
        crumb="Features"
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 -mt-8 mb-12 flex justify-center">
        <Link
          to="/gallery"
          data-testid="features-see-gallery-link"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/10 text-white text-sm font-medium hover:bg-white/5 transition-colors"
        >
          See these as real interface renders, in the Product Gallery
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pb-24 lg:pb-32">
        <div className="space-y-6">
          {featuresData.map((f, i) => {
            const Visual = VISUAL_REGISTRY[f.id];
            const Icon = f.icon;
            return (
              <motion.section
                key={f.id}
                id={f.id}
                data-testid={`feature-explainer-${f.id}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55 }}
                className="rounded-3xl border border-white/5 bg-[#101018] p-6 sm:p-8 lg:p-10"
              >
                <div className="grid lg:grid-cols-12 gap-8">
                  {/* Text */}
                  <div className="lg:col-span-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/10"
                        style={{ background: `linear-gradient(135deg, ${f.color}30, ${f.color}05)` }}
                      >
                        <Icon className="w-5 h-5" style={{ color: f.color }} />
                      </div>
                      <span className="font-mono text-[11px] text-[#71717a]">{String(i + 1).padStart(2, "0")} / {String(featuresData.length).padStart(2, "0")}</span>
                    </div>
                    <h2 className="font-display mt-4 text-2xl sm:text-3xl font-bold text-white tracking-tight leading-[1.05]">
                      {f.title}
                    </h2>
                    <p className="mt-1 text-sm font-medium" style={{ color: f.color }}>{f.tagline}</p>
                    <p className="mt-4 text-sm text-[#a1a1aa] leading-relaxed">{f.description}</p>

                    <ul className="mt-5 space-y-2">
                      {f.capabilities.map((c) => (
                        <li key={c} className="flex items-start gap-2 text-[13px] text-[#eaeaea]">
                          <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: f.color }} />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Visual */}
                  <div className="lg:col-span-4 flex flex-col justify-center">
                    <span className="mb-2 font-mono text-[10px] uppercase tracking-widest text-[#71717a]">Interface</span>
                    {Visual && <Visual />}
                  </div>

                  {/* How it works: plain-language steps, no code */}
                  <div className="lg:col-span-4 flex flex-col justify-center">
                    <span className="mb-2 font-mono text-[10px] uppercase tracking-widest text-[#71717a]">How it works</span>
                    <div className="rounded-2xl bg-white/[0.03] border border-white/5 p-5">
                      <ol className="space-y-4">
                        {f.howItWorks.map((step, idx) => (
                          <li key={step} className="flex items-start gap-3">
                            <span
                              className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-mono font-semibold flex-shrink-0"
                              style={{ background: `${f.color}20`, color: f.color }}
                            >
                              {idx + 1}
                            </span>
                            <span className="text-[13px] text-[#eaeaea] leading-relaxed pt-0.5">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </div>
              </motion.section>
            );
          })}
        </div>
      </div>
    </PageShell>
  );
}
