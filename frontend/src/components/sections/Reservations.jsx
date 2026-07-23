import React from "react";
import { motion } from "framer-motion";
import { Crown, Calendar, Clock, Flame, Users, MapPin } from "lucide-react";

const tables = [
  { id: 1, seats: 2, status: "vip", x: 5, y: 8, label: "T1" },
  { id: 2, seats: 4, status: "occupied", x: 22, y: 8, label: "T2" },
  { id: 3, seats: 4, status: "occupied", x: 40, y: 8, label: "T3" },
  { id: 4, seats: 6, status: "overdue", x: 60, y: 8, label: "T4" },
  { id: 5, seats: 2, status: "available", x: 80, y: 8, label: "T5" },
  { id: 6, seats: 4, status: "available", x: 5, y: 38, label: "T6" },
  { id: 7, seats: 8, status: "vip", x: 28, y: 38, label: "T7" },
  { id: 8, seats: 4, status: "occupied", x: 55, y: 38, label: "T8" },
  { id: 9, seats: 2, status: "available", x: 75, y: 38, label: "T9" },
  { id: 10, seats: 6, status: "reserved", x: 5, y: 68, label: "T10" },
  { id: 11, seats: 4, status: "available", x: 30, y: 68, label: "T11" },
  { id: 12, seats: 4, status: "occupied", x: 52, y: 68, label: "T12" },
  { id: 13, seats: 2, status: "reserved", x: 75, y: 68, label: "T13" },
];

const statusColors = {
  vip: { bg: "bg-[#8b5cf6]", text: "VIP", ring: "ring-[#8b5cf6]/40" },
  occupied: { bg: "bg-[#0f0f14]", text: "Seated", ring: "ring-black/10" },
  overdue: { bg: "bg-[#f58c14]", text: "Overdue", ring: "ring-[#f58c14]/40" },
  available: { bg: "bg-white border border-black/10", text: "Open", ring: "ring-black/10" },
  reserved: { bg: "bg-[#ec4899]", text: "Reserved", ring: "ring-[#ec4899]/40" },
};

const features = [
  { icon: MapPin, label: "Table & floor plan" },
  { icon: Users, label: "Waitlist + booking portal" },
  { icon: Crown, label: "VIP guest tagging" },
  { icon: Calendar, label: "Experiences & events" },
  { icon: Flame, label: "Busy-time heatmaps" },
  { icon: Clock, label: "Auto turn-time predictions" },
];

export default function Reservations() {
  return (
    <section id="reservations" data-testid="reservations-section" className="relative py-24 lg:py-32 bg-[#f6f7fb] text-[#0f0f14]">
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#8b5cf6]">— Reservations & guests</span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-display mt-3 text-4xl sm:text-5xl font-bold tracking-tight leading-[1.02]"
            >
              The floor,
              <br />
              <span className="text-[#666670]">visible & alive.</span>
            </motion.h2>
            <p className="mt-5 text-[#444450] leading-relaxed">
              See every table, every guest, every signal. NUA flags VIPs, predicts turn-times, and steers bookings to maximise covers.
            </p>

            <ul className="mt-7 space-y-3">
              {features.map((f) => (
                <li key={f.label} className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-white border border-black/5 flex items-center justify-center shadow-sm">
                    <f.icon className="w-4 h-4 text-[#8b5cf6]" />
                  </div>
                  <span className="text-[#1a1a22]">{f.label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-8">
            <div className="rounded-2xl bg-white border border-black/5 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.1)] overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3 border-b border-black/5">
                <div>
                  <div className="font-display font-semibold">Main dining · Friday 7:30pm</div>
                  <div className="font-mono text-[11px] text-[#666670]">86% occupancy · est. turn 1h 42m</div>
                </div>
                <div className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-wider">
                  {Object.entries(statusColors).map(([k, v]) => (
                    <span key={k} className="flex items-center gap-1.5">
                      <span className={`w-2.5 h-2.5 rounded ${v.bg}`} />
                      <span className="text-[#666670]">{v.text}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative aspect-[16/10] bg-[#fafafb] bg-grid-light">
                {tables.map((t) => {
                  const s = statusColors[t.status];
                  return (
                    <motion.div
                      key={t.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: t.id * 0.04 }}
                      className={`absolute rounded-xl ${s.bg} ring-4 ${s.ring} text-white text-xs font-mono flex flex-col items-center justify-center shadow-md`}
                      style={{
                        left: `${t.x}%`,
                        top: `${t.y}%`,
                        width: t.seats >= 6 ? "14%" : t.seats >= 4 ? "12%" : "9%",
                        height: t.seats >= 6 ? "22%" : "20%",
                        color: t.status === "available" ? "#0f0f14" : "#fff",
                      }}
                    >
                      <span className="font-display font-semibold text-sm">{t.label}</span>
                      <span className="text-[10px] opacity-80">{t.seats} seats</span>
                    </motion.div>
                  );
                })}
                {/* Heatmap blobs */}
                <div className="absolute inset-0 pointer-events-none opacity-30">
                  <div className="absolute top-[20%] left-[35%] w-32 h-32 rounded-full bg-[#f58c14] blur-3xl" />
                  <div className="absolute bottom-[20%] right-[20%] w-24 h-24 rounded-full bg-[#ec4899] blur-3xl" />
                </div>
              </div>

              <div className="px-5 py-3 border-t border-black/5 bg-[#fafafb] flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Crown className="w-4 h-4 text-[#8b5cf6]" />
                  <span className="text-sm">VIP Anaïs · party of 4 · arriving in <span className="font-mono text-[#8b5cf6]">12m</span></span>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#666670]">NUA recommends T7 (south corner)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
