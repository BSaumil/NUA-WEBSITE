import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import docsData from "@/data/docsData";

/**
 * Sell / Serve / Operate / Grow / Know — §11's five operating worlds.
 *
 * The homepage listed eighteen modules as eighteen things. This groups them by
 * the job they do, which is how an operator actually thinks about them: nobody
 * arrives wanting "Dynamic Pricing Intelligence", they arrive wanting to sell
 * better.
 *
 * Every module appears exactly once. That is enforced by
 * scripts/check-module-coverage.js at build time, not here: the same check
 * written as a NODE_ENV guard inside this file was stripped from every real
 * build and caught nothing.
 *
 * Names, colours and icons come from docsData, so this cannot drift from the
 * documentation the chips link to. Only the grouping lives here.
 */
const worlds = [
  {
    name: "Sell",
    line: "Take the money, on any counter, in any channel.",
    slugs: ["pos", "voice", "bill-split", "dynamic-pricing", "upsell-nudges"],
  },
  {
    name: "Serve",
    line: "Get the order to the people making it, in the right order.",
    slugs: ["kds", "reservations"],
  },
  {
    name: "Operate",
    line: "Stock, staff and compliance, tracked as the day happens.",
    slugs: ["inventory", "staff", "compliance", "loss-prevention", "franchise-mode"],
  },
  {
    name: "Grow",
    line: "Turn a first visit into a second one.",
    slugs: ["loyalty", "auto-specials", "surplus-exchange"],
  },
  {
    name: "Know",
    line: "See what happened, what is coming, and what to do about it.",
    slugs: ["analytics", "benchmarking", "nua"],
  },
];

export default function OperatingWorlds() {
  return (
    <section
      id="operating-worlds"
      data-testid="operating-worlds-section"
      className="relative py-20 lg:py-28 bg-nua-bg"
    >
      <div className="absolute inset-0 bg-grid-dark opacity-20 [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_70%)]" />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-10">
        <div className="max-w-2xl">
          <span className="font-mono text-[11px] uppercase tracking-widest text-[#a1a1aa]">
            One system, everything connected
          </span>
          <h2 className="font-display mt-3 text-3xl sm:text-4xl font-bold text-white tracking-tight leading-[1.05]">
            Eighteen modules,
            <br />
            <span className="text-[#666670]">five jobs to do.</span>
          </h2>
          <p className="mt-4 text-[#a1a1aa] leading-relaxed">
            Nobody arrives wanting a rostering module. They arrive wanting the right
            people on tonight. Every module below is one login, one bill and one set of
            numbers.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {worlds.map((world, i) => {
            const modules = world.slugs
              .map((s) => docsData.find((d) => d.slug === s))
              .filter(Boolean);

            return (
              <motion.div
                key={world.name}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                data-testid={`operating-world-${world.name.toLowerCase()}`}
                className="rounded-2xl bg-[#15151d] border border-white/5 p-6 flex flex-col"
              >
                <h3 className="font-display text-xl font-bold text-white tracking-tight">
                  {world.name}
                </h3>
                <p className="mt-1.5 text-[13px] text-[#a1a1aa] leading-relaxed">
                  {world.line}
                </p>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {modules.map((m) => (
                    <li key={m.slug}>
                      <Link
                        to={`/docs/${m.slug}`}
                        className="group inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[12px] text-[#eaeaea] transition-colors hover:text-white"
                        style={{ borderColor: `${m.color}30`, background: `${m.color}12` }}
                      >
                        <m.icon className="w-3 h-3 flex-shrink-0" style={{ color: m.color }} />
                        {m.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}

          {/* Sixth cell rather than a gap: the grid is 3-up on large screens and
              five cards leave a hole. This fills it with the one thing the five
              worlds have in common. */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: worlds.length * 0.06 }}
            className="rounded-2xl border border-[#f58c14]/25 bg-gradient-to-br from-[#f58c14]/[0.12] to-[#15151d] p-6 flex flex-col justify-between"
          >
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#f58c14]">
                One platform
              </span>
              <p className="mt-3 text-white leading-relaxed">
                Every module reads the same data. A sale moves stock, updates the
                customer and lands in the accounts without anyone re-entering it.
              </p>
            </div>
            <Link
              to="/platform"
              data-testid="operating-worlds-platform-link"
              className="group mt-6 inline-flex items-center gap-1.5 text-[13px] font-medium text-[#f58c14]"
            >
              How the platform fits together
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
