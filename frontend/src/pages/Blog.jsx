import React from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";

const posts = [
  { tag: "Operations", read: "6 min", title: "The real cost of a stitched-together POS stack", excerpt: "We itemised every tool a typical venue pays for separately — and what it actually adds up to." },
  { tag: "AI Agent", read: "8 min", title: "Inside NUA's confidence-scored decision loop", excerpt: "Why some actions execute instantly, some wait for a tap, and some are just suggested." },
  { tag: "Loyalty", read: "4 min", title: "Wallet passes beat punch cards — here's the data", excerpt: "What happens to repeat-visit rate when loyalty lives on a phone instead of a paper card." },
  { tag: "Staff", read: "5 min", title: "How AI rostering cut labour cost 12% at a 40-seat bistro", excerpt: "A look at what changes when rosters are built from a forecast instead of a gut feel." },
  { tag: "Voice POS", read: "3 min", title: "Setting up Voice POS in under 10 minutes", excerpt: "A practical walkthrough for getting your pass talking to your kitchen." },
  { tag: "Multi-location", read: "7 min", title: "Benchmarking across venues: what good looks like", excerpt: "The handful of metrics that actually tell you which venue in your group needs attention." },
];

export default function Blog() {
  return (
    <PageShell testId="blog-page">
      <PageHero
        eyebrow="— Blog"
        title="Product notes & operator playbooks."
        subtitle="Field notes from building an AI operating system for hospitality — and from the venues running on it."
        accent="#8b5cf6"
        crumb="Blog"
      />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-10 pb-24 lg:pb-32">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              data-testid={`blog-post-${i}`}
              className="rounded-2xl bg-[#15151d] border border-white/5 p-5 hover:-translate-y-1 hover:border-white/10 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded-full bg-[#8b5cf6]/15 text-[#c4b5fd] font-mono text-[10px] uppercase tracking-wider">{p.tag}</span>
                <span className="flex items-center gap-1 font-mono text-[10px] text-[#71717a]"><Clock className="w-3 h-3" />{p.read}</span>
              </div>
              <h3 className="mt-4 font-display font-semibold text-white text-base leading-snug">{p.title}</h3>
              <p className="mt-2 text-[13px] text-[#a1a1aa] leading-relaxed">{p.excerpt}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
