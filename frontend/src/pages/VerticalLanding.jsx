import React from "react";
import { useLocation, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Check, X, HelpCircle } from "lucide-react";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import SEO from "@/components/SEO";
import LeadCta from "@/components/LeadCta";
import Figure from "@/components/Figure";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { TRIAL_DAYS } from "@/config/siteConfig";
import verticalsData from "@/data/verticalsData";
import verticalImagery from "@/data/verticalImagery";
import docsData from "@/data/docsData";
import { plans } from "@/data/plansData";

export default function VerticalLanding() {
  // These live at the root (/restaurant-pos, not /verticals/restaurant-pos), so
  // the slug comes from the path rather than a route param.
  const { pathname } = useLocation();
  const slug = pathname.replace(/^\/|\/$/g, "");
  const data = verticalsData.find((v) => v.slug === slug);

  if (!data) return <Navigate to="/solutions" replace />;

  const Icon = data.icon;
  const canonicalPath = `/${data.slug}`;
  const modules = data.features
    .map((id) => docsData.find((d) => d.slug === id))
    .filter(Boolean);
  const starter = plans[0];
  // Optional on purpose: a vertical without photography still renders, so
  // adding a fifth vertical does not require an asset batch first.
  const imagery = verticalImagery[data.slug];

  const faqJsonLd = {
    "@type": "FAQPage",
    mainEntity: data.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <PageShell testId="vertical-landing-page">
      <SEO
        title={data.metaTitle}
        description={data.metaDescription}
        path={canonicalPath}
        includeSoftware
        breadcrumb={[
          { name: "Home", path: "/" },
          { name: data.eyebrow, path: `/${data.slug}` },
        ]}
        jsonLd={faqJsonLd}
      />
      <PageHero
        eyebrow={data.eyebrow}
        title={data.title}
        subtitle={data.intro}
        accent={data.color}
        crumb={data.eyebrow}
      />

      {/* The signature scene for this vertical. Eager and high priority: it
          sits in the viewport on arrival, so deferring it would only move the
          largest paint later. */}
      {imagery && (
        <div className="relative max-w-5xl mx-auto px-6 lg:px-10 -mt-2 mb-14">
          <div className="overflow-hidden rounded-3xl border border-nua-border">
            <Figure
              group={imagery.hero.group}
              id={imagery.hero.id}
              alt={imagery.hero.alt}
              priority
              rounded=""
              sizes="(min-width: 1024px) 1024px, 100vw"
            />
          </div>
        </div>
      )}

      <div className="relative max-w-5xl mx-auto px-6 lg:px-10 pb-24 lg:pb-32">
        {/* Who it's for + what it replaces */}
        <div className="grid lg:grid-cols-2 gap-5">
          <div className="rounded-2xl border p-6 sm:p-7" style={{ background: `linear-gradient(135deg, ${data.color}0D, #FFFDF9)`, borderColor: '#E8DED4' }}>
            <div className="w-11 h-11 rounded-xl flex items-center justify-center border" style={{ background: `${data.color}0D`, borderColor: '#E8DED4' }}>
              <Icon className="w-5 h-5" style={{ color: '#750D28' }} />
            </div>
            <span className="mt-4 block font-mono text-[10px] uppercase tracking-widest text-nua-ink2">Who it's for</span>
            <p className="mt-2 text-nua-ink text-lg leading-snug">{data.forWho}</p>
          </div>

          <div className="rounded-2xl bg-nua-surface border border-nua-border p-6 sm:p-7">
            <span className="font-mono text-[10px] uppercase tracking-widest text-nua-ink2">What it replaces</span>
            <ul className="mt-4 space-y-2.5">
              {data.replaces.map((r) => (
                <li key={r} className="flex items-start gap-2.5 text-[13px] text-nua-ink2 leading-relaxed">
                  <X className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-nua-ink2" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* The operational pain */}
        <div className="mt-12">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-nua-ink tracking-tight">
            What this actually costs you today
          </h2>
          <div className="mt-5 grid sm:grid-cols-2 gap-4">
            {data.pains.map((p, i) => (
              <motion.div
                key={p}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="rounded-2xl bg-nua-surface border border-nua-border p-5 flex items-start gap-3"
              >
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: data.color }} />
                <span className="text-sm text-nua-ink leading-relaxed">{p}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* How the workflow runs */}
        <div className="mt-12">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-nua-ink tracking-tight">
            {data.runsHeading ?? "How a service runs on NUA"}
          </h2>
          <ol className="mt-5 space-y-3">
            {data.workflow.map((w, i) => (
              <motion.li
                key={w.step}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                data-testid={`vertical-workflow-${i}`}
                className="flex gap-4 rounded-2xl bg-nua-surface border border-nua-border p-5"
              >
                <span
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-mono font-semibold flex-shrink-0"
                  style={{ background: `${data.color}0D`, color: '#750D28' }}
                >
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-display font-semibold text-nua-ink text-sm">{w.step}</h3>
                  <p className="mt-1.5 text-[13px] text-nua-ink2 leading-relaxed">{w.body}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>

        {/* What that looks like in the room.
            Placed after the workflow deliberately: the steps make the claim,
            these show the environment it happens in. Every image is lazy — none
            of this is above the fold. */}
        {imagery && (
          <div className="mt-12">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-nua-ink tracking-tight">
              {data.scenesHeading ?? "What that looks like in the room"}
            </h2>
            <div className="mt-5 grid sm:grid-cols-2 gap-4">
              {imagery.scenes.map((scene, i) => (
                <motion.figure
                  key={`${scene.group}-${scene.id}`}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  data-testid={`vertical-scene-${i}`}
                  className="overflow-hidden rounded-2xl bg-nua-surface border border-nua-border"
                >
                  <Figure
                    group={scene.group}
                    id={scene.id}
                    alt={scene.alt}
                    rounded=""
                    sizes="(min-width: 640px) 512px, 100vw"
                  />
                  <figcaption className="p-5 text-[13px] text-nua-ink2 leading-relaxed">
                    {scene.caption}
                  </figcaption>
                </motion.figure>
              ))}
            </div>
          </div>
        )}

        {/* Modules involved */}
        <div className="mt-12">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-nua-ink tracking-tight">
            The modules doing the work
          </h2>
          <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {modules.map((m) => (
              <Link
                key={m.slug}
                to={`/docs/${m.slug}`}
                data-testid={`vertical-module-${m.slug}`}
                className="group block rounded-2xl bg-nua-surface border border-nua-border p-5 hover:-translate-y-1 hover:border-nua-border transition-all duration-300"
              >
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${m.color}0D` }}>
                  <m.icon className="w-4 h-4" style={{ color: '#750D28' }} />
                </div>
                <h3 className="mt-3 font-display font-semibold text-nua-ink text-sm">{m.title}</h3>
                <p className="mt-1 text-[13px] text-nua-ink2 leading-relaxed">{m.tagline}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Pricing pointer */}
        <div className="mt-12 rounded-2xl border border-nua-border bg-nua-bgAlt p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <div className="font-display text-lg font-semibold text-nua-ink">
              From AUD ${starter.priceMonthly}* + GST per venue / month
            </div>
            <div className="text-sm text-nua-ink2 mt-1">
              Every plan includes the AI Agent, Voice POS and the Loyalty engine. {TRIAL_DAYS}-day free trial, no card required.
            </div>
          </div>
          <Link
            to="/pricing"
            data-testid="vertical-pricing-link"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-nua-border text-nua-ink text-sm font-medium hover:bg-nua-bgAlt transition-colors flex-shrink-0"
          >
            Compare plans
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* FAQ */}
        <div className="mt-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-nua-border bg-nua-bgAlt">
            <HelpCircle className="w-3.5 h-3.5" style={{ color: '#750D28' }} />
            <span className="font-mono text-[11px] uppercase tracking-widest text-nua-ink2">FAQ</span>
          </div>
          <h2 className="font-display mt-4 text-2xl sm:text-3xl font-bold text-nua-ink tracking-tight">
            {data.eyebrow} questions, answered
          </h2>
          <div className="mt-5 rounded-2xl bg-nua-surface border border-nua-border px-6 sm:px-8">
            <Accordion type="single" collapsible className="w-full">
              {data.faqs.map((f, i) => (
                <AccordionItem key={f.q} value={`v-faq-${i}`} className="border-nua-border" data-testid={`vertical-faq-${i}`}>
                  <AccordionTrigger className="text-left text-nua-ink hover:no-underline py-5 text-[15px] font-display font-semibold">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-nua-ink2 text-sm leading-relaxed">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 rounded-2xl border p-6 sm:p-8" style={{ background: `linear-gradient(135deg, ${data.color}0D, #FFFDF9)`, borderColor: '#E8DED4' }}>
          <div>
            <div className="font-display text-lg font-semibold text-nua-ink">See NUA running a venue like yours.</div>
            <div className="text-sm text-nua-ink2 mt-1">Email us and we'll walk you through it on your own menu.</div>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <LeadCta
              type="demo"
              label="Book a Demo"
              icon={ArrowRight}
              fallback="email"
              testId="vertical-cta"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-nua-burgundy hover:bg-nua-burgundyDark text-white text-sm font-medium transition-all duration-200"
            />
            <Link
              to="/features"
              data-testid="vertical-features-link"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-nua-border text-nua-ink text-sm font-medium hover:bg-nua-bgAlt transition-colors"
            >
              See all features
            </Link>
          </div>
        </div>

        <p className="mt-6 text-center text-[11px] text-nua-muted max-w-2xl mx-auto">
          *Pricing shown is indicative and may vary by region, add-ons or promotional offers. Confirm a formal quote for your venue before purchase.
        </p>

        {/* Sibling verticals: internal linking between the keyword clusters */}
        <div className="mt-12">
          <span className="font-mono text-[10px] uppercase tracking-widest text-nua-ink2">Other venue types</span>
          <div className="mt-4 flex flex-wrap gap-3">
            {verticalsData.filter((v) => v.slug !== data.slug).map((v) => (
              <Link
                key={v.slug}
                to={`/${v.slug}`}
                data-testid={`vertical-sibling-${v.slug}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-nua-surface border border-nua-border text-sm text-nua-ink hover:border-white/15 transition-colors"
              >
                <v.icon className="w-3.5 h-3.5" style={{ color: v.color }} />
                {v.eyebrow}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
