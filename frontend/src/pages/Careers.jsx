import React from "react";
import { motion } from "framer-motion";
import { MapPin, ArrowRight, Heart, Rocket, Users2 } from "lucide-react";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import SEO from "@/components/SEO";

const roles = [
  { title: "Senior Backend Engineer", location: "Remote (Australia)", team: "Platform" },
  { title: "AI/ML Engineer", location: "Sydney, NSW", team: "AI Command Center" },
  { title: "Product Designer", location: "Remote (Australia)", team: "Design" },
  { title: "Customer Success Manager", location: "Melbourne, VIC", team: "Customer Success" },
];

const perks = [
  { icon: Rocket, title: "Ship fast, ship real", body: "Small team, direct impact: no six-layer approval chain between an idea and production." },
  { icon: Heart, title: "Built around hospitality", body: "We visit venues, work a shift, and talk to operators. This isn't a spreadsheet product." },
  { icon: Users2, title: "Remote-friendly, AU-based", body: "Work from anywhere in Australia, with the team gathering in person a few times a year." },
];

export default function Careers() {
  return (
    <PageShell testId="careers-page">
      <SEO
        title="Careers: NUA"
        description="We're a small team building the AI operating system for hospitality, looking for people who'd rather fix the real problem than ship another dashboard."
        path="/careers"
      />
      <PageHero
        eyebrow="Careers"
        title="Help operators run smarter."
        subtitle="We're a small team building the AI operating system for hospitality, and we're looking for people who'd rather fix the real problem than ship another dashboard."
        accent="#A45D0D"
        crumb="Careers"
      />

      <div className="relative max-w-4xl mx-auto px-6 lg:px-10 pb-24 lg:pb-32">
        <div className="grid sm:grid-cols-3 gap-4">
          {perks.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="rounded-2xl bg-nua-surface border border-nua-border p-5"
            >
              <div className="w-9 h-9 rounded-lg bg-[#f58c14]/15 flex items-center justify-center">
                <p.icon className="w-4 h-4 text-nua-burgundy" />
              </div>
              <h3 className="mt-4 font-display font-semibold text-nua-ink text-sm">{p.title}</h3>
              <p className="mt-1.5 text-[13px] text-nua-ink2 leading-relaxed">{p.body}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-14">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-nua-ink tracking-tight">Open roles.</h2>
          <div className="mt-6 rounded-2xl border border-nua-border bg-nua-surface overflow-hidden">
            {roles.map((r, i) => (
              <motion.a
                key={r.title}
                href="mailto:info@nuapos.com.au"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                data-testid={`careers-role-${r.title.toLowerCase().replace(/\s+/g, "-")}`}
                className="group flex items-center justify-between gap-4 px-5 py-4 border-b border-nua-border last:border-b-0 hover:bg-nua-bgAlt transition-colors"
              >
                <div>
                  <div className="font-display text-sm font-semibold text-nua-ink">{r.title}</div>
                  <div className="mt-1 flex items-center gap-3 font-mono text-[11px] text-nua-ink2">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{r.location}</span>
                    <span>{r.team}</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-nua-ink2 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
              </motion.a>
            ))}
          </div>
          <p className="mt-4 text-sm text-nua-ink2">
            Don't see a role that fits? Email your resume to{" "}
            <a href="mailto:info@nuapos.com.au" className="text-nua-burgundy hover:underline">info@nuapos.com.au</a> anyway:
            we'd rather hear from you than miss you.
          </p>
        </div>
      </div>
    </PageShell>
  );
}
