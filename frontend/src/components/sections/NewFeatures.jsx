import React from "react";
import { motion } from "framer-motion";
import { FileUp, Receipt, Package, Timer, Share2, Sparkles } from "lucide-react";

const items = [
  {
    icon: FileUp,
    color: "#A45D0D",
    title: "Menu Import",
    body: "Upload your existing menu, PDF, spreadsheet or photo, and NUA builds every dish, price and category automatically. No manual data entry to get started.",
  },
  {
    icon: Receipt,
    color: "#7D52DD",
    title: "Invoice Import",
    body: "Upload a supplier invoice and NUA reads it directly, updating stock and recipe costs without re-typing a single line.",
  },
  {
    icon: Package,
    color: "#157E3C",
    title: "Pantry List",
    body: "A live, at-a-glance list of everything in stock, running low, or out, organised the way your kitchen actually thinks about ingredients.",
  },
  {
    icon: Timer,
    color: "#BF3A7B",
    title: "Kitchen Timer",
    body: "Set and track prep and cook timers straight from the kitchen display. No separate phone timer, no guessing how long something's been on.",
  },
  {
    icon: Share2,
    color: "#A45D0D",
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
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-nua-burgundy/40 bg-nua-burgundyWash">
            <Sparkles className="w-3 h-3 text-nua-burgundy" />
            <span className="font-mono text-[11px] uppercase tracking-widest text-nua-burgundy">And More</span>
          </div>
          <h2 className="font-display mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold text-nua-ink tracking-tight leading-[1.02]">
            New on the platform.
          </h2>
          <p className="mt-5 text-nua-ink2">
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
              className="relative rounded-2xl bg-nua-surface border border-nua-border p-5 hover:-translate-y-1 hover:border-nua-border transition-all duration-300"
            >
              <span
                className="absolute top-4 right-4 px-2 py-0.5 rounded-full font-mono text-[9px] uppercase tracking-wider"
                style={{ background: '#750D280D', color: '#750D28' }}
              >
                New
              </span>
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center border border-nua-border"
                style={{ background: `linear-gradient(135deg, ${f.color}30, ${f.color}05)` }}
              >
                <f.icon className="w-5 h-5 text-nua-burgundy"  />
              </div>
              <h3 className="mt-4 font-display font-semibold text-nua-ink text-sm">{f.title}</h3>
              <p className="mt-2 text-[13px] text-nua-ink2 leading-relaxed">{f.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
