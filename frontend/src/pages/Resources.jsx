import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BookOpen, FileText, Calculator, LifeBuoy, Newspaper, Code2, ArrowRight, Image, Mail, HelpCircle } from "lucide-react";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import SEO from "@/components/SEO";
import WhyNua from "@/components/sections/WhyNua";
import BrandIcon from "@/components/BrandIcon";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { SUPPORT_EMAIL } from "@/config/siteConfig";
import faqData from "@/data/faqData";

const resources = [
  { icon: Image, title: "Product Gallery", body: "Real interface renders of every module: POS, AI copilot, wallet and more.", to: "/gallery" },
  { icon: BookOpen, title: "Documentation", body: "Setup guides for every module: POS, KDS, Loyalty, NUA and beyond.", to: "/docs" },
  { icon: FileText, title: "Case studies", body: "How hospitality groups cut labour cost and food waste with NUA.", to: "/customers" },
  { icon: Calculator, title: "ROI calculator", body: "See exactly how much a stitched-together POS stack costs vs NUA.", to: "/savings" },
  { icon: LifeBuoy, title: "Help center", body: "Answers to setup, billing and integration questions.", to: "/resources#faq" },
  { icon: Newspaper, title: "Blog", body: "Product updates, AI research notes, and operator playbooks.", to: "/blog" },
  { icon: Code2, title: "API reference", body: "Custom integrations and API access are included on Growth and Enterprise plans.", to: "/docs" },
];

const faqJsonLd = {
  "@type": "FAQPage",
  mainEntity: faqData.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Resources() {
  return (
    <PageShell testId="resources-page">
      <SEO
        title="Resources & FAQ: NUA"
        description="Guides, playbooks, documentation and FAQs for teams evaluating or onboarding onto NUA."
        path="/resources"
        jsonLd={faqJsonLd}
      />
      <PageHero
        eyebrow="Resources"
        title="Everything to help you switch, well."
        subtitle="Guides, playbooks and reference material for teams evaluating or onboarding onto NUA."
        accent="#7D52DD"
        crumb="Resources"
      />

      <section className="relative max-w-6xl mx-auto px-6 lg:px-10 pb-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {resources.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <Link
                to={r.to}
                data-testid={`resource-card-${r.title.toLowerCase().replace(/\s+/g, "-")}`}
                className="group block rounded-2xl bg-nua-surface border border-nua-border p-5 hover:-translate-y-1 hover:border-nua-border transition-all duration-300"
              >
                <div className="w-9 h-9 rounded-lg bg-nua-burgundyWash flex items-center justify-center">
                  <r.icon className="w-4 h-4 text-nua-burgundy" />
                </div>
                <h3 className="mt-4 font-display font-semibold text-nua-ink text-sm flex items-center gap-1.5">
                  {r.title}
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="mt-1.5 text-[13px] text-nua-ink2 leading-relaxed">{r.body}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" data-testid="resources-faq-section" className="relative max-w-4xl mx-auto px-6 lg:px-10 pt-12 pb-20 scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-nua-burgundy/20 bg-nua-burgundyWash">
            <HelpCircle className="w-3.5 h-3.5 text-nua-burgundy" />
            <span className="font-mono text-[11px] uppercase tracking-widest text-nua-burgundy">FAQ</span>
          </div>
          <h2 className="font-display mt-4 text-3xl sm:text-4xl font-bold text-nua-ink tracking-tight">
            Questions, answered.
          </h2>
          <p className="mt-3 text-nua-ink2">
            The most common things teams ask before and during onboarding. Can't find yours? Email us below.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl bg-nua-surface border border-nua-border px-6 sm:px-8"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqData.map((f, i) => (
              <AccordionItem key={f.q} value={`faq-${i}`} className="border-nua-border" data-testid={`faq-item-${i}`}>
                <AccordionTrigger className="text-left text-nua-ink hover:no-underline py-5 text-[15px] font-display font-semibold">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-nua-ink2 text-sm leading-relaxed">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </section>

      {/* Brand + contact */}
      <section className="relative max-w-4xl mx-auto px-6 lg:px-10 pb-20">
        <div className="rounded-2xl border border-nua-border bg-nua-bgAlt p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <BrandIcon size={36} />
            <div>
              <div className="font-display font-semibold text-nua-ink">NUA AUS PTY LTD</div>
              <div className="text-sm text-nua-ink2">Still have a question? A real person reads this inbox.</div>
            </div>
          </div>
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            data-testid="resources-email-support"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-nua-burgundy hover:bg-nua-burgundyDark text-white text-sm font-medium transition-all duration-200 flex-shrink-0"
          >
            <Mail className="w-4 h-4" />
            {SUPPORT_EMAIL}
          </a>
        </div>
      </section>

      <WhyNua />
    </PageShell>
  );
}
