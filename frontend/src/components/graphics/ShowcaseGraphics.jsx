import React from "react";
import { motion } from "framer-motion";
import {
  DollarSign, ShoppingBag, TrendingUp, Users, Coffee, UtensilsCrossed,
  Fish, GlassWater, CreditCard, Gift, Link2,
} from "lucide-react";
import { MonitorFrame, TabletStandFrame, PhoneFrame, AICopilotPanel, QRPattern } from "@/components/graphics/DeviceFrames";
import LiveNumber from "@/components/graphics/LiveNumber";
import {
  POSVisual, KDSVisual, ReservationsVisual, StaffVisual, InventoryVisual, MarketingVisual, VoiceVisual,
} from "@/components/graphics/FeatureVisuals";

const sparkPaths = [
  "M0,20 C10,15 20,18 30,10 C40,5 50,12 60,6",
  "M0,18 C10,20 20,10 30,14 C40,8 50,4 60,8",
  "M0,15 C10,10 20,16 30,8 C40,12 50,6 60,3",
  "M0,22 C10,18 20,20 30,12 C40,14 50,8 60,10",
];

const kpis = [
  { icon: DollarSign, label: "Total Sales", value: 214830, prefix: "$", delta: "+12.7%", color: "#f58c14", spark: sparkPaths[0] },
  { icon: ShoppingBag, label: "Total Orders", value: 4218, delta: "+9.3%", color: "#8b5cf6", spark: sparkPaths[1] },
  { icon: TrendingUp, label: "Avg. Order Value", value: 50.93, decimals: 2, prefix: "$", delta: "+3.1%", color: "#ec4899", spark: sparkPaths[2] },
  { icon: Users, label: "Loyalty Members", value: 16240, delta: "+4.6%", color: "#22c55e", spark: sparkPaths[3] },
];

const venues = [
  { name: "Riverside", value: 52431, pct: 100 },
  { name: "Southbank", value: 41295, pct: 79 },
  { name: "Docklands", value: 33871, pct: 65 },
  { name: "Fitzroy", value: 29184, pct: 56 },
  { name: "Geelong", value: 19446, pct: 37 },
];

/* Shared dashboard screen used by both flagship analytics graphics */
export function AnalyticsDashboardScreen() {
  return (
    <div className="bg-[#fafbfc] text-[#0f0f14]">
      <div className="flex items-center justify-between px-5 py-3 border-b border-black/5 bg-white">
        <div>
          <div className="font-mono text-[9px] text-[#8b8b95] uppercase tracking-wider">Insights</div>
          <div className="font-display text-sm font-semibold">Sales, Loyalty &amp; Inventory Overview</div>
        </div>
        <div className="hidden sm:flex items-center gap-1.5">
          {["All Venues", "Last 7 Days", "All Methods"].map((f) => (
            <span key={f} className="px-2.5 py-1 rounded-md bg-[#f3f4f6] font-mono text-[9px] text-[#5c5c66]">{f}</span>
          ))}
        </div>
      </div>

      <div className="p-5">
        <div className="grid grid-cols-4 gap-3">
          {kpis.map((k) => (
            <div key={k.label} className="rounded-xl border border-black/5 p-3">
              <div className="flex items-center justify-between">
                <k.icon className="w-3.5 h-3.5" style={{ color: k.color }} />
                <span className="font-mono text-[9px] text-emerald-600">{k.delta}</span>
              </div>
              <div className="mt-2 font-display text-lg font-bold">
                <LiveNumber value={k.value} prefix={k.prefix} decimals={k.decimals} />
              </div>
              <div className="font-mono text-[8px] uppercase tracking-wider text-[#8b8b95]">{k.label}</div>
              <svg viewBox="0 0 60 24" className="w-full h-4 mt-1">
                <path d={k.spark} stroke={k.color} strokeWidth="1.5" fill="none" />
              </svg>
            </div>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-5 gap-3">
          <div className="col-span-3 rounded-xl border border-black/5 p-4">
            <div className="font-display text-xs font-semibold mb-2">Sales Trend · last 7 days</div>
            <svg viewBox="0 0 300 90" className="w-full h-24">
              <defs>
                <linearGradient id="showcaseGrad" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#f58c14" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#f58c14" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0,70 C40,60 60,65 90,50 C120,40 140,52 170,38 C200,28 220,42 250,25 C270,18 285,28 300,12 L300,90 L0,90 Z" fill="url(#showcaseGrad)" />
              <path d="M0,70 C40,60 60,65 90,50 C120,40 140,52 170,38 C200,28 220,42 250,25 C270,18 285,28 300,12" stroke="#f58c14" strokeWidth="2" fill="none" />
            </svg>
          </div>
          <div className="col-span-2 rounded-xl border border-black/5 p-4">
            <div className="font-display text-xs font-semibold mb-2">Sales by Venue</div>
            <div className="space-y-1.5">
              {venues.map((v) => (
                <div key={v.name} className="flex items-center gap-2">
                  <span className="w-14 font-mono text-[8px] text-[#5c5c66] truncate">{v.name}</span>
                  <div className="flex-1 h-2 rounded-full bg-[#f3f4f6] overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-[#8b5cf6] to-[#ec4899]" style={{ width: `${v.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* A — flagship: dashboard + AI copilot answering a real question */
export function InsightsCopilotShowcase() {
  return (
    <div className="relative" data-testid="showcase-insights-copilot">
      <MonitorFrame width={680}>
        <AnalyticsDashboardScreen />
      </MonitorFrame>
      <motion.div
        initial={{ opacity: 0, y: 20, x: 20 }}
        whileInView={{ opacity: 1, y: 0, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="absolute -right-4 sm:-right-10 bottom-4 sm:bottom-10 w-[300px] sm:w-[340px]"
      >
        <AICopilotPanel
          messages={[
            { from: "user", text: "Why were sales down last week?" },
            { from: "nua", text: "Most of the drop came from Riverside's lunch trade — orders fell 14% between 12–2pm after your top lunch item sold out." },
            { from: "user", text: "What should I do first?" },
            { from: "nua", text: "Prep more before lunch and add one extra team member from 12–2pm. That alone could recover about $2,100 a week." },
          ]}
        />
      </motion.div>
    </div>
  );
}

/* B — standalone analytics monitor */
export function AnalyticsMonitorShowcase() {
  return (
    <div data-testid="showcase-analytics-monitor">
      <MonitorFrame width={680}>
        <AnalyticsDashboardScreen />
      </MonitorFrame>
    </div>
  );
}

/* C — scan-to-pay + loyalty auto-linked, fully constructed (no photos) */
const orderItems = [
  { icon: Coffee, name: "Flat White ×2", price: "$9.60" },
  { icon: UtensilsCrossed, name: "Truffle Pasta", price: "$24.00" },
  { icon: Fish, name: "Sea Bass", price: "$28.00" },
  { icon: GlassWater, name: "Sparkling Water", price: "$3.50" },
];

export function ScanToPayShowcase() {
  return (
    <div className="relative inline-flex items-end gap-0" data-testid="showcase-scan-to-pay">
      <TabletStandFrame width={380} height={250}>
        <div className="h-full flex flex-col bg-white text-[#0f0f14]">
          <div className="px-4 py-2.5 border-b border-black/5 flex items-center justify-between">
            <span className="font-display text-xs font-semibold">Your Order · Table 4</span>
            <CreditCard className="w-3.5 h-3.5 text-[#a1a1aa]" />
          </div>
          <div className="flex-1 grid grid-cols-2">
            <div className="p-3 space-y-1.5 border-r border-black/5">
              {orderItems.map((it) => (
                <div key={it.name} className="flex items-center justify-between text-[10px]">
                  <span className="flex items-center gap-1.5 text-[#1a1a22]"><it.icon className="w-3 h-3 text-[#f58c14]" />{it.name}</span>
                  <span className="font-mono text-[#71717a]">{it.price}</span>
                </div>
              ))}
              <div className="pt-1.5 mt-1.5 border-t border-black/5 flex justify-between font-display font-bold text-xs">
                <span>Total</span><span>$65.10</span>
              </div>
            </div>
            <div className="p-3 flex flex-col items-center justify-center gap-1.5">
              <span className="font-mono text-[8px] uppercase tracking-widest text-[#8b5cf6]">Scan to pay</span>
              <QRPattern size={72} />
            </div>
          </div>
        </div>
      </TabletStandFrame>

      <PhoneFrame width={128} height={260} className="-ml-6 mb-6 z-10 shadow-2xl">
        <div className="h-full bg-[#0b0b0f] flex flex-col items-center justify-center gap-2 px-3">
          <span className="font-mono text-[7px] uppercase tracking-widest text-[#a1a1aa]">NUA Wallet</span>
          <QRPattern size={64} dark="#ffffff" light="#0b0b0f" />
          <span className="font-mono text-[7px] text-[#8b5cf6]">Anaïs Laurent · Black tier</span>
        </div>
      </PhoneFrame>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="absolute z-20 -top-8 right-0 sm:-right-6 flex items-center gap-2.5 rounded-xl bg-white shadow-[0_20px_40px_-10px_rgba(0,0,0,0.25)] px-3.5 py-2.5"
      >
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-[#ec4899] text-white font-mono text-[9px] font-semibold uppercase whitespace-nowrap">
          <Gift className="w-3 h-3" /> Rewards
        </span>
        <div className="text-[10px] leading-tight text-[#1a1a22]">
          <div className="flex items-center gap-1 font-mono text-[8px] uppercase tracking-wider text-emerald-600"><Link2 className="w-2.5 h-2.5" />Linked</div>
          <div className="font-medium">Loyalty rewards connected<br />to this sale</div>
        </div>
      </motion.div>
    </div>
  );
}

/* ---------- Broader coverage: existing feature visuals, framed as device mockups ---------- */
export function POSShowcase() {
  return (
    <div data-testid="showcase-pos">
      <TabletStandFrame width={420} height={280} screenBg="#0b0b0f">
        <div className="p-3.5 h-full flex items-center"><POSVisual /></div>
      </TabletStandFrame>
    </div>
  );
}

export function KDSShowcase() {
  return (
    <div data-testid="showcase-kds">
      <MonitorFrame width={480} screenBg="#0b0b0f" padded>
        <KDSVisual />
      </MonitorFrame>
    </div>
  );
}

export function ReservationsShowcase() {
  return (
    <div data-testid="showcase-reservations">
      <MonitorFrame width={420} screenBg="#0b0b0f" padded>
        <ReservationsVisual />
      </MonitorFrame>
    </div>
  );
}

export function StaffShowcase() {
  return (
    <div data-testid="showcase-staff">
      <MonitorFrame width={420} screenBg="#0b0b0f" padded>
        <StaffVisual />
      </MonitorFrame>
    </div>
  );
}

export function InventoryShowcase() {
  return (
    <div data-testid="showcase-inventory">
      <MonitorFrame width={400} screenBg="#0b0b0f" padded>
        <InventoryVisual />
      </MonitorFrame>
    </div>
  );
}

export function MarketingShowcase() {
  return (
    <div data-testid="showcase-marketing">
      <MonitorFrame width={420} screenBg="#0b0b0f" padded>
        <MarketingVisual />
      </MonitorFrame>
    </div>
  );
}

export function VoiceShowcase() {
  return (
    <div data-testid="showcase-voice">
      <PhoneFrame width={200} height={340} screenBg="#0b0b0f">
        <div className="p-4 h-full flex items-center"><VoiceVisual /></div>
      </PhoneFrame>
    </div>
  );
}
