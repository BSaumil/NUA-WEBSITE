import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import SEO from "@/components/SEO";
import solutionsData from "@/data/solutionsData";

export default function Customers() {
  return (
    <PageShell testId="customers-page">
      <SEO
        title="Customers: NUA"
        description="From single-site cafés to multi-venue groups: here's who trusts NUA to run the floor."
        path="/customers"
      />
      <PageHero
        eyebrow="Customers"
        title="Operators who run on NUA."
        subtitle="From single-site cafés to multi-venue groups: here's who trusts NUA to run the floor."
        accent="#BF3A7B"
        crumb="Customers"
      />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-10 pb-24 lg:pb-32">
        <div className="grid sm:grid-cols-2 gap-5">
          {solutionsData.map((s, i) => (
            <motion.div
              key={s.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              data-testid={`customer-card-${s.slug}`}
              className="rounded-2xl bg-nua-surface border border-nua-border p-6"
            >
              <Quote className="w-5 h-5" style={{ color: '#750D28' }} />
              <p className="mt-3 text-nua-ink leading-relaxed">&ldquo;{s.quote.text}&rdquo;</p>
              <div className="mt-4 flex items-center justify-between">
                <div className="font-mono text-[11px] uppercase tracking-wider text-nua-ink2">
                  {s.quote.author} · {s.quote.venue}
                </div>
                <span
                  className="px-2 py-0.5 rounded-full font-mono text-[10px] uppercase tracking-wider"
                  style={{ background: `${s.color}18`, color: '#750D28' }}
                >
                  {s.title}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
