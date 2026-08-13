import React from "react";
import { motion } from "framer-motion";
import { FileUp, Receipt, Package, Timer, Share2, Sparkles } from "lucide-react";

const items = [
  {
    icon: FileUp,
    color: "#f58c14",
    title: "Menu Import",
    body: "Upload your existing menu, PDF, spreadsheet or photo, and NUA builds every dish, price and category automatically. No manual data entry to get started.",
  },
  {
    icon: Receipt,
    color: "#8b5cf6",
    title: "Invoice Import",
    body: "Upload a supplier invoice and NUA reads it directly, updating stock and recipe costs without re-typing a single line.",
  },
  {
    icon: Package,
    color: "#22c55e",
    title: "Pantry List",
    body: "A live, at-a-glance list of everything in stock, running low, or out, organised the way your kitchen actually thinks about ingredients.",
  },
  {
    icon: Timer,
    color: "#ec4899",
    title: "Kitchen Timer",
    body: "Set and track prep and cook timers straight from the kitchen display. No separate phone timer, no guessing how long something's been on.",
  },
  {
    icon: Share2,
    color: "#f58c14",
    title: "Social Media",
    body: "Turn menu items, specials and promotions into ready-to-post social content, keeping your feed active without extra work.",
  },
];

export default function NewFeatures() {
  return (
    <section id="new-features" data-testid="new-features-section" className="relative py-24 lg:py-32 bg-nua-bg overflow-hidden">
      <div className="absolute inset-0 bg-grid-dark opacity-25 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#f58c14]/40 bg-[#f58c14]/10">
            <Sparkles className="w-3 h-3 text-[#f58c14]" />
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#fbbf24]">And More</span>
          </div>
          <h2 className="font-display mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.02]">
            New on the platform.
          </h2>
          <p className="mt-5 text-[#a1a1aa]">
            Five recent additions built directly from what operators asked for.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {items.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              data-testid={`new-feature-${f.title.toLowerCase().replace(/\s+/g, "-")}`}
              className="relative rounded-2xl bg-[#15151d] border border-white/5 p-5 hover:-translate-y-1 hover:border-white/10 transition-all duration-300"
            >
              <span
                className="absolute top-4 right-4 px-2 py-0.5 rounded-full font-mono text-[9px] uppercase tracking-wider"
                style={{ background: `${f.color}20`, color: f.color }}
              >
                New
              </span>
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/10"
                style={{ background: `linear-gradient(135deg, ${f.color}30, ${f.color}05)` }}
              >
                <f.icon className="w-5 h-5" style={{ color: f.color }} />
              </div>
              <h3 className="mt-4 font-display font-semibold text-white text-sm">{f.title}</h3>
              <p className="mt-2 text-[13px] text-[#a1a1aa] leading-relaxed">{f.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
