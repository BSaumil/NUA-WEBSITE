import React from "react";
import { motion } from "framer-motion";
import { Gift, Sparkles, Star, ArrowRight, Trophy, Repeat, Wallet, QrCode, RotateCcw, CheckCircle2 } from "lucide-react";

const tiers = [
  { name: "Bronze", from: "0 pts", color: "#a16207", glow: "#a16207" },
  { name: "Silver", from: "500 pts", color: "#94a3b8", glow: "#94a3b8" },
  { name: "Gold", from: "2,000 pts", color: "#facc15", glow: "#facc15" },
  { name: "Black", from: "10,000 pts", color: "#ec4899", glow: "#ec4899" },
];

const earnExamples = [19, 42, 100];

const reorderSteps = [
  { icon: QrCode, label: "Scan your wallet pass", body: "At the counter, or on the online ordering page" },
  { icon: RotateCcw, label: "Your usual order is recalled", body: "NUA remembers what you ordered last time" },
  { icon: CheckCircle2, label: "Confirm & pay", body: "One tap and it's on its way" },
];

export default function Loyalty() {
  return (
    <section id="loyalty" data-testid="loyalty-section" className="relative py-24 lg:py-32 bg-nua-bg overflow-hidden">
      <div className="absolute inset-0 bg-grid-dark opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-[#ec4899]/15 blur-[160px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left */}
          <div>
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#ec4899]">— Loyalty & revenue engine</span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-display mt-3 text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.02]"
            >
              Turn every customer
              <br />
              into a <span className="text-[#ec4899]">repeat guest.</span>
            </motion.h2>
            <p className="mt-5 text-[#a1a1aa] leading-relaxed max-w-md">
              Points, multipliers, tiers, gift cards, referrals — wired into POS, app, and NUA&apos;s marketing brain. Every dollar feeds the next visit.
            </p>

            <div className="mt-8 space-y-3">
              {[
                { icon: Star, text: "Points earning + category multipliers" },
                { icon: Gift, text: "Redeem instantly at checkout" },
                { icon: Trophy, text: "Membership tiers + perks ladder" },
                { icon: Repeat, text: "Referral rewards + winback flows" },
              ].map((f, i) => (
                <motion.div
                  key={f.text}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#ec4899]/15 flex items-center justify-center">
                    <f.icon className="w-4 h-4 text-[#ec4899]" />
                  </div>
                  <span className="text-sm text-white">{f.text}</span>
                </motion.div>
              ))}
            </div>

            <a
              href="#pricing"
              data-testid="loyalty-cta"
              className="mt-8 inline-flex items-center gap-2 text-sm text-[#ec4899] hover:text-white transition-colors group"
            >
              See loyalty in action
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          {/* Right — Loyalty card */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative mx-auto max-w-md"
            >
              {/* Premium card */}
              <div className="relative rounded-2xl overflow-hidden p-6 bg-gradient-to-br from-[#1c1c26] via-[#15151d] to-[#0b0b0f] border border-[#ec4899]/30 glow-pink">
                <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-[#ec4899]/30 blur-3xl" />
                <div className="flex items-start justify-between relative">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-[#fbcfe8]">NUA Loyalty · Black tier</div>
                    <div className="font-display text-2xl font-bold text-white mt-1">Anaïs Laurent</div>
                  </div>
                  <Sparkles className="w-6 h-6 text-[#ec4899]" />
                </div>

                <div className="mt-6 flex items-baseline gap-2">
                  <span className="font-display text-5xl font-bold text-white">12,840</span>
                  <span className="font-mono text-xs text-[#fbcfe8]">points</span>
                </div>
                <div className="mt-1 font-mono text-[11px] text-[#a1a1aa]">+1,240 this month · 12th visit</div>

                <div className="mt-5">
                  <div className="flex justify-between text-[10px] font-mono text-[#a1a1aa] mb-1.5">
                    <span>Black tier · 12,840 / 15,000</span>
                    <span>+2,160 to next reward</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: "86%", background: "linear-gradient(90deg, #f58c14, #ec4899, #8b5cf6)" }} />
                  </div>
                </div>

                {/* Recent reward */}
                <div className="mt-5 p-3 rounded-xl bg-white/[0.04] border border-white/5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white">Spend $100 → Earn 100 pts</span>
                    <span className="font-mono text-[10px] text-emerald-400">Active</span>
                  </div>
                  <div className="mt-2 flex items-center gap-1.5">
                    {tiers.map((t) => (
                      <div key={t.name} className="flex-1 text-center">
                        <div className="h-1 rounded-full" style={{ background: t.color, opacity: t.name === "Black" ? 1 : 0.5 }} />
                        <div className="font-mono text-[9px] mt-1.5" style={{ color: t.color }}>{t.name}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating perk chip */}
              <div className="absolute -bottom-6 -left-6 rounded-xl px-4 py-3 bg-[#15151d] border border-[#ec4899]/30 glow-pink animate-float">
                <div className="font-mono text-[10px] uppercase tracking-wider text-[#fbcfe8]">Unlocked</div>
                <div className="font-display text-sm text-white">Free dessert tonight 🎉</div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Wallet & instant reorder */}
        <div className="mt-24 lg:mt-28">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#ec4899]">— NUA Wallet</span>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-display mt-3 text-3xl sm:text-4xl font-bold text-white tracking-tight leading-[1.05]"
            >
              Spend. Earn. Scan. Reorder.
            </motion.h3>
            <p className="mt-4 text-[#a1a1aa] leading-relaxed">
              Every purchase earns points automatically, stored in a wallet pass guests already carry — no app to download, no card to lose.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-5">
            {/* Points math example */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              data-testid="loyalty-points-math"
              className="rounded-2xl bg-[#15151d] border border-white/5 p-6"
            >
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#a1a1aa]">How points are earned</span>
              <div className="mt-4 space-y-2.5">
                {earnExamples.map((amount) => (
                  <div key={amount} className="flex items-center justify-between rounded-xl bg-white/[0.03] border border-white/5 px-4 py-3">
                    <span className="font-display text-lg font-bold text-white">${amount}</span>
                    <ArrowRight className="w-4 h-4 text-[#71717a] flex-shrink-0" />
                    <span className="font-display text-lg font-bold text-[#ec4899]">+{amount} pts</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 font-mono text-[11px] text-[#a1a1aa] leading-relaxed">
                $1 spent = 1 point. Credited the instant the bill closes — no waiting, no app required.
              </div>
            </motion.div>

            {/* Wallet passes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08 }}
              data-testid="loyalty-wallet-passes"
              className="rounded-2xl bg-[#15151d] border border-white/5 p-6"
            >
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#a1a1aa]">Carry it in your pocket</span>
              <div className="mt-4 space-y-3">
                {/* Apple Wallet pass */}
                <div className="rounded-xl bg-gradient-to-br from-[#1c1c26] to-black border border-white/10 p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-[#a1a1aa]">Apple Wallet</span>
                    <Wallet className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div className="mt-2 font-display text-xl font-bold text-white">12,840 pts</div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-mono text-[9px] text-[#a1a1aa]">Anaïs Laurent · Black tier</span>
                    <QrCode className="w-6 h-6 text-white/80" />
                  </div>
                </div>
                {/* Google Wallet pass */}
                <div className="rounded-xl bg-white border border-black/10 p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-[#666670]">Google Wallet</span>
                    <Wallet className="w-3.5 h-3.5 text-[#0f0f14]" />
                  </div>
                  <div className="mt-2 font-display text-xl font-bold text-[#0f0f14]">12,840 pts</div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-mono text-[9px] text-[#666670]">Anaïs Laurent · Black tier</span>
                    <QrCode className="w-6 h-6 text-[#0f0f14]/70" />
                  </div>
                </div>
              </div>
              <div className="mt-4 font-mono text-[11px] text-[#a1a1aa] leading-relaxed">
                Added in one tap from any receipt or confirmation email — balance updates itself, everywhere.
              </div>
            </motion.div>

            {/* Scan to reorder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.16 }}
              data-testid="loyalty-scan-reorder"
              className="rounded-2xl bg-[#15151d] border border-white/5 p-6"
            >
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#a1a1aa]">Scan to reorder</span>
              <div className="mt-4 space-y-3.5">
                {reorderSteps.map((s) => (
                  <div key={s.label} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#ec4899]/15 flex items-center justify-center flex-shrink-0">
                      <s.icon className="w-4 h-4 text-[#ec4899]" />
                    </div>
                    <div>
                      <div className="text-sm text-white font-medium leading-tight">{s.label}</div>
                      <div className="text-[11px] text-[#a1a1aa] mt-0.5 leading-relaxed">{s.body}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-white/5 font-mono text-[11px] text-[#a1a1aa] leading-relaxed">
                Works the same in-venue at the POS and for online ordering — scan once, reorder instantly.
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
