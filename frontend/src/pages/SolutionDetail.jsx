import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Quote } from "lucide-react";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import { useModals } from "@/components/ModalProvider";
import solutionsData from "@/data/solutionsData";

export default function SolutionDetail() {
  const { slug } = useParams();
  const { openLead } = useModals();
  const data = solutionsData.find((s) => s.slug === slug);

  if (!data) return <Navigate to="/solutions" replace />;

  const Icon = data.icon;

  return (
    <PageShell testId="solution-detail-page">
      <PageHero
        eyebrow="— Solutions"
        title={data.tagline}
        subtitle={data.heroBody}
        accent={data.color}
        crumb={data.title}
      />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-10 pb-24 lg:pb-32">
        {/* Pain points + stat */}
        <div className="grid lg:grid-cols-2 gap-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl bg-[#15151d] border border-white/5 p-6 sm:p-7"
          >
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#71717a]">What {data.title.toLowerCase()} venues run into</span>
            <ul className="mt-4 space-y-3">
              {data.painPoints.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-sm text-[#eaeaea] leading-relaxed">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: data.color }} />
                  {p}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="rounded-2xl border p-6 sm:p-7 flex flex-col justify-center items-center text-center"
            style={{ background: `linear-gradient(135deg, ${data.color}15, #15151d)`, borderColor: `${data.color}30` }}
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center border" style={{ background: `${data.color}20`, borderColor: `${data.color}40` }}>
              <Icon className="w-6 h-6" style={{ color: data.color }} />
            </div>
            <div className="mt-4 font-display text-4xl sm:text-5xl font-bold text-white">{data.stat.value}</div>
            <div className="mt-1 font-mono text-[11px] uppercase tracking-wider text-[#a1a1aa] max-w-[220px]">{data.stat.label}</div>
          </motion.div>
        </div>

        {/* Key features for this vertical */}
        <div className="mt-16">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Built for how {data.title.toLowerCase()} actually runs.
          </h2>
          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            {data.features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="rounded-2xl bg-[#15151d] border border-white/5 p-5 flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${data.color}20` }}>
                  <f.icon className="w-5 h-5" style={{ color: data.color }} />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-white text-sm">{f.title}</h3>
                  <p className="mt-1 text-[13px] text-[#a1a1aa] leading-relaxed">{f.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 rounded-2xl bg-[#15151d] border border-white/5 p-8 sm:p-10"
        >
          <Quote className="w-6 h-6" style={{ color: data.color }} />
          <p className="mt-4 font-display text-xl sm:text-2xl text-white leading-snug max-w-2xl">
            &ldquo;{data.quote.text}&rdquo;
          </p>
          <div className="mt-4 font-mono text-[11px] uppercase tracking-wider text-[#a1a1aa]">
            {data.quote.author} · {data.quote.venue}
          </div>
        </motion.div>

        {/* CTA */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 rounded-2xl border border-white/5 bg-white/[0.02] p-6 sm:p-8">
          <div>
            <div className="font-display text-lg font-semibold text-white">See NUA running a venue like yours.</div>
            <div className="text-sm text-[#a1a1aa] mt-1">14-day free trial · no card required</div>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              type="button"
              onClick={() => openLead({ type: "demo" })}
              data-testid="solution-detail-book-demo-btn"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#f58c14] hover:bg-[#d87b10] text-white text-sm font-medium transition-all duration-200"
            >
              Book a Demo
              <ArrowRight className="w-4 h-4" />
            </button>
            <Link
              to="/solutions"
              data-testid="solution-detail-back-link"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/10 text-white text-sm font-medium hover:bg-white/5 transition-colors"
            >
              All solutions
            </Link>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
