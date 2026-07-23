import React from "react";
import { motion } from "framer-motion";
import { Coffee, UtensilsCrossed, Wine, Building2, Soup } from "lucide-react";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import Reservations from "@/components/sections/Reservations";
import MultiLocation from "@/components/sections/MultiLocation";

const venues = [
  { icon: Coffee, title: "Cafés & quick service", body: "Fast checkout, voice ordering, and loyalty that turns walk-ins into regulars." },
  { icon: UtensilsCrossed, title: "Casual dining", body: "Table management, KDS routing, and AI rostering tuned for high-turn service." },
  { icon: Soup, title: "Fine dining", body: "VIP guest intelligence, experiences & events, and margin-aware menu engineering." },
  { icon: Wine, title: "Bars & lounges", body: "Tab management, upsell prompts, and busy-time staffing forecasts." },
  { icon: Building2, title: "Hospitality groups", body: "Franchise dashboards, central pricing, and cross-venue benchmarking." },
];

export default function Solutions() {
  return (
    <PageShell testId="solutions-page">
      <PageHero
        eyebrow="— Solutions"
        title="Built for every kind of venue."
        subtitle="From a single café to a global hospitality group — NUA adapts to how your business actually runs, without bolting on a different tool for every venue type."
        accent="#ec4899"
        crumb="Solutions"
      />

      <section className="relative max-w-7xl mx-auto px-6 lg:px-10 pb-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {venues.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              data-testid={`solution-card-${v.title.split(" ")[0].toLowerCase()}`}
              className="rounded-2xl bg-[#15151d] border border-white/5 p-5 hover:-translate-y-1 hover:border-white/10 transition-all duration-300"
            >
              <div className="w-9 h-9 rounded-lg bg-[#ec4899]/15 flex items-center justify-center">
                <v.icon className="w-4 h-4 text-[#ec4899]" />
              </div>
              <h3 className="mt-4 font-display font-semibold text-white text-sm">{v.title}</h3>
              <p className="mt-1.5 text-[13px] text-[#a1a1aa] leading-relaxed">{v.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <Reservations />
      <MultiLocation />
    </PageShell>
  );
}
