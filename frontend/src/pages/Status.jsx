import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Info } from "lucide-react";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import SEO from "@/components/SEO";

const components = [
  { name: "POS & Checkout" },
  { name: "Reservations & Waitlist" },
  { name: "Kitchen Display System" },
  { name: "Loyalty & Wallet Passes" },
  { name: "Inventory & Purchasing" },
  { name: "Staff & Rostering" },
  { name: "AI Command Center" },
  { name: "Analytics Dashboard" },
  { name: "Voice POS" },
  { name: "Payments processing" },
  { name: "Integrations (Stripe, Xero, delivery platforms)" },
];

export default function Status() {
  return (
    <PageShell testId="status-page">
      <SEO
        title="System Status: NUA"
        description="Live operational status of every NUA module."
        path="/status"
      />
      <PageHero
        eyebrow="System Status"
        title="Current platform status."
        subtitle="Live state of every NUA module. Nothing to report right now means exactly that."
        accent="#157E3C"
        crumb="Status"
      />

      <div className="relative max-w-3xl mx-auto px-6 lg:px-10 pb-24 lg:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl bg-emerald-500/10 border border-emerald-500/30 p-6 flex items-center gap-4"
          data-testid="status-overall"
        >
          <div className="w-11 h-11 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
            <CheckCircle2 className="w-6 h-6 text-nua-burgundy" />
          </div>
          <div>
            <div className="font-display text-lg font-bold text-nua-ink">All systems operational</div>
            <div className="text-sm text-nua-ink2 mt-0.5">Last checked moments ago.</div>
          </div>
        </motion.div>

        <div className="mt-8 rounded-2xl border border-nua-border bg-nua-surface overflow-hidden">
          {components.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
              data-testid={`status-row-${i}`}
              className="flex items-center justify-between gap-4 px-5 py-4 border-b border-nua-border last:border-b-0"
            >
              <span className="text-sm text-nua-ink">{c.name}</span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-nua-burgundy font-mono text-[10px] uppercase whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Operational
              </span>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 flex items-start gap-3 rounded-2xl bg-nua-bgAlt border border-nua-border p-4" data-testid="status-disclaimer">
          <Info className="w-4 h-4 text-nua-ink2 mt-0.5 flex-shrink-0" />
          <p className="text-[13px] text-nua-ink2 leading-relaxed">
            This page reflects current known status. For automated incident history, uptime history and subscribable
            alerts, this is designed to be backed by a dedicated status provider (e.g. Statuspage or Instatus): 
            connect one to replace this with live, independently-hosted monitoring.
          </p>
        </div>
      </div>
    </PageShell>
  );
}
