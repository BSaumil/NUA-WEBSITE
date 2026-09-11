import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DollarSign, ShoppingBag, TrendingUp, Users, Coffee, UtensilsCrossed,
  Fish, GlassWater, CreditCard, Gift, Link2, MapPin, Thermometer, Truck,
  CalendarClock, ShieldCheck, Wallet, Sparkles, Wifi, Smartphone, Banknote,
} from "lucide-react";
import { MonitorFrame, TabletStandFrame, PhoneFrame, AICopilotPanel, QRPattern } from "@/components/graphics/DeviceFrames";
import LiveNumber from "@/components/graphics/LiveNumber";
import {
  POSVisual, KDSVisual, ReservationsVisual, StaffVisual, InventoryVisual, MarketingVisual, VoiceVisual,
} from "@/components/graphics/FeatureVisuals";
import { MOCKUP, MOCKUP_LINE, MOCKUP_SOLID, MOCKUP_TIER } from "@/theme/mockupPalette";

function LiveDot({ color = "#157E3C" }) {
  return (
    <span className="inline-flex items-center gap-1 font-mono text-[8px] uppercase tracking-widest" style={{ color }}>
      <span className="w-1.5 h-1.5 rounded-full animate-pulse-dot" style={{ background: color }} />Live
    </span>
  );
}

const sparkPaths = [
  "M0,20 C10,15 20,18 30,10 C40,5 50,12 60,6",
  "M0,18 C10,20 20,10 30,14 C40,8 50,4 60,8",
  "M0,15 C10,10 20,16 30,8 C40,12 50,6 60,3",
  "M0,22 C10,18 20,20 30,12 C40,14 50,8 60,10",
];

const kpis = [
  { icon: DollarSign, label: "Total Sales", value: 214830, prefix: "$", delta: "+12.7%", color: MOCKUP_LINE.orange, spark: sparkPaths[0] },
  { icon: ShoppingBag, label: "Total Orders", value: 4218, delta: "+9.3%", color: MOCKUP_LINE.purple, spark: sparkPaths[1] },
  { icon: TrendingUp, label: "Avg. Order Value", value: 50.93, decimals: 2, prefix: "$", delta: "+3.1%", color: MOCKUP_LINE.pink, spark: sparkPaths[2] },
  { icon: Users, label: "Loyalty Members", value: 16240, delta: "+4.6%", color: MOCKUP_LINE.ink, spark: sparkPaths[3] },
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
    <div className="bg-nua-bgAlt text-nua-ink">
      <div className="flex items-center justify-between px-5 py-3 border-b border-nua-border bg-white">
        <div>
          <div className="font-mono text-[9px] text-nua-ink2 uppercase tracking-wider">Insights</div>
          <div className="font-display text-sm font-semibold">Sales, Loyalty &amp; Inventory Overview</div>
        </div>
        <div className="hidden sm:flex items-center gap-1.5">
          {["All Venues", "Last 7 Days", "All Methods"].map((f) => (
            <span key={f} className="px-2.5 py-1 rounded-md bg-nua-border/60 font-mono text-[9px] text-nua-ink2">{f}</span>
          ))}
        </div>
      </div>

      <div className="p-5">
        <div className="grid grid-cols-4 gap-3">
          {kpis.map((k) => (
            <div key={k.label} className="rounded-xl border border-nua-border p-3">
              <div className="flex items-center justify-between">
                <k.icon className="w-3.5 h-3.5" style={{ color: '#750D28' }} />
                <span className="font-mono text-[9px] text-nua-burgundy">{k.delta}</span>
              </div>
              <div className="mt-2 font-display text-lg font-bold">
                <LiveNumber value={k.value} prefix={k.prefix} decimals={k.decimals} />
              </div>
              <div className="font-mono text-[8px] uppercase tracking-wider text-nua-ink2">{k.label}</div>
              <svg viewBox="0 0 60 24" className="w-full h-4 mt-1">
                <path d={k.spark} stroke={k.color} strokeWidth="1.5" fill="none" />
              </svg>
            </div>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-5 gap-3">
          <div className="col-span-3 rounded-xl border border-nua-border p-4">
            <div className="font-display text-xs font-semibold mb-2">Sales Trend · last 7 days</div>
            <svg viewBox="0 0 300 90" className="w-full h-24">
              <defs>
                <linearGradient id="showcaseGrad" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#750D28" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#750D28" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0,70 C40,60 60,65 90,50 C120,40 140,52 170,38 C200,28 220,42 250,25 C270,18 285,28 300,12 L300,90 L0,90 Z" fill="url(#showcaseGrad)" />
              <path d="M0,70 C40,60 60,65 90,50 C120,40 140,52 170,38 C200,28 220,42 250,25 C270,18 285,28 300,12" stroke="#750D28" strokeWidth="2" fill="none" />
            </svg>
          </div>
          <div className="col-span-2 rounded-xl border border-nua-border p-4">
            <div className="font-display text-xs font-semibold mb-2">Sales by Venue</div>
            <div className="space-y-1.5">
              {venues.map((v) => (
                <div key={v.name} className="flex items-center gap-2">
                  <span className="w-14 font-mono text-[8px] text-nua-ink2 truncate">{v.name}</span>
                  <div className="flex-1 h-2 rounded-full bg-nua-border/60 overflow-hidden">
                    <div className="h-full rounded-full bg-nua-burgundy" style={{ width: `${v.pct}%` }} />
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

/* A: flagship: dashboard + AI copilot answering a real question */
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
            { from: "nua", text: "Most of the drop came from Riverside's lunch trade, orders fell 14% between 12–2pm after your top lunch item sold out." },
            { from: "user", text: "What should I do first?" },
            { from: "nua", text: "Prep more before lunch and add one extra team member from 12–2pm. That alone could recover about $2,100 a week." },
          ]}
        />
      </motion.div>
    </div>
  );
}

/* B: standalone analytics monitor */
export function AnalyticsMonitorShowcase() {
  return (
    <div data-testid="showcase-analytics-monitor">
      <MonitorFrame width={680}>
        <AnalyticsDashboardScreen />
      </MonitorFrame>
    </div>
  );
}

/* C: scan-to-pay + loyalty auto-linked, fully constructed (no photos) */
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
        <div className="h-full flex flex-col bg-white text-nua-ink">
          <div className="px-4 py-2.5 border-b border-nua-border flex items-center justify-between">
            <span className="font-display text-xs font-semibold">Your Order · Table 4</span>
            <CreditCard className="w-3.5 h-3.5 text-nua-ink2" />
          </div>
          <div className="flex-1 grid grid-cols-2">
            <div className="p-3 space-y-1.5 border-r border-nua-border">
              {orderItems.map((it) => (
                <div key={it.name} className="flex items-center justify-between text-[10px]">
                  <span className="flex items-center gap-1.5 text-nua-ink"><it.icon className="w-3 h-3 text-nua-burgundy" />{it.name}</span>
                  <span className="font-mono text-nua-ink2">{it.price}</span>
                </div>
              ))}
              <div className="pt-1.5 mt-1.5 border-t border-nua-border flex justify-between font-display font-bold text-xs">
                <span>Total</span><span>$65.10</span>
              </div>
            </div>
            <div className="p-3 flex flex-col items-center justify-center gap-1.5">
              <span className="font-mono text-[8px] uppercase tracking-widest text-nua-burgundy">Scan to pay</span>
              <QRPattern size={72} />
            </div>
          </div>
        </div>
      </TabletStandFrame>

      <PhoneFrame width={128} height={260} className="-ml-6 mb-6 z-10 shadow-2xl">
        <div className="h-full bg-nua-bg flex flex-col items-center justify-center gap-2 px-3">
          <span className="font-mono text-[7px] uppercase tracking-widest text-nua-ink2">NUA Wallet</span>
          <QRPattern size={64} dark="#29241E" light="#FFFDF9" />
          <span className="font-mono text-[7px] text-nua-burgundy">Sam B. · Black tier</span>
        </div>
      </PhoneFrame>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="absolute z-20 -top-8 right-0 sm:-right-6 flex items-center gap-2.5 rounded-xl bg-white shadow-[0_20px_40px_-10px_rgba(0,0,0,0.25)] px-3.5 py-2.5"
      >
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-nua-burgundy text-white font-mono text-[9px] font-semibold uppercase whitespace-nowrap">
          <Gift className="w-3 h-3" /> Rewards
        </span>
        <div className="text-[10px] leading-tight text-nua-ink">
          <div className="flex items-center gap-1 font-mono text-[8px] uppercase tracking-wider text-nua-burgundy"><Link2 className="w-2.5 h-2.5" />Linked</div>
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
      <TabletStandFrame width={420} height={280} screenBg="#FFFDF9">
        <div className="p-3.5 h-full flex items-center"><POSVisual /></div>
      </TabletStandFrame>
    </div>
  );
}

export function KDSShowcase() {
  return (
    <div data-testid="showcase-kds">
      <MonitorFrame width={480} screenBg="#FFFDF9" padded>
        <KDSVisual />
      </MonitorFrame>
    </div>
  );
}

export function ReservationsShowcase() {
  return (
    <div data-testid="showcase-reservations">
      <MonitorFrame width={420} screenBg="#FFFDF9" padded>
        <ReservationsVisual />
      </MonitorFrame>
    </div>
  );
}

export function StaffShowcase() {
  return (
    <div data-testid="showcase-staff">
      <MonitorFrame width={420} screenBg="#FFFDF9" padded>
        <StaffVisual />
      </MonitorFrame>
    </div>
  );
}

export function InventoryShowcase() {
  return (
    <div data-testid="showcase-inventory">
      <MonitorFrame width={400} screenBg="#FFFDF9" padded>
        <InventoryVisual />
      </MonitorFrame>
    </div>
  );
}

export function MarketingShowcase() {
  return (
    <div data-testid="showcase-marketing">
      <MonitorFrame width={420} screenBg="#FFFDF9" padded>
        <MarketingVisual />
      </MonitorFrame>
    </div>
  );
}

export function VoiceShowcase() {
  return (
    <div data-testid="showcase-voice">
      <PhoneFrame width={200} height={340} screenBg="#FFFDF9">
        <div className="p-4 h-full flex items-center">
          <div className="w-full min-w-0"><VoiceVisual /></div>
        </div>
      </PhoneFrame>
    </div>
  );
}

/* ---------- New: genuinely live showcases (continuous motion, not just entrance) ---------- */

/* D: Loyalty wallet: points tick up live, tier progress fills */
export function LoyaltyWalletLiveShowcase() {
  const [points, setPoints] = useState(12840);
  useEffect(() => {
    const id = setInterval(() => setPoints((p) => p + Math.floor(Math.random() * 14) + 3), 2600);
    return () => clearInterval(id);
  }, []);
  const tierTarget = 15000;
  const pct = Math.min(100, (points / tierTarget) * 100);
  return (
    <div data-testid="showcase-loyalty-wallet">
      <PhoneFrame width={210} height={380} screenBg="#FFFDF9">
        <div className="h-full flex flex-col items-center justify-center gap-3 px-4">
          <div className="flex items-center gap-1.5">
            <Wallet className="w-3.5 h-3.5 text-nua-burgundy" />
            <span className="font-mono text-[8px] uppercase tracking-widest text-nua-burgundy">NUA Wallet</span>
          </div>
          <div className="font-display text-3xl font-bold text-nua-ink tabular-nums">
            <LiveNumber value={points} />
          </div>
          <div className="font-mono text-[8px] text-nua-ink2 -mt-2">points · Black tier</div>
          <div className="w-full mt-1">
            <div className="h-1.5 w-full rounded-full bg-nua-bgAlt overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-nua-burgundy"
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
            <div className="mt-1 font-mono text-[7px] text-nua-ink2">{Math.max(0, tierTarget - points).toLocaleString()} pts to next reward tier</div>
          </div>
          <LiveDot color="#BF3A7B" />
        </div>
      </PhoneFrame>
    </div>
  );
}

/* E: AI Command Center: autonomous action log, live-cycling */
const aiActionPool = [
  { action: "Table 9 lingering 22min past predicted turn-time", outcome: "Nudged FOH to prep for the 7:45 walk-in.", status: "suggested" },
  { action: "Burrata usage trending 31% under forecast", outcome: "Suggested tonight's staff special to clear stock.", status: "approved" },
  { action: "Lapsed-guest segment crossed 400 members", outcome: "Winback campaign queued: 15% offer, sends at 4pm.", status: "executed" },
  { action: "Friday dinner forecast +18% vs last week", outcome: "Drafted an extra bar shift. Awaiting approval.", status: "suggested" },
  { action: "Sea bass demand forecast +28% vs baseline", outcome: "Bumped purchase qty to 14kg with Supplier A.", status: "executed" },
  { action: "Profit margin on Set Menu B dropped to 58%", outcome: "Repriced sides +$2. Margin restored to 65%.", status: "executed" },
];
const aiStatusStyle = {
  executed: MOCKUP_TIER.executed,
  approved: MOCKUP_TIER.approved,
  suggested: MOCKUP_TIER.suggested,
};
function timeNowLabel() {
  const d = new Date();
  return d.toTimeString().slice(0, 8);
}
export function AICommandCenterShowcase() {
  const [feed, setFeed] = useState(() => [
    { id: 0, time: "09:42:12", ...aiActionPool[0] },
    { id: -1, time: "09:38:55", ...aiActionPool[1] },
  ]);
  const poolIndex = useRef(2);
  const nextId = useRef(1);
  useEffect(() => {
    const id = setInterval(() => {
      const next = aiActionPool[poolIndex.current % aiActionPool.length];
      poolIndex.current += 1;
      setFeed((prev) => [{ id: nextId.current++, time: timeNowLabel(), ...next }, ...prev].slice(0, 3));
    }, 4200);
    return () => clearInterval(id);
  }, []);
  return (
    <div data-testid="showcase-ai-command-center">
      <MonitorFrame width={480} screenBg="#FFFDF9" padded>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-md bg-nua-burgundy flex items-center justify-center"><Sparkles className="w-3 h-3 text-white" /></div>
            <span className="font-display text-xs font-semibold text-nua-ink">Autonomous Actions</span>
          </div>
          <LiveDot color="#7D52DD" />
        </div>
        <div className="space-y-2">
          <AnimatePresence initial={false}>
            {feed.map((f) => {
              const s = aiStatusStyle[f.status];
              return (
                <motion.div
                  key={f.id}
                  layout
                  initial={{ opacity: 0, y: -12, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                  className="rounded-lg bg-nua-bgAlt border border-nua-border p-2.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[8px] text-nua-ink2">{f.time}</span>
                    <span className="px-1.5 py-0.5 rounded-full font-mono text-[7px] uppercase" style={{ background: s.wash, color: s.text }}>{s.label}</span>
                  </div>
                  <div className="mt-1 text-[11px] text-nua-ink leading-tight">{f.action}</div>
                  <div className="mt-0.5 text-[10px] text-nua-burgundy leading-tight">→ {f.outcome}</div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </MonitorFrame>
    </div>
  );
}

/* F: Multi-venue live: revenue ticking per venue, pulsing live dots */
const initialVenueRevenue = [
  { name: "Riverside", value: 18240 },
  { name: "Southbank", value: 14310 },
  { name: "Docklands", value: 11920 },
  { name: "Fitzroy", value: 9840 },
];
export function MultiVenueLiveShowcase() {
  const [venueData, setVenueData] = useState(initialVenueRevenue);
  useEffect(() => {
    const id = setInterval(() => {
      setVenueData((prev) => prev.map((v) => ({ ...v, value: v.value + Math.floor(Math.random() * 60) + 10 })));
    }, 2400);
    return () => clearInterval(id);
  }, []);
  return (
    <div data-testid="showcase-multi-venue">
      <MonitorFrame width={460} screenBg="#FFFDF9" padded>
        <div className="flex items-center justify-between mb-3">
          <span className="font-display text-xs font-semibold text-nua-ink">5 Venues · One Login</span>
          <LiveDot color="#157E3C" />
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          {venueData.map((v) => (
            <div key={v.name} className="rounded-lg bg-nua-bgAlt border border-nua-border p-2.5">
              <div className="flex items-center gap-1 font-mono text-[8px] text-nua-ink2">
                <MapPin className="w-2.5 h-2.5 text-nua-burgundy" />{v.name}
              </div>
              <div className="mt-1 font-display text-sm font-bold text-nua-ink tabular-nums">
                <LiveNumber value={v.value} prefix="$" duration={0.8} />
              </div>
            </div>
          ))}
        </div>
      </MonitorFrame>
    </div>
  );
}

/* G: Temperature monitoring: live jittering readouts, always-safe pulse */
export function TemperatureMonitoringShowcase() {
  const [fridge, setFridge] = useState(3.2);
  const [freezer, setFreezer] = useState(-18.4);
  useEffect(() => {
    const id = setInterval(() => {
      setFridge((t) => Math.round((t + (Math.random() - 0.5) * 0.4) * 10) / 10);
      setFreezer((t) => Math.round((t + (Math.random() - 0.5) * 0.4) * 10) / 10);
    }, 2200);
    return () => clearInterval(id);
  }, []);
  const readouts = [
    { label: "Walk-in Fridge", value: fridge, suffix: "°C" },
    { label: "Freezer", value: freezer, suffix: "°C" },
  ];
  return (
    <div data-testid="showcase-temperature">
      <MonitorFrame width={400} screenBg="#FFFDF9" padded>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <Thermometer className="w-3.5 h-3.5 text-nua-burgundy" />
            <span className="font-display text-xs font-semibold text-nua-ink">Temperature Monitoring</span>
          </div>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/15 font-mono text-[8px] uppercase text-nua-burgundy">
            <ShieldCheck className="w-2.5 h-2.5" />Compliant
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          {readouts.map((r) => (
            <div key={r.label} className="rounded-lg bg-nua-bgAlt border border-nua-border p-2.5">
              <div className="font-mono text-[8px] uppercase tracking-wider text-nua-ink2">{r.label}</div>
              <div className="mt-1 font-display text-lg font-bold text-nua-ink tabular-nums">{r.value.toFixed(1)}{r.suffix}</div>
              <LiveDot color="#157E3C" />
            </div>
          ))}
        </div>
        <div className="mt-2.5 font-mono text-[9px] text-nua-ink2">Auto-logged every 5 min · alerts sent instantly</div>
      </MonitorFrame>
    </div>
  );
}

/* H: Payments / EFTPOS: tap-to-pay ripple, any method accepted */
export function PaymentsShowcase() {
  return (
    <div data-testid="showcase-payments">
      <TabletStandFrame width={360} height={240} screenBg="#FFFDF9">
        <div className="h-full flex flex-col items-center justify-center gap-3">
          <div className="relative w-14 h-14 flex items-center justify-center">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="absolute inset-0 rounded-full border-2 border-nua-burgundy"
                initial={{ opacity: 0.6, scale: 0.6 }}
                animate={{ opacity: 0, scale: 1.8 }}
                transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.6, ease: "easeOut" }}
              />
            ))}
            <div className="w-9 h-9 rounded-full bg-nua-burgundy flex items-center justify-center relative z-10">
              <Wifi className="w-4 h-4 text-white rotate-90" />
            </div>
          </div>
          <div className="font-display text-xl font-bold text-nua-ink">$42.50</div>
          <div className="flex items-center gap-2">
            {[CreditCard, Smartphone, Banknote].map((Icon, i) => (
              <div key={i} className="w-7 h-7 rounded-lg bg-nua-bgAlt border border-nua-border flex items-center justify-center">
                <Icon className="w-3.5 h-3.5 text-nua-ink2" />
              </div>
            ))}
          </div>
          <div className="font-mono text-[8px] uppercase tracking-widest text-nua-ink2">Any method · instant settlement</div>
        </div>
      </TabletStandFrame>
    </div>
  );
}

/* I: Delivery hub: every platform into one queue */
const deliveryPartners = [
  { tag: "Partner A", color: MOCKUP.orange, item: "2× Pad Thai", eta: "18 min" },
  { tag: "Partner B", color: MOCKUP.purple, item: "1× Butter Chicken", eta: "24 min" },
  { tag: "Partner C", color: MOCKUP.pink, item: "3× Sushi Set", eta: "15 min" },
];
export function DeliveryHubShowcase() {
  const [orders, setOrders] = useState(() => [
    { id: 0, ...deliveryPartners[0] },
    { id: -1, ...deliveryPartners[1] },
  ]);
  const idx = useRef(2);
  const nextId = useRef(1);
  useEffect(() => {
    const id = setInterval(() => {
      const next = deliveryPartners[idx.current % deliveryPartners.length];
      idx.current += 1;
      setOrders((prev) => [{ id: nextId.current++, ...next }, ...prev].slice(0, 3));
    }, 3600);
    return () => clearInterval(id);
  }, []);
  return (
    <div data-testid="showcase-delivery-hub">
      <MonitorFrame width={440} screenBg="#FFFDF9" padded>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5 text-nua-burgundy" />
            <span className="font-display text-xs font-semibold text-nua-ink">All Delivery Orders, One Queue</span>
          </div>
          <LiveDot color="#A45D0D" />
        </div>
        <div className="space-y-2">
          <AnimatePresence initial={false}>
            {orders.map((o) => (
              <motion.div
                key={o.id}
                layout
                initial={{ opacity: 0, x: -16, height: 0 }}
                animate={{ opacity: 1, x: 0, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
                className="flex items-center justify-between rounded-lg bg-nua-bgAlt border border-nua-border p-2.5"
              >
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 rounded-full font-mono text-[7px] uppercase" style={{ background: `${o.color}25`, color: '#750D28' }}>{o.tag}</span>
                  <span className="text-[11px] text-nua-ink">{o.item}</span>
                </div>
                <span className="font-mono text-[9px] text-nua-ink2">{o.eta}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </MonitorFrame>
    </div>
  );
}

/* J: Booking & waitlist: auto-converting waitlist, conflict-free by design */
const waitlistPool = [
  "Waitlist #3 → Table 6 confirmed",
  "Waitlist #4 → Table 2 confirmed",
  "Party of 4 seated 6 min early",
  "Waitlist #5 → Table 9 confirmed",
];
export function BookingWaitlistShowcase() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 3200);
    return () => clearInterval(id);
  }, []);
  const tables = [
    { label: "T1", status: "vip" }, { label: "T2", status: "occupied" }, { label: "T3", status: "available" },
    { label: "T4", status: "reserved" }, { label: "T5", status: "available" }, { label: "T6", status: "occupied" },
  ];
  const colors = { vip: MOCKUP_SOLID.pink.bg, occupied: MOCKUP.ink, available: "transparent", reserved: MOCKUP_SOLID.purple.bg };
  return (
    <div data-testid="showcase-booking-waitlist">
      <MonitorFrame width={420} screenBg="#FFFDF9" padded>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <CalendarClock className="w-3.5 h-3.5 text-nua-burgundy" />
            <span className="font-display text-xs font-semibold text-nua-ink">Reservations &amp; Waitlist</span>
          </div>
          <LiveDot color="#BF3A7B" />
        </div>
        <div className="grid grid-cols-6 gap-1.5">
          {tables.map((t) => (
            <div
              key={t.label}
              className="aspect-square rounded-md flex items-center justify-center text-[9px] font-mono text-nua-ink border border-nua-border"
              style={{ background: colors[t.status] }}
            >
              {t.label}
            </div>
          ))}
        </div>
        <div className="mt-3 h-8 relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={tick % waitlistPool.length}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 font-mono text-[10px] text-nua-burgundy flex items-center"
            >
              {waitlistPool[tick % waitlistPool.length]}
            </motion.div>
          </AnimatePresence>
        </div>
      </MonitorFrame>
    </div>
  );
}

/* K: Forecasting: demand chart draws in, confidence band beyond "today" */
export function ForecastingShowcase() {
  return (
    <div data-testid="showcase-forecasting">
      <MonitorFrame width={400} screenBg="#FFFDF9" padded>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-nua-burgundy" />
            <span className="font-display text-xs font-semibold text-nua-ink">7-Day Demand Forecast</span>
          </div>
          <span className="font-mono text-[8px] uppercase tracking-widest text-nua-ink2">Sea bass</span>
        </div>
        <svg viewBox="0 0 300 100" className="w-full h-24">
          <defs>
            <linearGradient id="forecastGrad" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#750D28" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#750D28" stopOpacity="0" />
            </linearGradient>
          </defs>
          <line x1="180" y1="10" x2="180" y2="90" stroke="#655D53" strokeWidth="1" strokeDasharray="3,3" />
          <text x="184" y="20" fill="#655D53" fontSize="8" fontFamily="monospace">today</text>
          <motion.path
            d="M0,75 C30,68 60,72 90,55 C120,45 150,58 180,42"
            stroke="#750D28"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
          <motion.path
            d="M180,42 C210,30 240,22 300,8"
            stroke="#750D28"
            strokeWidth="2"
            strokeDasharray="4,4"
            fill="none"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 1, ease: "easeInOut" }}
          />
          <path d="M180,42 C210,30 240,22 300,8 L300,100 L180,100 Z" fill="url(#forecastGrad)" opacity="0.5" />
        </svg>
        <div className="mt-2 font-mono text-[10px] text-nua-burgundy">+28% demand predicted Friday → order qty auto-adjusted</div>
      </MonitorFrame>
    </div>
  );
}
