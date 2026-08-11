import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import posts from "@/data/blogData";

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
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <Link
                to={`/blog/${p.slug}`}
                data-testid={`blog-post-${i}`}
                className="block h-full rounded-2xl bg-[#15151d] border border-white/5 p-5 hover:-translate-y-1 hover:border-white/10 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-full bg-[#8b5cf6]/15 text-[#c4b5fd] font-mono text-[10px] uppercase tracking-wider">{p.pillar}</span>
                  <span className="flex items-center gap-1 font-mono text-[10px] text-[#71717a]"><Clock className="w-3 h-3" />{p.readTime}</span>
                </div>
                <h3 className="mt-4 font-display font-semibold text-white text-base leading-snug">{p.title}</h3>
                <p className="mt-2 text-[13px] text-[#a1a1aa] leading-relaxed">{p.excerpt}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
