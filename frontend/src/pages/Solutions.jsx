import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import Reservations from "@/components/sections/Reservations";
import MultiLocation from "@/components/sections/MultiLocation";
import solutionsData from "@/data/solutionsData";

const MotionLink = motion(Link);

export default function Solutions() {
  return (
    <PageShell testId="solutions-page">
      <PageHero
        eyebrow="Solutions"
        title="Built for every kind of venue."
        subtitle="From a single café to a global hospitality group: NUA adapts to how your business actually runs, without bolting on a different tool for every venue type."
        accent="#ec4899"
        crumb="Solutions"
      />

      <section className="relative max-w-7xl mx-auto px-6 lg:px-10 pb-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {solutionsData.map((v, i) => (
            <MotionLink
              key={v.slug}
              to={`/solutions/${v.slug}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              data-testid={`solution-card-${v.slug}`}
              className="group block rounded-2xl bg-[#15151d] border border-white/5 p-5 hover:-translate-y-1 hover:border-white/10 transition-all duration-300"
            >
              <div className="flex items-start justify-between">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${v.color}20` }}>
                  <v.icon className="w-4 h-4" style={{ color: v.color }} />
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#a1a1aa] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="mt-4 font-display font-semibold text-white text-sm">{v.title}</h3>
              <p className="mt-1.5 text-[13px] text-[#a1a1aa] leading-relaxed">{v.tagline}</p>
            </MotionLink>
          ))}
        </div>
      </section>

      <Reservations />
      <MultiLocation />
    </PageShell>
  );
}
