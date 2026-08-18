import React from "react";
import { ArrowUp, Sparkles } from "lucide-react";

/* ---------- Monitor on a stand ---------- */
export function MonitorFrame({ children, width = 720, screenBg = "#ffffff", padded = false, className = "" }) {
  return (
    <div className={`relative inline-flex flex-col items-center ${className}`} data-testid="monitor-frame">
      <div
        className="rounded-2xl border border-black/10 bg-[#0b0b0f] p-2.5 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.35)]"
        style={{ width }}
      >
        <div className={`rounded-xl overflow-hidden ${padded ? "p-6" : ""}`} style={{ background: screenBg }}>{children}</div>
      </div>
      <div
        className="w-20 h-14 bg-gradient-to-b from-[#3a3a42] to-[#1b1b21]"
        style={{ clipPath: "polygon(38% 0%, 62% 0%, 100% 100%, 0% 100%)" }}
      />
      <div className="w-44 h-3 rounded-full bg-gradient-to-b from-[#2a2a32] to-[#131317] shadow-lg" />
    </div>
  );
}

/* ---------- Tablet propped on a small stand (customer-facing / counter POS) ---------- */
export function TabletStandFrame({ children, width = 380, height = 250, screenBg = "#ffffff", className = "" }) {
  return (
    <div className={`relative inline-flex flex-col items-center ${className}`} data-testid="tablet-stand-frame">
      <div
        className="relative rounded-[1.5rem] border-[7px] border-[#0f0f14] bg-[#0f0f14] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.4)] overflow-hidden"
        style={{ width, height }}
      >
        <div className="absolute left-1/2 -translate-x-1/2 top-0.5 w-2 h-2 rounded-full bg-black/50 z-10" />
        <div className="w-full h-full overflow-hidden" style={{ background: screenBg }}>{children}</div>
      </div>
      <div
        className="w-10 h-7 bg-gradient-to-b from-[#3a3a42] to-[#1b1b21]"
        style={{ clipPath: "polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)" }}
      />
      <div className="w-24 h-2.5 rounded-full bg-gradient-to-b from-[#2a2a32] to-[#131317]" />
    </div>
  );
}

/* ---------- Phone outline ---------- */
export function PhoneFrame({ children, width = 190, height = 380, screenBg = "#ffffff", className = "" }) {
  return (
    <div
      className={`relative rounded-[2rem] border-[7px] border-[#0f0f14] bg-[#0f0f14] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.4)] overflow-hidden ${className}`}
      style={{ width, height }}
      data-testid="phone-frame"
    >
      <div className="absolute left-1/2 -translate-x-1/2 top-1.5 w-16 h-4 rounded-full bg-[#0f0f14] z-10" />
      <div className="w-full h-full overflow-hidden" style={{ background: screenBg }}>{children}</div>
    </div>
  );
}

/* ---------- Floating AI copilot chat panel ---------- */
export function AICopilotPanel({ messages, className = "" }) {
  return (
    <div
      className={`rounded-2xl bg-[#15151d] border border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] p-4 ${className}`}
      data-testid="ai-copilot-panel"
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-6 rounded-md bg-[#8b5cf6] flex items-center justify-center">
          <Sparkles className="w-3.5 h-3.5 text-white" />
        </div>
        <span className="font-display text-sm font-semibold text-white">Ask NUA</span>
      </div>
      <div className="space-y-2.5">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`px-3.5 py-2.5 rounded-2xl text-[13px] leading-relaxed max-w-[88%] ${
                m.from === "user"
                  ? "bg-[#7c3aed] text-white rounded-br-sm"
                  : "bg-white/[0.06] text-[#eaeaea] rounded-bl-sm"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 pt-3 border-t border-white/10 flex items-center gap-2 px-1">
        <span className="flex-1 text-[12px] text-[#a1a1aa]">Ask anything about your venues…</span>
        <div className="w-7 h-7 rounded-full bg-[#f58c14] flex items-center justify-center flex-shrink-0">
          <ArrowUp className="w-3.5 h-3.5 text-white" />
        </div>
      </div>
    </div>
  );
}

/* ---------- Decorative QR-style pattern (not a real scannable code) ---------- */
const QR_PATTERN = [
  "1111101010111",
  "1000100101000",
  "1011101010101",
  "1011101101110",
  "1011101010001",
  "1000100110100",
  "1111101010111",
  "0000000101010",
  "1101110100011",
  "0010001011100",
  "1110101101010",
  "0001001010001",
  "1010111010111",
];

export function QRPattern({ size = 88, dark = "#0f0f14", light = "#ffffff", className = "" }) {
  const cell = size / QR_PATTERN.length;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className={className}>
      <rect width={size} height={size} fill={light} />
      {QR_PATTERN.map((row, y) =>
        row.split("").map((v, x) =>
          v === "1" ? (
            <rect key={`${x}-${y}`} x={x * cell} y={y * cell} width={cell} height={cell} fill={dark} />
          ) : null
        )
      )}
    </svg>
  );
}
