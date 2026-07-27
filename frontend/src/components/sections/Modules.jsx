import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Calculator, CalendarRange, ChefHat, Gift, Boxes, Users,
  BrainCircuit, BarChart3, Megaphone, Mic, ArrowUpRight, ArrowRight
} from "lucide-react";

const MotionLink = motion(Link);

const modules = [
  { id: "pos", icon: Calculator, title: "Point of Sale", desc: "Lightning-fast checkout that works offline. iOS, Android, kiosks.", color: "#f58c14", span: "md:col-span-2" },
  { id: "reservations", icon: CalendarRange, title: "Reservations", desc: "Table management, waitlist & booking portal in one flow.", color: "#8b5cf6", span: "md:col-span-1" },
  { id: "kds", icon: ChefHat, title: "Kitchen Display", desc: "Smart routing across stations with live ticket aging.", color: "#ec4899", span: "md:col-span-1" },
  { id: "loyalty", icon: Gift, title: "Loyalty Engine", desc: "Points, tiers, multipliers, gift cards & referrals.", color: "#ec4899", span: "md:col-span-2" },
  { id: "inventory", icon: Boxes, title: "Inventory & Purchasing", desc: "Smart Pantry AI, recipe costing, auto purchase orders.", color: "#8b5cf6", span: "md:col-span-2" },
  { id: "staff", icon: Users, title: "Staff Management", desc: "AI rostering, shift swaps, payroll & tip distribution.", color: "#f58c14", span: "md:col-span-1" },
  { id: "nua", icon: BrainCircuit, title: "AI Command Center", desc: "NUA runs ops autonomously — review, approve, automate.", color: "#8b5cf6", span: "md:col-span-1" },
  { id: "analytics", icon: BarChart3, title: "Analytics Dashboard", desc: "Menu engineering, retention, profit & forecasting.", color: "#f58c14", span: "md:col-span-2" },
  { id: "marketing", icon: Megaphone, title: "Marketing Automation", desc: "Segmented campaigns triggered by guest behaviour.", color: "#ec4899", span: "md:col-span-1" },
  { id: "voice", icon: Mic, title: "Voice POS", desc: "Run your venue by voice — orders, discounts, reports.", color: "#f58c14", span: "md:col-span-1" },
];

export default function Modules() {
  return (
    <section id="modules" data-testid="modules-section" className="relative py-24 lg:py-32 bg-nua-bg">
      <div className="absolute inset-0 bg-grid-dark opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <span className="font-mono text-[11px] uppercase tracking-widest text-[#f58c14]">— The Platform</span>
          <h2 className="font-display mt-3 text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.05] tracking-tight">
            All-in-one,
            <br />
            <span className="text-[#a1a1aa]">not duct-taped together.</span>
          </h2>
          <p className="mt-5 text-[#a1a1aa] max-w-xl">
            Ten modules. One intelligence layer. NUA replaces a tangled stack of POS, CRM, and ops tools with a single coherent system.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 auto-rows-[200px] gap-4">
          {modules.map((m, i) => {
            const Icon = m.icon;
            return (
              <MotionLink
                key={m.title}
                to={`/features#${m.id}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
                data-testid={`module-${m.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-card`}
                className={`group relative block ${m.span} rounded-2xl bg-[#15151d] border border-white/5 p-6 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-white/10`}
                style={{ boxShadow: "0 1px 0 0 rgba(255,255,255,0.02) inset" }}
              >
                <div
                  className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(400px circle at 50% 0%, ${m.color}30, transparent 70%)` }}
                />
                <div className="relative flex flex-col h-full">
                  <div className="flex items-start justify-between">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/10"
                      style={{ background: `linear-gradient(135deg, ${m.color}30, ${m.color}05)` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: m.color }} />
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[#a1a1aa] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="mt-auto">
                    <h3 className="font-display text-xl font-semibold text-white tracking-tight">{m.title}</h3>
                    <p className="mt-1.5 text-sm text-[#a1a1aa] leading-relaxed">{m.desc}</p>
                  </div>
                </div>
              </MotionLink>
            );
          })}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            to="/features"
            data-testid="modules-see-how-it-works-link"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/10 text-white text-sm font-medium hover:bg-white/5 transition-colors"
          >
            See how every feature works, graphically
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
