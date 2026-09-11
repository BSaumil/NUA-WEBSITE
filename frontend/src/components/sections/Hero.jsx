import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles, TrendingUp, Users, DollarSign, Clock, Zap, Mic } from "lucide-react";
import LiveNumber from "@/components/graphics/LiveNumber";
import RotatingTrade from "@/components/graphics/RotatingTrade";
import LeadCta from "@/components/LeadCta";
import { LEAD_CAPTURE_ENABLED } from "@/config/siteConfig";

const barHeights = [35, 48, 32, 58, 44, 70, 62, 80, 55, 88, 72, 95];

const trustedBy = [
  "Lumière", "Saltgrass", "Hojo & Co", "Maru Bistro", "North Common", "Oaklane", "Rivière",
  "Elfresco Cafe", "Cafe NUA", "Alphington Social",
];

const StatPill = ({ icon: Icon, label, value, color }) => (
  <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-nua-bgAlt border border-nua-border">
    <div className={`w-7 h-7 rounded-md flex items-center justify-center ${color}`}>
      <Icon className="w-3.5 h-3.5 text-white" />
    </div>
    <div>
      <div className="font-mono text-[10px] text-nua-ink2 uppercase tracking-wider">{label}</div>
      <div className="font-display font-semibold text-sm text-nua-ink">{value}</div>
    </div>
  </div>
);

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
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
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-nua-border bg-nua-bgAlt backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-nua-burgundy animate-pulse-dot" />
            <span className="font-mono text-[11px] text-nua-ink2 tracking-widest uppercase">One system for hospitality, retail and services</span>
          </div>
        </motion.div>

        {/*
          Headline is deliberately NOT animated on mount. It is the page's
          Largest Contentful Paint element and the build prerenders it into
          the HTML, so a mount animation would hide the already-painted text
          and re-reveal it — measured at ~0.8s of pure LCP delay. The eyebrow,
          subheadline and CTA still animate in around it, so the hero keeps
          its choreography while the headline lands instantly.
        */}
        <h1 className="font-display text-center mt-6 text-5xl sm:text-6xl lg:text-7xl xl:text-[88px] leading-[0.95] font-bold text-nua-ink tracking-tight">
          AI-Powered Operating
          <br />
          System for Modern{" "}
          <RotatingTrade />
        </h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-7 max-w-2xl mx-auto text-center text-base sm:text-lg text-nua-ink2 leading-relaxed"
        >
          Point of sale, bookings, stock, staff, loyalty and marketing in one platform, with NUA Agent handling the admin between them.
        </motion.p>

        {/* CTAs */}
        {LEAD_CAPTURE_ENABLED && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <LeadCta
              type="demo"
              label="Book a Demo"
              icon={ArrowRight}
              iconClassName="w-4 h-4 transition-transform group-hover:translate-x-0.5"
              testId="hero-book-demo-btn"
              className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-nua-burgundy hover:bg-nua-burgundyDark text-white font-medium text-sm shadow-xl shadow-nua-burgundy/25 transition-all duration-200 hover:-translate-y-0.5"
            />
          </motion.div>
        )}

        {/* Mock dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="relative mt-20"
        >
          {/* Ambient glow */}
          <div className="absolute -inset-x-10 -inset-y-10 -z-10">
            <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-nua-burgundy/[0.05] blur-[120px]" />
            <div className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full bg-nua-burgundy/[0.05] blur-[120px]" />
            <div className="absolute bottom-0 left-1/2 w-64 h-64 rounded-full bg-nua-burgundyWash blur-[120px]" />
          </div>

          {/* The shell has to match its own contents. Everything inside this
              panel is on the light system, so a near-black shell left the
              sidebar column and every gutter as a dark strip running through
              an otherwise ivory mockup. */}
          <div className="relative rounded-2xl border border-nua-border bg-nua-surface shadow-[0_30px_80px_-20px_rgba(41,36,30,0.18)] overflow-hidden">
            {/* Top bar */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-nua-border bg-nua-bgAlt">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-nua-borderStrong" />
                  <div className="w-2.5 h-2.5 rounded-full bg-nua-borderStrong" />
                  <div className="w-2.5 h-2.5 rounded-full bg-nua-borderStrong" />
                </div>
                <span className="ml-3 font-mono text-[11px] text-nua-ink2">nua.app / command-center</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-nua-ink2 uppercase">live</span>
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
                      i === 6 ? "bg-nua-burgundyWash text-nua-burgundy border border-nua-burgundy/20" : "text-nua-ink2 hover:bg-nua-bgAlt"
                    }`}
                  >
                    {m}
                  </div>
                ))}
              </div>

              {/* Main */}
              <div className="col-span-12 md:col-span-10 grid grid-cols-1 sm:grid-cols-4 gap-3">
                <StatPill icon={DollarSign} label="Revenue" value={<LiveNumber value={32418} prefix="$" />} color="bg-nua-burgundy" />
                <StatPill icon={Users} label="Covers" value={<LiveNumber value={248} />} color="bg-nua-burgundy" />
                <StatPill icon={TrendingUp} label="AOV" value={<LiveNumber value={48.2} prefix="$" decimals={2} />} color="bg-nua-burgundy" />
                <StatPill icon={Clock} label="Avg. wait" value="6m 12s" color="bg-nua-burgundy" />

                {/* Chart card */}
                <div className="sm:col-span-3 rounded-xl bg-nua-surface border border-nua-border p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="font-mono text-[10px] text-nua-ink2 uppercase tracking-wider">Today vs last week</div>
                      <div className="font-display text-2xl font-semibold text-nua-ink"><LiveNumber value={18.4} suffix="%" decimals={1} prefix="+" /></div>
                    </div>
                    <div className="font-mono text-[11px] text-nua-burgundy">▲ trending</div>
                  </div>
                  <div className="flex items-end gap-1.5 h-24">
                    {barHeights.map((h, i) => (
                      <div key={i} className="flex-1 flex flex-col gap-0.5 justify-end h-full">
                        <motion.div
                          className="w-full rounded-sm"
                          style={{
                            background: `linear-gradient(180deg, #8A1433 0%, #750D28 100%)`,
                            opacity: 0.85,
                            transformOrigin: "bottom",
                          }}
                          initial={{ scaleY: 0, height: `${h}%` }}
                          animate={{ scaleY: 1 }}
                          transition={{ duration: 0.6, delay: 0.6 + i * 0.05, ease: "easeOut" }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* NUA card */}
                <div className="rounded-xl bg-nua-bgAlt border border-nua-border p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-md bg-nua-burgundy flex items-center justify-center">
                      <Sparkles className="w-3 h-3 text-white" />
                    </div>
                    <span className="font-display text-sm font-semibold text-nua-ink">NUA</span>
                    <span className="ml-auto font-mono text-[9px] text-nua-ink2">THINKING</span>
                  </div>
                  <p className="font-mono text-[11px] leading-relaxed text-nua-burgundy">
                    Detected 3 VIPs arriving in 18m. Reassigning table 12 to bar lounge. Comp dessert ready.
                  </p>
                  <div className="mt-3 flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-nua-burgundy text-[10px] font-mono">Auto-executed</span>
                  </div>
                </div>

                {/* Voice card */}
                <div className="sm:col-span-2 rounded-xl bg-nua-surface border border-nua-border p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Mic className="w-3.5 h-3.5 text-nua-burgundy" />
                    <span className="font-mono text-[10px] uppercase tracking-wider text-nua-ink2">Voice POS</span>
                  </div>
                  <div className="flex items-end gap-1 h-10">
                    {Array.from({ length: 28 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-1 rounded-full bar-wave bg-nua-burgundy/70"
                        style={{
                          height: `${20 + Math.abs(Math.sin(i * 0.6)) * 60 + ((i * 13) % 20)}%`,
                          animationDelay: `${i * 0.05}s`,
                        }}
                      />
                    ))}
                  </div>
                  <p className="mt-2 font-mono text-[11px] text-nua-ink">{'"Add two cappuccinos to table 7"'}</p>
                </div>

                {/* Reservations */}
                <div className="sm:col-span-2 rounded-xl bg-nua-surface border border-nua-border p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-nua-ink2">Reservations</span>
                    <span className="font-mono text-[10px] text-nua-burgundy">36 / 42 tables</span>
                  </div>
                  <div className="grid grid-cols-7 gap-1.5">
                    {Array.from({ length: 21 }).map((_, i) => {
                      const tone = i % 5 === 0 ? "bg-nua-burgundy" : i % 3 === 0 ? "bg-nua-burgundy/55" : i % 7 === 0 ? "bg-nua-border" : "bg-nua-burgundy/30";
                      return <div key={i} className={`aspect-square rounded-md ${tone}`} />;
                    })}
                  </div>
                </div>

                {/* Loyalty */}
                <div className="rounded-xl bg-nua-bgAlt border border-nua-border p-4 flex flex-col justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5 text-nua-burgundy" />
                    <span className="font-mono text-[10px] uppercase tracking-wider text-nua-burgundy">Loyalty</span>
                  </div>
                  <div>
                    <div className="font-display text-2xl font-bold text-nua-ink">8,412</div>
                    <div className="font-mono text-[10px] text-nua-ink2">Members · +124 today</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Trust strip */}
        <div className="mt-16 text-center">
          <p className="font-mono text-[11px] uppercase tracking-widest text-nua-ink2">Illustrative of the businesses NUA is built for*</p>
          <div className="mt-5 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
            <motion.div
              className="flex items-center gap-14 w-max"
              animate={prefersReducedMotion ? undefined : { x: ["0%", "-50%"] }}
              transition={{ duration: 40, ease: "linear", repeat: Infinity }}
            >
              <div className="flex items-center gap-14 flex-shrink-0" role="list">
                {trustedBy.map((b) => (
                  <span
                    key={b}
                    role="listitem"
                    className="flex-shrink-0 font-display text-lg sm:text-xl font-semibold tracking-tight text-nua-ink2 opacity-60 hover:opacity-100 transition-opacity"
                  >
                    {b}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-14 flex-shrink-0" aria-hidden="true">
                {trustedBy.map((b, i) => (
                  <span
                    key={`${b}-${i}`}
                    className="flex-shrink-0 font-display text-lg sm:text-xl font-semibold tracking-tight text-nua-ink2 opacity-60 hover:opacity-100 transition-opacity"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
          <p className="mt-3 font-mono text-[10px] text-nua-ink2">*Illustrative business names for evaluation purposes, not customers.</p>
        </div>
      </div>
    </section>
  );
}
