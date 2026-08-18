import React from "react";
import { motion } from "framer-motion";
import { Sparkles, DollarSign, TrendingUp, Users } from "lucide-react";
import { StaffShowcase } from "@/components/graphics/ShowcaseGraphics";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const staff = [
  { name: "Maya", role: "FOH Lead", shifts: [1, 1, 0, 1, 1, 1, 0], ai: [false, false, false, true, false, false, false] },
  { name: "Jules", role: "Bartender", shifts: [0, 1, 1, 1, 1, 1, 1], ai: [false, false, false, false, true, false, false] },
  { name: "Tomás", role: "Sous Chef", shifts: [1, 1, 1, 0, 1, 1, 1], ai: [false, false, false, false, false, false, false] },
  { name: "Riya", role: "Server", shifts: [1, 0, 1, 1, 1, 1, 0], ai: [true, false, false, false, false, false, false] },
  { name: "Eli", role: "Host", shifts: [0, 1, 1, 1, 0, 1, 1], ai: [false, false, false, false, false, false, true] },
];

export default function Staff() {
  return (
    <section id="staff" data-testid="staff-section" className="relative py-24 lg:py-32 bg-nua-bg overflow-hidden">
      <div className="absolute inset-0 bg-grid-dark opacity-25 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#8b5cf6]">Staff & operations</span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-display mt-3 text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.02]"
            >
              The roster
              <br />
              <span className="text-[#8b5cf6]">that runs itself.</span>
            </motion.h2>
            <p className="mt-5 text-[#a1a1aa] leading-relaxed max-w-md">
              AI rostering matches forecast demand to skills and certifications. Shift swaps, payroll, tip distribution and performance: all built in.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-3">
              {[
                { icon: DollarSign, label: "Labour cost", value: "−12%" },
                { icon: TrendingUp, label: "Coverage", value: "100%" },
                { icon: Users, label: "Swap rate", value: "2.4%" },
              ].map((m) => (
                <div key={m.label} className="rounded-xl bg-white/[0.03] border border-white/5 p-4">
                  <m.icon className="w-4 h-4 text-[#8b5cf6]" />
                  <div className="mt-3 font-display text-2xl font-bold text-white">{m.value}</div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-[#a1a1aa] mt-0.5">{m.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-2xl glass-card-dark p-6 overflow-hidden">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <div className="font-display font-semibold text-white">Week 47 · roster</div>
                  <div className="font-mono text-[11px] text-[#a1a1aa]">5 staff · 24 shifts · AI-optimised</div>
                </div>
                <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#8b5cf6]/15 border border-[#8b5cf6]/30">
                  <Sparkles className="w-3 h-3 text-[#8b5cf6]" />
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#c4b5fd]">3 AI suggestions</span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left text-[10px] font-mono uppercase tracking-wider text-[#a1a1aa] py-2 pr-3 min-w-[110px]">Staff</th>
                      {days.map((d) => (
                        <th key={d} className="text-center text-[10px] font-mono uppercase tracking-wider text-[#a1a1aa] py-2 px-1">
                          {d}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {staff.map((s) => (
                      <tr key={s.name} className="border-t border-white/5">
                        <td className="py-2.5 pr-3">
                          <div className="font-display text-sm font-semibold text-white">{s.name}</div>
                          <div className="font-mono text-[10px] text-[#a1a1aa]">{s.role}</div>
                        </td>
                        {s.shifts.map((sh, i) => {
                          const ai = s.ai[i];
                          if (!sh) return <td key={i} className="py-2 px-1"><div className="aspect-square rounded-md border border-dashed border-white/10" /></td>;
                          return (
                            <td key={i} className="py-2 px-1">
                              <div
                                className={`aspect-square rounded-md flex items-center justify-center text-[10px] font-mono ${
                                  ai
                                    ? "bg-gradient-to-br from-[#8b5cf6] to-[#7c3aed] text-white shadow-md shadow-[#8b5cf6]/30"
                                    : "bg-white/5 text-[#a1a1aa]"
                                }`}
                              >
                                {ai ? <Sparkles className="w-3 h-3" /> : <span>•</span>}
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-5 p-3 rounded-xl bg-[#8b5cf6]/10 border border-[#8b5cf6]/25">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-4 h-4 text-[#8b5cf6] mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-sm text-white">NUA suggests adding Jules for Friday dinner: forecast +18% covers, save $284 vs split shift.</div>
                    <div className="mt-2 flex gap-2">
                      <button data-testid="staff-approve-suggestion" className="px-3 py-1.5 rounded-full bg-[#7c3aed] text-white text-[11px] font-medium hover:bg-[#7c3aed] transition-colors">
                        Approve
                      </button>
                      <button data-testid="staff-dismiss-suggestion" className="px-3 py-1.5 rounded-full bg-white/5 text-white text-[11px] hover:bg-white/10 transition-colors">
                        Dismiss
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 flex flex-col items-center text-center"
        >
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#a1a1aa] mb-5">See it live</span>
          <div className="overflow-x-auto max-w-full py-1">
            <StaffShowcase />
          </div>
          <p className="mt-4 text-sm text-[#a1a1aa] max-w-sm">NUA: Staff OS. Hours saved every week on rostering.</p>
        </motion.div>
      </div>
    </section>
  );
}
