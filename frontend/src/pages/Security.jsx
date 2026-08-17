import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Lock, KeyRound, ListChecks, Server, CreditCard, ArrowRight, Info } from "lucide-react";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import { useModals } from "@/components/ModalProvider";
import { LEAD_CAPTURE_ENABLED } from "@/config/siteConfig";

const pillars = [
  {
    icon: Lock,
    title: "Encryption, in transit and at rest",
    body: "Data moving between a terminal and NUA's cloud platform is encrypted over TLS. Stored data (menus, guest records, sales history) is encrypted at rest.",
  },
  {
    icon: CreditCard,
    title: "Card payments, handled by PCI-compliant processors",
    body: "Card details are never stored on the terminal or in NUA's own database. Payments route through PCI-DSS compliant payment processors built for this exact purpose.",
  },
  {
    icon: KeyRound,
    title: "Role-based access, per staff member",
    body: "Every login gets exactly the access their role needs. A server isn't a manager isn't an owner. No shared blanket-admin logins by default.",
  },
  {
    icon: ListChecks,
    title: "A full audit trail on every AI action",
    body: "Every action the AI Agent takes (automatic or approved) is timestamped, logged, and reviewable. Nothing acts invisibly.",
  },
  {
    icon: Server,
    title: "Offline-first, by architecture",
    body: "Core operations write to the device first and sync after, so a dropped connection is a sync delay, not a data-loss event or a stalled checkout.",
  },
  {
    icon: ShieldCheck,
    title: "Continuous, cloud-side backups",
    body: "Your data is backed up continuously on the cloud side, independent of what's happening on any single venue's terminal.",
  },
];

export default function Security() {
  const { openLead } = useModals();

  return (
    <PageShell testId="security-page">
      <PageHero
        eyebrow="Security &amp; Trust"
        title="How NUA actually handles your data."
        subtitle="Not a badge wall: a straight answer to what happens to your business and guest data, and why."
        accent="#22c55e"
        crumb="Security"
      />

      <div className="relative max-w-5xl mx-auto px-6 lg:px-10 pb-24 lg:pb-32">
        <div className="flex items-start gap-3 rounded-2xl bg-white/[0.03] border border-white/5 p-4" data-testid="security-disclaimer">
          <Info className="w-4 h-4 text-[#a1a1aa] mt-0.5 flex-shrink-0" />
          <p className="text-[13px] text-[#a1a1aa] leading-relaxed">
            This page describes NUA's architecture and data-handling practices in plain language. It is not a
            substitute for a signed data processing agreement or a specific compliance certificate. If your venue
            needs a formal certification reference (e.g. a specific PCI-DSS level or SOC 2 report) for procurement,{" "}
            {LEAD_CAPTURE_ENABLED ? (
              <button type="button" onClick={() => openLead({ type: "demo" })} className="text-[#22c55e] hover:underline">
                ask us directly
              </button>
            ) : (
              <a href="mailto:info@nuapos.com.au" className="text-[#22c55e] hover:underline">email us</a>
            )}{" "}
            and we'll provide current documentation.
          </p>
        </div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              data-testid={`security-pillar-${i}`}
              className="rounded-2xl bg-[#15151d] border border-white/5 p-5"
            >
              <div className="w-9 h-9 rounded-lg bg-emerald-500/15 flex items-center justify-center">
                <p.icon className="w-4 h-4 text-emerald-400" />
              </div>
              <h3 className="mt-4 font-display font-semibold text-white text-sm">{p.title}</h3>
              <p className="mt-1.5 text-[13px] text-[#a1a1aa] leading-relaxed">{p.body}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 rounded-2xl bg-[#15151d] border border-white/5 p-6 sm:p-8">
          <h2 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">Reporting a concern</h2>
          <p className="mt-3 text-sm text-[#a1a1aa] leading-relaxed max-w-2xl">
            Found something that looks like a security issue? Email{" "}
            <a href="mailto:info@nuapos.com.au" className="text-emerald-400 hover:underline">info@nuapos.com.au</a>{" "}
            directly: a real person on the engineering team reads that inbox, and we'd rather hear it from you first.
          </p>
        </div>

        {LEAD_CAPTURE_ENABLED && (
          <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 rounded-2xl border border-white/5 bg-white/[0.02] p-6 sm:p-8">
            <div>
              <div className="font-display text-lg font-semibold text-white">Questions before you switch?</div>
              <div className="text-sm text-[#a1a1aa] mt-1">Talk it through with a real operator, not a script.</div>
            </div>
            <button
              type="button"
              onClick={() => openLead({ type: "demo" })}
              data-testid="security-book-demo-btn"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#f58c14] hover:bg-[#d87b10] text-white text-sm font-medium transition-all duration-200 flex-shrink-0"
            >
              Book a Demo
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </PageShell>
  );
}
