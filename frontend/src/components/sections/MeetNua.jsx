import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, CheckCircle2, Clock, Zap, ArrowRight } from "lucide-react";
import LiveNumber from "@/components/graphics/LiveNumber";

const initialFeed = [
  {
    id: "f1",
    time: "09:42:12",
    action: "VIP guest Sam B. re-detected (12th visit)",
    outcome: "Greeting note sent to front-of-house. Comp bubbles assigned.",
    status: "executed",
  },
  {
    id: "f2",
    time: "09:38:55",
    action: "Sea bass demand forecast +28% vs Friday baseline",
    outcome: "Bumped purchase qty to 14kg with Supplier A (-9% vs Supplier B).",
    status: "approved",
  },
  {
    id: "f3",
    time: "09:31:08",
    action: "Inventory anomaly: wagyu sirloin trending 2.3σ above usage",
    outcome: "Flagged for FOH manager. Suggested 86 menu item.",
    status: "suggested",
  },
  {
    id: "f4",
    time: "09:24:41",
    action: "Profit margin on Set Menu B dropped to 58% (target 65%)",
    outcome: "Repriced sides +$2. Notified ops. Margin restored.",
    status: "executed",
  },
  {
    id: "f5",
    time: "09:18:02",
    action: "Roster mismatch: Saturday brunch understaffed by 1.5 FTE",
    outcome: "Drafted shift swap with 2 candidates. Awaiting confirmation.",
    status: "suggested",
  },
];

const incomingPool = [
  { action: "Table 9 lingering 22min past predicted turn-time", outcome: "Nudged FOH to prep the table for the 7:45 walk-in.", status: "suggested" },
  { action: "Burrata usage trending 31% under forecast", outcome: "Suggested tonight's staff special to clear stock.", status: "approved" },
  { action: "Lapsed-guest segment crossed 400 members", outcome: "Winback campaign queued: 15% offer, sends at 4pm.", status: "executed" },
  { action: "Friday dinner forecast +18% vs last week", outcome: "Drafted an extra bar shift. Awaiting manager approval.", status: "suggested" },
  { action: "Olive oil bulk price rising 8% from Supplier B", outcome: "Locked in 4-week stock before the increase.", status: "executed" },
  { action: "New 5-star review flagged 'best tiramisu in town'", outcome: "Shared with kitchen team. Featured on tonight's specials board.", status: "approved" },
];

const statusStyles = {
  executed: { label: "Executed", bg: "bg-emerald-500/10", text: "text-emerald-700", dot: "bg-emerald-500" },
  approved: { label: "Approved", bg: "bg-[#8b5cf6]/10", text: "text-[#7c3aed]", dot: "bg-[#8b5cf6]" },
  suggested: { label: "Suggested", bg: "bg-[#f58c14]/10", text: "text-[#c66a00]", dot: "bg-[#f58c14]" },
};

const capabilities = [
  "VIP customer detection",
  "Demand forecasting",
  "Auto marketing campaigns",
  "Inventory anomaly detection",
  "AI rostering optimisation",
  "Profit margin monitoring",
  "Smart reorder suggestions",
];

function timeNowLabel() {
  const d = new Date();
  return d.toTimeString().slice(0, 8);
}

export default function MeetNua() {
  const [feed, setFeed] = useState(initialFeed);
  const [decisionCount, setDecisionCount] = useState(12348);
  const poolIndex = useRef(0);
  const nextId = useRef(initialFeed.length + 1);

  useEffect(() => {
    const id = setInterval(() => {
      const next = incomingPool[poolIndex.current % incomingPool.length];
      poolIndex.current += 1;
      const item = { id: `f${nextId.current++}`, time: timeNowLabel(), ...next };
      setFeed((prev) => [item, ...prev].slice(0, 5));
      setDecisionCount((c) => c + Math.floor(Math.random() * 3) + 1);
    }, 4800);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="nua" data-testid="nua-section" className="relative py-24 lg:py-32 bg-[#f6f7fb] text-[#0f0f14]">
      <div className="absolute inset-0 bg-grid-light opacity-50 [mask-image:radial-gradient(ellipse_at_top,black_10%,transparent_60%)]" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-black/10 bg-white">
              <div className="w-6 h-6 rounded-md bg-[#8b5cf6] flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
              <span className="font-mono text-[11px] uppercase tracking-widest text-[#666670]">Meet NUA · the AI agent</span>
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-display mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.02]"
            >
              Your Autonomous
              <br />
              <span className="text-[#8b5cf6]">Restaurant Manager.</span>
            </motion.h2>

            <p className="mt-5 text-[15px] text-[#444450] leading-relaxed max-w-md">
              NUA watches every signal (guests, stock, staff, margins) and acts. Suggests, approves, or auto-executes. Always with an audit trail.
            </p>

            <ul className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {capabilities.map((c) => (
                <li key={c} className="flex items-center gap-2.5 text-sm text-[#1a1a22]">
                  <CheckCircle2 className="w-4 h-4 text-[#8b5cf6] flex-shrink-0" />
                  {c}
                </li>
              ))}
            </ul>

            <a
              href="#voice"
              data-testid="nua-explore-btn"
              className="mt-8 inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#0b0b0f] text-white text-sm font-medium hover:bg-[#1c1c26] transition-colors"
            >
              Explore AI Agent
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Right: decision feed */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-white border border-black/5 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.08)] overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3 border-b border-black/5 bg-[#fafafb]">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#8b5cf6]" />
                  <span className="font-display text-sm font-semibold">NUA · live decision feed</span>
                </div>
                <div className="flex items-center gap-2 font-mono text-[10px] text-[#666670] uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-dot" />
                  <Clock className="w-3 h-3" />
                  Last 30 min
                </div>
              </div>

              <ul className="divide-y divide-black/5" data-testid="nua-decision-feed-list">
                <AnimatePresence initial={false}>
                  {feed.map((f, i) => {
                    const s = statusStyles[f.status];
                    return (
                      <motion.li
                        key={f.id}
                        layout
                        initial={{ opacity: 0, y: -16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.45, delay: i === 0 ? 0 : 0 }}
                        className="px-5 py-4 hover:bg-[#fafafb] transition-colors overflow-hidden"
                      >
                        <div className="flex items-start gap-3">
                          <div className="mt-1 w-8 h-8 rounded-lg bg-[#8b5cf6]/10 flex items-center justify-center flex-shrink-0">
                            <Zap className="w-3.5 h-3.5 text-[#8b5cf6]" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-mono text-[10px] text-[#666670]">{f.time}</span>
                              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full ${s.bg} ${s.text} font-mono text-[10px] uppercase`}>
                                <span className={`w-1 h-1 rounded-full ${s.dot}`} />
                                {s.label}
                              </span>
                            </div>
                            <p className="mt-1.5 text-sm font-medium text-[#0f0f14]">{f.action}</p>
                            <p className="mt-1 text-[13px] text-[#666670] leading-relaxed">
                              <span className="text-[#8b5cf6] font-mono">→</span> {f.outcome}
                            </p>
                          </div>
                        </div>
                      </motion.li>
                    );
                  })}
                </AnimatePresence>
              </ul>

              <div className="px-5 py-3 border-t border-black/5 bg-[#fafafb] flex items-center justify-between">
                <span className="font-mono text-[10px] text-[#666670] uppercase tracking-wider">
                  <LiveNumber value={decisionCount} duration={0.6} /> decisions this week
                </span>
                <span className="font-mono text-[10px] text-[#8b5cf6]">94.2% auto-resolved</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
