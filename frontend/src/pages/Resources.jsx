import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BookOpen, FileText, Calculator, LifeBuoy, Newspaper, Code2, ArrowRight, Image } from "lucide-react";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import WhyNua from "@/components/sections/WhyNua";

const resources = [
  { icon: Image, title: "Product Gallery", body: "Real interface renders of every module — POS, AI copilot, wallet and more.", to: "/gallery" },
  { icon: BookOpen, title: "Documentation", body: "Setup guides for every module — POS, KDS, Loyalty, NUA and beyond." },
  { icon: FileText, title: "Case studies", body: "How hospitality groups cut labour cost and food waste with NUA." },
  { icon: Calculator, title: "ROI calculator", body: "See exactly how much a stitched-together POS stack costs vs NUA.", to: "/savings" },
  { icon: LifeBuoy, title: "Help center", body: "Answers to setup, billing and integration questions." },
  { icon: Newspaper, title: "Blog", body: "Product updates, AI research notes, and operator playbooks.", to: "/blog" },
  { icon: Code2, title: "API reference", body: "Build custom integrations on top of the NUA data layer." },
];

export default function Resources() {
  return (
    <PageShell testId="resources-page">
      <PageHero
        eyebrow="— Resources"
        title="Everything to help you switch, well."
        subtitle="Guides, playbooks and reference material for teams evaluating or onboarding onto NUA."
        accent="#8b5cf6"
        crumb="Resources"
      />

      <section className="relative max-w-6xl mx-auto px-6 lg:px-10 pb-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {resources.map((r, i) => {
            return (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                {r.to ? (
                  <Link
                    to={r.to}
                    data-testid={`resource-card-${r.title.toLowerCase().replace(/\s+/g, "-")}`}
                    className="group block rounded-2xl bg-[#15151d] border border-white/5 p-5 hover:-translate-y-1 hover:border-white/10 transition-all duration-300"
                  >
                    <div className="w-9 h-9 rounded-lg bg-[#8b5cf6]/15 flex items-center justify-center">
                      <r.icon className="w-4 h-4 text-[#8b5cf6]" />
                    </div>
                    <h3 className="mt-4 font-display font-semibold text-white text-sm flex items-center gap-1.5">
                      {r.title}
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                    <p className="mt-1.5 text-[13px] text-[#a1a1aa] leading-relaxed">{r.body}</p>
                  </Link>
                ) : (
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    data-testid={`resource-card-${r.title.toLowerCase().replace(/\s+/g, "-")}`}
                    className="group block rounded-2xl bg-[#15151d] border border-white/5 p-5 hover:-translate-y-1 hover:border-white/10 transition-all duration-300"
                  >
                    <div className="w-9 h-9 rounded-lg bg-[#8b5cf6]/15 flex items-center justify-center">
                      <r.icon className="w-4 h-4 text-[#8b5cf6]" />
                    </div>
                    <h3 className="mt-4 font-display font-semibold text-white text-sm flex items-center gap-1.5">
                      {r.title}
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                    <p className="mt-1.5 text-[13px] text-[#a1a1aa] leading-relaxed">{r.body}</p>
                  </a>
                )}
              </motion.div>
            );
          })}
        </div>
      </section>

      <WhyNua />
    </PageShell>
  );
}
