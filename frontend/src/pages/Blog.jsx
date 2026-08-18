import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, ChevronLeft, ChevronRight } from "lucide-react";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import SEO from "@/components/SEO";
import posts from "@/data/blogData";

const PAGE_SIZE = 9;

const pillars = [...new Set(posts.map((p) => p.pillar))];

export default function Blog() {
  const [activePillar, setActivePillar] = useState("All");
  const [page, setPage] = useState(1);

  const filtered = useMemo(
    () => (activePillar === "All" ? posts : posts.filter((p) => p.pillar === activePillar)),
    [activePillar]
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const selectPillar = (pillar) => {
    setActivePillar(pillar);
    setPage(1);
  };

  return (
    <PageShell testId="blog-page">
      <SEO
        title="Blog: NUA"
        description="Field notes from building an AI operating system for hospitality, and from the venues running on it."
        canonical="https://nuapos.com.au/blog"
      />
      <PageHero
        eyebrow="Blog"
        title="Product notes & operator playbooks."
        subtitle="Field notes from building an AI operating system for hospitality, and from the venues running on it."
        accent="#8b5cf6"
        crumb="Blog"
      />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-10 pb-24 lg:pb-32">
        <div className="flex flex-wrap gap-2" data-testid="blog-pillar-filter">
          {["All", ...pillars].map((pillar) => (
            <button
              key={pillar}
              type="button"
              onClick={() => selectPillar(pillar)}
              data-testid={`blog-pillar-${pillar.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
              className={`px-3 py-1.5 rounded-full font-mono text-[11px] uppercase tracking-wider transition-colors ${
                activePillar === pillar
                  ? "bg-[#7c3aed] text-white"
                  : "bg-white/5 text-[#a1a1aa] hover:bg-white/10 hover:text-white"
              }`}
            >
              {pillar}
            </button>
          ))}
        </div>

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {pageItems.map((p, i) => (
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
                  <span className="flex items-center gap-1 font-mono text-[10px] text-[#a1a1aa]"><Clock className="w-3 h-3" />{p.readTime}</span>
                </div>
                <h3 className="mt-4 font-display font-semibold text-white text-base leading-snug">{p.title}</h3>
                <p className="mt-2 text-[13px] text-[#a1a1aa] leading-relaxed">{p.excerpt}</p>
              </Link>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-10 text-center text-sm text-[#a1a1aa]">No articles in this category yet.</p>
        )}

        {totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-2" data-testid="blog-pagination">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              data-testid="blog-page-prev"
              className="w-9 h-9 flex items-center justify-center rounded-full border border-white/10 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/5 transition-colors"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setPage(n)}
                data-testid={`blog-page-${n}`}
                className={`w-9 h-9 flex items-center justify-center rounded-full font-mono text-xs transition-colors ${
                  n === page ? "bg-[#7c3aed] text-white" : "border border-white/10 text-[#a1a1aa] hover:bg-white/5 hover:text-white"
                }`}
              >
                {n}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              data-testid="blog-page-next"
              className="w-9 h-9 flex items-center justify-center rounded-full border border-white/10 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/5 transition-colors"
              aria-label="Next page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </PageShell>
  );
}
