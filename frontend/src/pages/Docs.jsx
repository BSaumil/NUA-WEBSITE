import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, Mail } from "lucide-react";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import SEO from "@/components/SEO";
import { SUPPORT_EMAIL } from "@/config/siteConfig";
import docsData from "@/data/docsData";

const MotionLink = motion(Link);

const categories = ["Core", "AI", "Operations"];

export default function Docs() {
  return (
    <PageShell testId="docs-page">
      <SEO
        title="Documentation: Setup Guides: NUA"
        description="Step-by-step instructions for getting POS, KDS, Bookings, Loyalty, the AI Agent and every other module live at your venue."
        canonical="https://nuapos.com.au/docs"
      />
      <PageHero
        eyebrow="Documentation"
        title="Setup guides for every module."
        subtitle="Step-by-step instructions for getting POS, KDS, Bookings, Loyalty, the NUA AI Agent and every other module live at your venue."
        accent="#8b5cf6"
        crumb="Documentation"
      />

      <section className="relative max-w-6xl mx-auto px-6 lg:px-10 pb-16">
        {categories.map((cat) => {
          const items = docsData.filter((d) => d.category === cat);
          if (!items.length) return null;
          return (
            <div key={cat} className="mb-12 last:mb-0">
              <span className="font-mono text-[11px] uppercase tracking-widest text-[#a1a1aa]">{cat} modules</span>
              <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((d, i) => (
                  <MotionLink
                    key={d.slug}
                    to={`/docs/${d.slug}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                    data-testid={`docs-card-${d.slug}`}
                    className="group block rounded-2xl bg-[#15151d] border border-white/5 p-5 hover:-translate-y-1 hover:border-white/10 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${d.color}20` }}>
                        <d.icon className="w-4 h-4" style={{ color: d.color }} />
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-[#a1a1aa] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <h3 className="mt-4 font-display font-semibold text-white text-sm">{d.title}</h3>
                    <p className="mt-1.5 text-[13px] text-[#a1a1aa] leading-relaxed">{d.summary}</p>
                    <span className="mt-3 inline-block font-mono text-[10px] uppercase tracking-widest text-[#a1a1aa]">
                      Setup time · {d.setupTime}
                    </span>
                  </MotionLink>
                ))}
              </div>
            </div>
          );
        })}

        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-6 rounded-2xl border border-white/5 bg-white/[0.02] p-6 sm:p-8">
          <div>
            <div className="font-display text-lg font-semibold text-white">Can't find what you're looking for?</div>
            <div className="text-sm text-[#a1a1aa] mt-1">Browse the FAQ, or email our team directly and we'll walk you through it.</div>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <Link
              to="/resources#faq"
              data-testid="docs-see-faq-link"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/10 text-white text-sm font-medium hover:bg-white/5 transition-colors"
            >
              See the FAQ
            </Link>
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              data-testid="docs-email-support"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#f58c14] hover:bg-[#d87b10] text-[#1a1005] text-sm font-medium transition-all duration-200"
            >
              <Mail className="w-4 h-4" />
              {SUPPORT_EMAIL}
            </a>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
