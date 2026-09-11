import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Coffee, UtensilsCrossed, Fish, GlassWater, CreditCard, ShoppingCart,
  Zap, Users, Megaphone, ArrowRight, Mic, Receipt, Star, Wallet,
} from "lucide-react";
import LiveNumber from "@/components/graphics/LiveNumber";

function parseMinSec(label) {
  const [m, s] = label.split(":").map(Number);
  return m * 60 + s;
}

function formatMinSec(totalSeconds) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function useLiveSeconds(initialLabel) {
  const [seconds, setSeconds] = useState(() => parseMinSec(initialLabel));
  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);
  return seconds;
}

/* ---------- Point of Sale ---------- */
export function POSVisual() {
  const items = [
    { name: "Flat White", price: "$4.80", icon: Coffee },
    { name: "Truffle Pasta", price: "$24.00", icon: UtensilsCrossed },
    { name: "Sea Bass", price: "$28.00", icon: Fish },
    { name: "Sparkling Water", price: "$3.50", icon: GlassWater },
  ];
  const cart = [
    { name: "Truffle Pasta", qty: 1, price: 24.0 },
    { name: "Flat White", qty: 2, price: 9.6 },
  ];
  return (
    <div data-testid="visual-pos" className="rounded-2xl bg-nua-surface border border-nua-border overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-nua-border bg-nua-bgAlt">
        <span className="font-mono text-[10px] uppercase tracking-widest text-nua-ink2">Order #348 · Table 7</span>
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 font-mono text-[10px] text-nua-burgundy">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-dot" />Synced
        </span>
      </div>
      <div className="grid grid-cols-5">
        <div className="col-span-3 p-3 grid grid-cols-2 gap-2 border-r border-nua-border">
          {items.map((it) => (
            <div key={it.name} className="rounded-xl bg-nua-bgAlt border border-nua-border p-2.5 hover:border-nua-burgundy/40 transition-colors">
              <it.icon className="w-4 h-4 text-nua-burgundy" />
              <div className="mt-2 text-[11px] text-nua-ink font-medium leading-tight">{it.name}</div>
              <div className="font-mono text-[10px] text-nua-ink2">{it.price}</div>
            </div>
          ))}
        </div>
        <div className="col-span-2 p-3 flex flex-col">
          <div className="flex-1 space-y-1.5">
            {cart.map((c) => (
              <div key={c.name} className="flex items-center justify-between text-[11px]">
                <span className="text-nua-ink">{c.qty}× {c.name}</span>
                <span className="font-mono text-nua-ink2">${c.price.toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="pt-2.5 mt-2.5 border-t border-nua-border space-y-1">
            <div className="flex justify-between font-mono text-[10px] text-nua-ink2"><span>Subtotal</span><span>$33.60</span></div>
            <div className="flex justify-between font-mono text-[10px] text-nua-ink2"><span>Tax</span><span>$3.36</span></div>
            <div className="flex justify-between font-display font-bold text-nua-ink text-sm"><span>Total</span><span>$36.96</span></div>
          </div>
          <button className="mt-2.5 w-full py-2 rounded-full bg-nua-burgundy text-white text-[11px] font-medium flex items-center justify-center gap-1.5">
            <CreditCard className="w-3.5 h-3.5" /> Charge card
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Kitchen Display System ---------- */
function LiveTicket({ table, items, time, color }) {
  const seconds = useLiveSeconds(time);
  const aging = seconds >= 600 ? "#C02626" : seconds >= 300 ? "#A45D0D" : color;
  return (
    <div className="rounded-lg bg-nua-bgAlt border border-nua-border p-2.5">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold text-nua-ink">{table}</span>
        <span className="font-mono text-[10px] tabular-nums" style={{ color: aging }}>{formatMinSec(seconds)}</span>
      </div>
      <div className="mt-1 space-y-0.5">
        {items.map((it) => <div key={it} className="text-[10px] text-nua-ink2">{it}</div>)}
      </div>
    </div>
  );
}

export function KDSVisual() {
  const cols = [
    { label: "New", color: "#7D52DD", tickets: [{ table: "T4", items: ["2× Wagyu", "1× Sea bass"], time: "0:42" }] },
    { label: "Preparing", color: "#A45D0D", tickets: [{ table: "T7", items: ["1× Pasta"], time: "6:18" }] },
    { label: "Ready", color: "#157E3C", tickets: [{ table: "T9", items: ["2× Tiramisu"], time: "11:32" }] },
  ];
  return (
    <div data-testid="visual-kds" className="rounded-2xl bg-nua-surface border border-nua-border p-4 grid grid-cols-3 gap-3">
      {cols.map((col) => (
        <div key={col.label}>
          <div className="flex items-center gap-1.5 mb-2">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: col.color }} />
            <span className="font-mono text-[9px] uppercase tracking-widest text-nua-ink2">{col.label}</span>
          </div>
          <div className="space-y-2">
            {col.tickets.map((t) => (
              <LiveTicket key={t.table} table={t.table} items={t.items} time={t.time} color={col.color} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------- Reservations ---------- */
export function ReservationsVisual() {
  const tables = [
    { label: "T1", status: "vip" }, { label: "T2", status: "occupied" }, { label: "T3", status: "available" },
    { label: "T4", status: "overdue" }, { label: "T5", status: "reserved" }, { label: "T6", status: "available" },
  ];
  const colors = { vip: "#7D52DD", occupied: "#2a2a35", available: "transparent", overdue: "#A45D0D", reserved: "#BF3A7B" };
  return (
    <div data-testid="visual-reservations" className="rounded-2xl bg-nua-surface border border-nua-border p-4">
      <div className="grid grid-cols-3 gap-2">
        {tables.map((t) => (
          <div
            key={t.label}
            className="aspect-square rounded-lg flex items-center justify-center text-[10px] font-mono text-nua-ink border border-nua-border"
            style={{ background: colors[t.status] }}
          >
            {t.label}
          </div>
        ))}
      </div>
      <div className="mt-3 font-mono text-[10px] text-nua-ink2">NUA recommends T5 · VIP arriving in 12m</div>
    </div>
  );
}

/* ---------- Loyalty Engine ---------- */
export function LoyaltyVisual() {
  return (
    <div data-testid="visual-loyalty" className="rounded-2xl bg-nua-surface border border-nua-border p-5">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <Receipt className="w-4 h-4 text-nua-ink2" />
          <span className="font-display text-xl font-bold text-nua-ink">$19.00</span>
        </div>
        <ArrowRight className="w-4 h-4 text-nua-ink2 flex-shrink-0" />
        <div className="flex items-center gap-1.5">
          <Star className="w-4 h-4 text-nua-burgundy" />
          <span className="font-display text-xl font-bold text-nua-burgundy">+19 pts</span>
        </div>
      </div>
      <div className="mt-2 font-mono text-[10px] text-nua-ink2">$1 spent = 1 point, credited instantly</div>
      <div className="mt-4 pt-3 border-t border-nua-border flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Wallet className="w-3.5 h-3.5 text-nua-burgundy" />
          <span className="font-mono text-[10px] text-nua-burgundy uppercase tracking-wider">NUA Wallet</span>
        </div>
        <span className="font-mono text-[10px] text-nua-ink"><LiveNumber value={12840} duration={1.2} /> pts total</span>
      </div>
    </div>
  );
}

/* ---------- Inventory & Purchasing ---------- */
export function InventoryVisual() {
  return (
    <div data-testid="visual-inventory" className="rounded-2xl bg-nua-surface border border-nua-border p-5">
      <div className="flex items-center justify-between">
        <span className="px-2 py-0.5 rounded-full bg-nua-burgundyWash text-nua-burgundy font-mono text-[10px] uppercase">Buy now</span>
        <ShoppingCart className="w-4 h-4 text-nua-burgundy" />
      </div>
      <div className="mt-3 text-sm text-nua-ink font-medium">Heirloom tomatoes: 8kg</div>
      <div className="mt-1 text-[11px] text-nua-ink2 leading-relaxed">Demand forecast +24% next 7 days. Supplier A holding price.</div>
    </div>
  );
}

/* ---------- Staff Management ---------- */
export function StaffVisual() {
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const shifts = [1, 1, 0, 1, 1, 1, 0];
  const ai = [false, false, false, true, false, false, false];
  return (
    <div data-testid="visual-staff" className="rounded-2xl bg-nua-surface border border-nua-border p-5">
      <div className="font-mono text-[10px] uppercase tracking-widest text-nua-ink2 mb-3">Maya · FOH Lead</div>
      <div className="grid grid-cols-7 gap-1.5">
        {days.map((d, i) => (
          <div key={i} className="text-center">
            <div
              className={`aspect-square rounded-md flex items-center justify-center text-[10px] font-mono ${
                !shifts[i] ? "border border-dashed border-nua-border" : ai[i] ? "bg-nua-burgundy text-white" : "bg-nua-bgAlt text-nua-ink2"
              }`}
            >
              {shifts[i] ? (ai[i] ? "✦" : "•") : ""}
            </div>
            <div className="mt-1 font-mono text-[9px] text-nua-ink2">{d}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- AI Command Center ---------- */
export function NuaVisual() {
  return (
    <div data-testid="visual-nua" className="rounded-2xl bg-nua-surface border border-nua-border p-5">
      <div className="flex items-center gap-2 font-mono text-[10px] text-nua-ink2">
        <Zap className="w-3.5 h-3.5 text-nua-burgundy" />09:38:55
      </div>
      <div className="mt-2 text-sm text-nua-ink leading-tight">Sea bass demand forecast +28% vs Friday baseline</div>
      <div className="mt-1 text-[11px] text-nua-burgundy">→ Bumped purchase qty to 14kg with Supplier A</div>
      <span className="inline-block mt-2 px-2 py-0.5 rounded-full bg-nua-burgundyWash text-nua-burgundy font-mono text-[10px] uppercase">Approved</span>
    </div>
  );
}

/* ---------- Analytics Dashboard ---------- */
export function AnalyticsVisual() {
  return (
    <div data-testid="visual-analytics" className="rounded-2xl bg-nua-surface border border-nua-border p-5">
      <div className="flex items-center justify-between">
        <div className="font-mono text-[10px] uppercase tracking-widest text-nua-ink2">Revenue today</div>
        <span className="font-mono text-[10px] text-nua-burgundy">+18.4%</span>
      </div>
      <div className="font-display text-2xl font-bold text-nua-ink mt-1"><LiveNumber value={32418} prefix="$" /></div>
      <svg viewBox="0 0 200 60" className="w-full h-14 mt-2">
        <motion.path
          d="M0,50 C30,40 50,45 70,30 C90,20 110,35 130,22 C150,12 170,25 200,10"
          stroke="#750D28"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}

/* ---------- Marketing Automation ---------- */
export function MarketingVisual() {
  const steps = [
    { label: "Trigger", value: "No visit in 21 days", icon: Zap },
    { label: "Segment", value: "412 lapsed VIPs", icon: Users },
    { label: "Campaign", value: "15% winback offer", icon: Megaphone },
  ];
  return (
    <div data-testid="visual-marketing" className="rounded-2xl bg-nua-surface border border-nua-border p-4">
      <div className="flex items-center gap-2">
        {steps.map((s, i) => (
          <React.Fragment key={s.label}>
            <div className="flex-1 rounded-xl bg-nua-bgAlt border border-nua-border p-2.5">
              <s.icon className="w-4 h-4 text-nua-burgundy" />
              <div className="mt-2 font-mono text-[9px] uppercase tracking-widest text-nua-ink2">{s.label}</div>
              <div className="text-[10px] text-nua-ink mt-0.5 leading-tight">{s.value}</div>
            </div>
            {i < steps.length - 1 && <ArrowRight className="w-3.5 h-3.5 text-nua-ink2 flex-shrink-0" />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

/* ---------- Voice POS ---------- */
export function VoiceVisual() {
  return (
    <div data-testid="visual-voice" className="rounded-2xl bg-nua-surface border border-nua-border p-5">
      <div className="flex items-center justify-center gap-1 h-12 mb-3">
        {Array.from({ length: 24 }).map((_, i) => (
          <div
            key={i}
            className="w-1 rounded-full"
            style={{ height: `${20 + Math.abs(Math.sin(i * 0.5)) * 70}%`, background: "linear-gradient(180deg,#8A1433,#750D28)" }}
          />
        ))}
      </div>
      <div className="font-mono text-[11px] text-center text-nua-ink flex items-center justify-center gap-1.5">
        <Mic className="w-3 h-3 flex-shrink-0 text-nua-burgundy" />
        <span className="min-w-0">"Apply 10% discount to table 7"</span>
      </div>
      <div className="mt-2 text-center font-mono text-[10px] text-nua-burgundy">10% Discount applied</div>
    </div>
  );
}

export const VISUAL_REGISTRY = {
  pos: POSVisual,
  kds: KDSVisual,
  reservations: ReservationsVisual,
  loyalty: LoyaltyVisual,
  inventory: InventoryVisual,
  staff: StaffVisual,
  nua: NuaVisual,
  analytics: AnalyticsVisual,
  marketing: MarketingVisual,
  voice: VoiceVisual,
};
