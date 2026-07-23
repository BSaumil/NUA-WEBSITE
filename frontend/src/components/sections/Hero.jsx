import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play, Sparkles, TrendingUp, Users, DollarSign, Clock, Zap, Mic } from "lucide-react";
import { useModals } from "@/components/ModalProvider";

const StatPill = ({ icon: Icon, label, value, color }) => (
  <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/5">
    <div className={`w-7 h-7 rounded-md flex items-center justify-center ${color}`}>
      <Icon className="w-3.5 h-3.5 text-white" />
    </div>
    <div>
      <div className="font-mono text-[10px] text-[#a1a1aa] uppercase tracking-wider">{label}</div>
      <div className="font-display font-semibold text-sm text-white">{value}</div>
    </div>
  </div>
);

export default function Hero() {
  const { openLead, openVideo } = useModals();
  return (
    <section id="hero" data-testid="hero-section" className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden bg-hero-radial">
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid-dark opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div className="absolute inset-0 bg-noise opacity-[0.05] mix-blend-overlay pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f58c14] animate-pulse-dot" />
            <span className="font-mono text-[11px] text-[#a1a1aa] tracking-widest uppercase">Introducing NUA — Your AI Restaurant Manager</span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-center mt-6 text-5xl sm:text-6xl lg:text-7xl xl:text-[88px] leading-[0.95] font-bold text-white tracking-tight"
        >
          AI-Powered Operating
          <br />
          System for Modern{" "}
          <span className="relative inline-block">
            <span className="text-shimmer">Hospitality</span>
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-7 max-w-2xl mx-auto text-center text-base sm:text-lg text-[#a1a1aa] leading-relaxed"
        >
          POS, Reservations, Loyalty, Inventory, Staff, Marketing, and an autonomous AI agent — unified into one intelligent platform.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <button
            type="button"
            onClick={() => openLead({ type: "demo" })}
            data-testid="hero-book-demo-btn"
            className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#f58c14] hover:bg-[#d87b10] text-white font-medium text-sm shadow-xl shadow-[#f58c14]/25 transition-all duration-200 hover:-translate-y-0.5"
          >
            Book a Demo
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </button>
          <button
            type="button"
            onClick={openVideo}
            data-testid="hero-watch-tour-btn"
            className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium text-sm backdrop-blur-sm transition-all duration-200"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            Watch Product Tour
          </button>
        </motion.div>

        {/* Mock dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="relative mt-20"
        >
          {/* Ambient glow */}
          <div className="absolute -inset-x-10 -inset-y-10 -z-10">
            <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-[#8b5cf6]/30 blur-[120px]" />
            <div className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full bg-[#f58c14]/25 blur-[120px]" />
            <div className="absolute bottom-0 left-1/2 w-64 h-64 rounded-full bg-[#ec4899]/15 blur-[120px]" />
          </div>

          <div className="relative rounded-2xl border border-white/10 bg-[#0f0f17]/80 backdrop-blur-xl shadow-2xl overflow-hidden">
            {/* Top bar */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/5 bg-white/[0.02]">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-white/15" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/15" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/15" />
                </div>
                <span className="ml-3 font-mono text-[11px] text-[#a1a1aa]">nua.app / command-center</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-[#a1a1aa] uppercase">live</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-dot" />
              </div>
            </div>

            {/* Body */}
            <div className="grid grid-cols-12 gap-3 p-4 sm:p-5">
              {/* Sidebar */}
              <div className="hidden md:flex col-span-2 flex-col gap-2">
                {["POS", "Reservations", "Kitchen", "Loyalty", "Inventory", "Staff", "NUA AI"].map((m, i) => (
                  <div
                    key={m}
                    className={`px-3 py-2 rounded-md text-xs font-medium ${
                      i === 6 ? "bg-[#8b5cf6]/15 text-[#c4b5fd] border border-[#8b5cf6]/30" : "text-[#a1a1aa] hover:bg-white/5"
                    }`}
                  >
                    {m}
                  </div>
                ))}
              </div>

              {/* Main */}
              <div className="col-span-12 md:col-span-10 grid grid-cols-1 sm:grid-cols-4 gap-3">
                <StatPill icon={DollarSign} label="Revenue" value="$32,418" color="bg-[#f58c14]" />
                <StatPill icon={Users} label="Covers" value="248" color="bg-[#8b5cf6]" />
                <StatPill icon={TrendingUp} label="AOV" value="$48.20" color="bg-[#ec4899]" />
                <StatPill icon={Clock} label="Avg. wait" value="6m 12s" color="bg-emerald-500/80" />

                {/* Chart card */}
                <div className="sm:col-span-3 rounded-xl bg-[#15151d] border border-white/5 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="font-mono text-[10px] text-[#a1a1aa] uppercase tracking-wider">Today vs last week</div>
                      <div className="font-display text-2xl font-semibold text-white">+18.4%</div>
                    </div>
                    <div className="font-mono text-[11px] text-emerald-400">▲ trending</div>
                  </div>
                  <div className="flex items-end gap-1.5 h-24">
                    {[35, 48, 32, 58, 44, 70, 62, 80, 55, 88, 72, 95].map((h, i) => (
                      <div key={i} className="flex-1 flex flex-col gap-0.5 justify-end">
                        <div
                          className="w-full rounded-sm"
                          style={{
                            height: `${h}%`,
                            background: `linear-gradient(180deg, #f58c14 0%, #ec4899 100%)`,
                            opacity: 0.85,
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* NUA card */}
                <div className="rounded-xl bg-gradient-to-br from-[#8b5cf6]/20 to-[#1c1c26] border border-[#8b5cf6]/30 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-md bg-[#8b5cf6] flex items-center justify-center">
                      <Sparkles className="w-3 h-3 text-white" />
                    </div>
                    <span className="font-display text-sm font-semibold text-white">NUA</span>
                    <span className="ml-auto font-mono text-[9px] text-[#a1a1aa]">THINKING</span>
                  </div>
                  <p className="font-mono text-[11px] leading-relaxed text-[#c4b5fd]">
                    Detected 3 VIPs arriving in 18m. Reassigning table 12 to bar lounge. Comp dessert ready.
                  </p>
                  <div className="mt-3 flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono">Auto-executed</span>
                  </div>
                </div>

                {/* Voice card */}
                <div className="sm:col-span-2 rounded-xl bg-[#15151d] border border-white/5 p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Mic className="w-3.5 h-3.5 text-[#f58c14]" />
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#a1a1aa]">Voice POS</span>
                  </div>
                  <div className="flex items-end gap-1 h-10">
                    {Array.from({ length: 28 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-1 rounded-full bar-wave bg-gradient-to-t from-[#f58c14] to-[#ec4899]"
                        style={{
                          height: `${20 + Math.abs(Math.sin(i * 0.6)) * 60 + ((i * 13) % 20)}%`,
                          animationDelay: `${i * 0.05}s`,
                        }}
                      />
                    ))}
                  </div>
                  <p className="mt-2 font-mono text-[11px] text-[#eaeaea]">{'"Add two cappuccinos to table 7"'}</p>
                </div>

                {/* Reservations */}
                <div className="sm:col-span-2 rounded-xl bg-[#15151d] border border-white/5 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#a1a1aa]">Reservations</span>
                    <span className="font-mono text-[10px] text-emerald-400">36 / 42 tables</span>
                  </div>
                  <div className="grid grid-cols-7 gap-1.5">
                    {Array.from({ length: 21 }).map((_, i) => {
                      const tone = i % 5 === 0 ? "bg-[#ec4899]" : i % 3 === 0 ? "bg-[#8b5cf6]/70" : i % 7 === 0 ? "bg-white/10" : "bg-[#f58c14]/80";
                      return <div key={i} className={`aspect-square rounded-md ${tone}`} />;
                    })}
                  </div>
                </div>

                {/* Loyalty */}
                <div className="rounded-xl bg-gradient-to-br from-[#ec4899]/15 to-[#1c1c26] border border-[#ec4899]/25 p-4 flex flex-col justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5 text-[#ec4899]" />
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#fbcfe8]">Loyalty</span>
                  </div>
                  <div>
                    <div className="font-display text-2xl font-bold text-white">8,412</div>
                    <div className="font-mono text-[10px] text-[#a1a1aa]">Members · +124 today</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Trust strip */}
        <div className="mt-16 text-center">
          <p className="font-mono text-[11px] uppercase tracking-widest text-[#a1a1aa]">Trusted by next-generation hospitality operators</p>
          <div className="mt-5 flex flex-wrap justify-center items-center gap-x-10 gap-y-4 text-[#a1a1aa]">
            {["Lumière", "Saltgrass", "Hojo & Co", "Maru Bistro", "North Common", "Oaklane", "Rivière"].map((b) => (
              <span key={b} className="font-display text-lg sm:text-xl font-semibold tracking-tight opacity-60 hover:opacity-100 transition-opacity">
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
