import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export default function PageHero({ eyebrow, title, subtitle, accent = "#f58c14", crumb }) {
  return (
    <section data-testid="page-hero" className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 overflow-hidden bg-hero-radial">
      <div className="absolute inset-0 bg-grid-dark opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />
      <div className="relative max-w-5xl mx-auto px-6 lg:px-10 text-center">
        {crumb && (
          <div className="flex items-center justify-center gap-1.5 mb-5 font-mono text-[11px] text-[#a1a1aa]">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#a1a1aa]">{crumb}</span>
          </div>
        )}
        <span className="font-mono text-[11px] uppercase tracking-widest" style={{ color: accent }}>{eyebrow}</span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-display mt-3 text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.02]"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <p className="mt-5 max-w-2xl mx-auto text-[#a1a1aa] leading-relaxed">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
