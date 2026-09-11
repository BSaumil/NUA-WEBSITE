import React from "react";
import { motion } from "framer-motion";
import { MOCKUP_SOLID } from "@/theme/mockupPalette";
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
            <span className="font-mono text-[11px] uppercase tracking-widest text-nua-burgundy">Staff & operations</span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-display mt-3 text-4xl sm:text-5xl lg:text-6xl font-bold text-nua-ink tracking-tight leading-[1.02]"
            >
              The roster
              <br />
              <span className="text-nua-burgundy">that runs itself.</span>
            </motion.h2>
            <p className="mt-5 text-nua-ink2 leading-relaxed max-w-md">
              AI rostering matches forecast demand to skills and certifications. Shift swaps, payroll, tip distribution and performance: all built in.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-3">
              {[
                { icon: DollarSign, label: "Labour cost", value: "−12%" },
                { icon: TrendingUp, label: "Coverage", value: "100%" },
                { icon: Users, label: "Swap rate", value: "2.4%" },
              ].map((m) => (
                <div key={m.label} className="rounded-xl bg-nua-bgAlt border border-nua-border p-4">
                  <m.icon className="w-4 h-4 text-nua-burgundy" />
                  <div className="mt-3 font-display text-2xl font-bold text-nua-ink">{m.value}</div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-nua-ink2 mt-0.5">{m.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-2xl glass-card-dark p-6 overflow-hidden">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <div className="font-display font-semibold text-nua-ink">Week 47 · roster</div>
                  <div className="font-mono text-[11px] text-nua-ink2">5 staff · 24 shifts · AI-optimised</div>
                </div>
                <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-nua-burgundyWash border border-nua-burgundy/20">
                  <Sparkles className="w-3 h-3 text-nua-burgundy" />
                  <span className="font-mono text-[10px] uppercase tracking-wider text-nua-burgundy">3 AI suggestions</span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left text-[10px] font-mono uppercase tracking-wider text-nua-ink2 py-2 pr-3 min-w-[110px]">Staff</th>
                      {days.map((d) => (
                        <th key={d} className="text-center text-[10px] font-mono uppercase tracking-wider text-nua-ink2 py-2 px-1">
                          {d}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {staff.map((s) => (
                      <tr key={s.name} className="border-t border-nua-border">
                        <td className="py-2.5 pr-3">
                          <div className="font-display text-sm font-semibold text-nua-ink">{s.name}</div>
                          <div className="font-mono text-[10px] text-nua-ink2">{s.role}</div>
                        </td>
                        {s.shifts.map((sh, i) => {
                          const ai = s.ai[i];
                          if (!sh) return <td key={i} className="py-2 px-1"><div className="aspect-square rounded-md border border-dashed border-nua-border" /></td>;
                          return (
                            <td key={i} className="py-2 px-1">
                              {/* Purple is NUA Agent across every mockup: the
                                  hero's agent chip, the audit trail and these
                                  AI-assigned shifts. The sparkle icon carries
                                  the same meaning, so the colour is a second
                                  signal rather than the only one. */}
                              <div
                                className={`aspect-square rounded-md flex items-center justify-center text-[10px] font-mono ${
                                  ai ? "shadow-md" : "bg-nua-bgAlt text-nua-ink2"
                                }`}
                                style={ai ? { background: MOCKUP_SOLID.purple.bg, color: MOCKUP_SOLID.purple.on } : undefined}
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

              <div className="mt-5 p-3 rounded-xl bg-nua-burgundyWash border border-nua-burgundy/20">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-4 h-4 text-nua-burgundy mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-sm text-nua-ink">NUA suggests adding Jules for Friday dinner: forecast +18% covers, save $284 vs split shift.</div>
                    <div className="mt-2 flex gap-2">
                      <button data-testid="staff-approve-suggestion" className="px-3 py-1.5 rounded-full bg-nua-burgundy text-white text-[11px] font-medium hover:bg-nua-burgundyDark transition-colors">
                        Approve
                      </button>
                      <button data-testid="staff-dismiss-suggestion" className="px-3 py-1.5 rounded-full bg-nua-bgAlt text-nua-ink text-[11px] hover:bg-nua-bgAlt transition-colors">
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
          <span className="font-mono text-[10px] uppercase tracking-widest text-nua-ink2 mb-5">See it live</span>
          <div className="overflow-x-auto max-w-full py-1">
            <StaffShowcase />
          </div>
          <p className="mt-4 text-sm text-nua-ink2 max-w-sm">NUA: Staff OS. Hours saved every week on rostering.</p>
        </motion.div>
      </div>
    </section>
  );
}
