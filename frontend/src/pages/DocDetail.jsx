import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, AlertTriangle, Mail, Clock } from "lucide-react";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import SEO from "@/components/SEO";
import { SUPPORT_EMAIL } from "@/config/siteConfig";
import docsData from "@/data/docsData";

export default function DocDetail() {
  const { slug } = useParams();
  const data = docsData.find((d) => d.slug === slug);

  if (!data) return <Navigate to="/docs" replace />;

  const Icon = data.icon;
  const related = docsData.filter((d) => data.related.includes(d.slug));
  const canonical = `https://nuapos.com.au/docs/${data.slug}`;
  const howToJsonLd = {
    "@type": "HowTo",
    name: `${data.title} setup guide`,
    description: data.summary,
    step: data.steps.map((s) => ({
      "@type": "HowToStep",
      name: s.title,
      text: s.body,
    })),
  };

  return (
    <PageShell testId="doc-detail-page">
      <SEO
        title={`${data.title} Setup Guide: NUA`}
        description={data.summary}
        canonical={canonical}
        jsonLd={howToJsonLd}
        breadcrumb={[{ name: "Home", path: "/" }, { name: "Documentation", path: "/docs" }, { name: data.title, path: `/docs/${data.slug}` }]}
      />
      <PageHero
        eyebrow={`Documentation · ${data.category}`}
        title={data.tagline}
        subtitle={data.summary}
        accent={data.color}
        crumb={data.title}
      />

      <div className="relative max-w-4xl mx-auto px-6 lg:px-10 pb-24 lg:pb-32">
        {/* Header strip */}
        <div className="flex flex-wrap items-center gap-4 rounded-2xl border p-5" style={{ background: `linear-gradient(135deg, ${data.color}15, #15151d)`, borderColor: `${data.color}30` }}>
          <div className="w-11 h-11 rounded-xl flex items-center justify-center border flex-shrink-0" style={{ background: `${data.color}20`, borderColor: `${data.color}40` }}>
            <Icon className="w-5 h-5" style={{ color: data.color }} />
          </div>
          <div>
            <div className="font-display font-semibold text-white">{data.title} setup guide</div>
            <div className="mt-0.5 flex items-center gap-1.5 font-mono text-[11px] text-[#a1a1aa]">
              <Clock className="w-3 h-3" /> Estimated setup time: {data.setupTime}
            </div>
          </div>
        </div>

        {/* Prerequisites */}
        <div className="mt-10">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#71717a]">Before you start</span>
          <div className="mt-4 rounded-2xl bg-[#15151d] border border-white/5 p-6 sm:p-7">
            <ul className="space-y-3">
              {data.prerequisites.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-sm text-[#eaeaea] leading-relaxed">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: data.color }} />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Steps */}
        <div className="mt-10">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#71717a]">Setup steps</span>
          <ol className="mt-4 space-y-4">
            {data.steps.map((s, i) => (
              <motion.li
                key={s.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                data-testid={`doc-step-${i}`}
                className="flex gap-4 rounded-2xl bg-[#15151d] border border-white/5 p-5 sm:p-6"
              >
                <span
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-mono font-semibold flex-shrink-0"
                  style={{ background: `${data.color}20`, color: data.color }}
                >
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-display font-semibold text-white text-sm">{s.title}</h3>
                  <p className="mt-1.5 text-[13px] text-[#a1a1aa] leading-relaxed">{s.body}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>

        {/* Tips + Troubleshooting */}
        <div className="mt-10 grid lg:grid-cols-2 gap-5">
          <div className="rounded-2xl bg-[#15151d] border border-white/5 p-6 sm:p-7">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#71717a]">Tips</span>
            </div>
            <ul className="mt-4 space-y-3">
              {data.tips.map((t) => (
                <li key={t} className="text-[13px] text-[#eaeaea] leading-relaxed">{t}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-[#15151d] border border-white/5 p-6 sm:p-7">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-[#f58c14]" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#71717a]">Troubleshooting</span>
            </div>
            <ul className="mt-4 space-y-4">
              {data.troubleshooting.map((t) => (
                <li key={t.issue}>
                  <div className="text-[13px] font-semibold text-white">{t.issue}</div>
                  <div className="mt-1 text-[13px] text-[#a1a1aa] leading-relaxed">{t.fix}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Related modules */}
        {related.length > 0 && (
          <div className="mt-10">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#71717a]">Related modules</span>
            <div className="mt-4 grid sm:grid-cols-3 gap-4">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to={`/docs/${r.slug}`}
                  data-testid={`doc-related-${r.slug}`}
                  className="group block rounded-2xl bg-[#15151d] border border-white/5 p-5 hover:-translate-y-1 hover:border-white/10 transition-all duration-300"
                >
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${r.color}20` }}>
                    <r.icon className="w-4 h-4" style={{ color: r.color }} />
                  </div>
                  <h3 className="mt-3 font-display font-semibold text-white text-sm">{r.title}</h3>
                  <p className="mt-1 text-[13px] text-[#a1a1aa] leading-relaxed">{r.tagline}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-6 rounded-2xl border border-white/5 bg-white/[0.02] p-6 sm:p-8">
          <div>
            <div className="font-display text-lg font-semibold text-white">Still stuck on {data.title.toLowerCase()} setup?</div>
            <div className="text-sm text-[#a1a1aa] mt-1">Email us directly, a real person on the team replies.</div>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              data-testid="doc-detail-email-support"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#f58c14] hover:bg-[#d87b10] text-white text-sm font-medium transition-all duration-200"
            >
              <Mail className="w-4 h-4" />
              {SUPPORT_EMAIL}
            </a>
            <Link
              to="/docs"
              data-testid="doc-detail-back-link"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/10 text-white text-sm font-medium hover:bg-white/5 transition-colors"
            >
              All documentation
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
