import React from "react";
import { motion } from "framer-motion";
import { Target, Sparkles, ShieldCheck, Users } from "lucide-react";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import SEO from "@/components/SEO";
import LiveNumber from "@/components/graphics/LiveNumber";

const values = [
  { icon: Target, title: "Built by operators", body: "Every module started as a real problem on a real floor, not a feature-request backlog." },
  { icon: Sparkles, title: "AI that acts, not just reports", body: "We measure NUA by decisions made, not dashboards viewed." },
  { icon: ShieldCheck, title: "Trust through transparency", body: "Every automated action is logged and explainable. Nothing runs in the dark." },
  { icon: Users, title: "One system, not ten logins", body: "We'd rather replace your stack than integrate with all of it." },
];

const stats = [
  { value: 42, suffix: "", label: "venues running on NUA" },
  { value: 12000, suffix: "+", label: "AI decisions made daily" },
  { value: 94.2, decimals: 1, suffix: "%", label: "of decisions auto-resolved" },
];

export default function About() {
  return (
    <PageShell testId="about-page">
      <SEO
        title="About: NUA"
        description="NUA exists because running a venue shouldn't mean logging into eight different systems before your first coffee."
        canonical="https://nuapos.com.au/about"
      />
      <PageHero
        eyebrow="Company"
        title="Built by operators, for operators."
        subtitle="NUA exists because running a venue shouldn't mean logging into eight different systems before your first coffee."
        accent="#8b5cf6"
        crumb="About"
      />

      <div className="relative max-w-4xl mx-auto px-6 lg:px-10 pb-24 lg:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-[15px] text-[#a1a1aa] leading-relaxed space-y-4"
        >
          <p>
            NUA started with a simple observation: hospitality operators weren't short on software: they were
            drowning in it. A POS here, a booking system there, a separate app for rostering, another for loyalty,
            a spreadsheet holding it all together. Nobody designed that stack on purpose. It just accumulated, one
            "quick fix" at a time.
          </p>
          <p>
            So we built the opposite: one platform, one data layer, and an AI agent: NUA: that watches everything
            happening across the venue and acts on it, instead of just recording it for someone to read later. Point
            of sale, reservations, kitchen display, loyalty, inventory, staff, analytics, marketing, voice ordering: 
            unified, not integrated.
          </p>
          <p>
            We're a small team of operators, engineers and designers who got tired of watching good venues get
            slowed down by bad software. NUA is what we wished we'd had.
          </p>
        </motion.div>

        <div className="mt-14 grid sm:grid-cols-3 gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded-2xl bg-[#15151d] border border-white/5 p-6 text-center"
            >
              <div className="font-display text-3xl sm:text-4xl font-bold text-white">
                <LiveNumber value={s.value} decimals={s.decimals} suffix={s.suffix} />
              </div>
              <div className="mt-1.5 font-mono text-[11px] uppercase tracking-wider text-[#a1a1aa]">{s.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">What we believe.</h2>
          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="rounded-2xl bg-[#15151d] border border-white/5 p-5 flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-lg bg-[#8b5cf6]/15 flex items-center justify-center flex-shrink-0">
                  <v.icon className="w-5 h-5 text-[#8b5cf6]" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-white text-sm">{v.title}</h3>
                  <p className="mt-1 text-[13px] text-[#a1a1aa] leading-relaxed">{v.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
