import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mic } from "lucide-react";
import { VoiceShowcase } from "@/components/graphics/ShowcaseGraphics";

const phrases = [
  "Add two cappuccinos to table 7",
  "Apply 10% discount to the current bill",
  "Show me today's bookings after 7pm",
  "Run end of day report for Friday",
  "86 the sea bass and comp table 4's dessert",
];

export default function Voice() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setTimeout(() => setIdx((p) => (p + 1) % phrases.length), 3600);
    return () => clearTimeout(id);
  }, [idx]);

  const phrase = phrases[idx];

  return (
    <section id="voice" data-testid="voice-section" className="relative py-28 lg:py-36 bg-nua-bg overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[800px] rounded-full bg-[#f58c14]/15 blur-[160px]" />
      </div>
      <div className="absolute inset-0 bg-grid-dark opacity-20 [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_60%)]" />

      <div className="relative max-w-5xl mx-auto px-6 lg:px-10 text-center">
        <span className="font-mono text-[11px] uppercase tracking-widest text-nua-burgundy">Voice-first operations</span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display mt-3 text-5xl sm:text-6xl lg:text-7xl font-bold text-nua-ink leading-[0.95] tracking-tight"
        >
          Run your venue
          <br />
          by <span className="italic text-nua-burgundy">voice</span>.
        </motion.h2>

        <p className="mt-6 max-w-xl mx-auto text-nua-ink2">
          Hands full at the pass? Just speak. NUA understands intent, context, and your menu: instantly.
        </p>

        <div className="mt-14 max-w-3xl mx-auto rounded-2xl glass-card-dark p-8 sm:p-10">
          <div className="flex items-center justify-center gap-3 mb-7">
            <div className="relative">
              <div className="w-14 h-14 rounded-full bg-nua-burgundy flex items-center justify-center shadow-lg shadow-nua-burgundy/30">
                <Mic className="w-6 h-6 text-nua-ink" />
              </div>
              <span className="absolute inset-0 rounded-full border border-nua-burgundy/40 animate-pulse-dot" />
            </div>
            <span className="font-mono text-[11px] uppercase tracking-widest text-nua-burgundy">● Listening</span>
          </div>

          {/* Waveform */}
          <div className="flex items-center justify-center gap-1 h-16 mb-6">
            {Array.from({ length: 48 }).map((_, i) => (
              <div
                key={i}
                className="w-[3px] sm:w-1 rounded-full bar-wave"
                style={{
                  height: `${20 + Math.abs(Math.sin(i * 0.4)) * 70}%`,
                  background: `linear-gradient(180deg, #f58c14, #ec4899)`,
                  animationDelay: `${(i % 12) * 0.07}s`,
                  animationDuration: `${1 + (i % 5) * 0.1}s`,
                }}
              />
            ))}
          </div>

          {/* Transcription: animated via key change */}
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="font-mono text-base sm:text-lg text-nua-ink min-h-[2.5rem] flex items-center justify-center"
          >
            <span>{`"${phrase}"`}</span>
            <span className="inline-block w-2 h-5 bg-nua-burgundy ml-1 animate-blink" />
          </motion.div>

          <div className="mt-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#8b5cf6]/15 border border-[#8b5cf6]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-nua-burgundy" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-nua-burgundy">Intent classified · executing</span>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          {phrases.map((p, i) => (
            <span
              key={p}
              className={`px-3 py-1.5 rounded-full border font-mono text-[11px] transition-colors ${
                i === idx ? "border-nua-burgundy/40 bg-[#f58c14]/10 text-nua-burgundy" : "border-nua-border text-nua-ink2"
              }`}
            >
              {`"${p}"`}
            </span>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 flex flex-col items-center"
        >
          <span className="font-mono text-[10px] uppercase tracking-widest text-nua-ink2 mb-5">See it live</span>
          <div className="overflow-x-auto max-w-full py-1">
            <VoiceShowcase />
          </div>
          <p className="mt-4 text-sm text-nua-ink2 max-w-sm">NUA: Voice OS. Zero clicks: hands stay on the pass.</p>
        </motion.div>
      </div>
    </section>
  );
}
