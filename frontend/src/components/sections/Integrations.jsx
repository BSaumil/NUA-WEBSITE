import React from "react";
import { motion } from "framer-motion";

const integrations = [
  "Stripe", "Twilio", "Square", "PayPal", "Uber Eats", "DoorDash", "Deliveroo", "Xero",
  "QuickBooks", "Mailchimp", "Klaviyo", "Slack", "Google", "Apple Pay", "Shopify", "Notion",
  "Zapier", "HubSpot", "Toast", "Salesforce",
];

export default function Integrations() {
  // duplicate for seamless marquee
  const row = [...integrations, ...integrations];
  return (
    <section id="integrations" data-testid="integrations-section" className="relative py-24 lg:py-28 bg-[#f6f7fb] text-[#0f0f14] overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-mono text-[11px] uppercase tracking-widest text-[#f58c14]">— Ecosystem</span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display mt-3 text-4xl sm:text-5xl font-bold tracking-tight leading-[1.02]"
          >
            Plays nicely with everything.
          </motion.h2>
          <p className="mt-5 text-[#444450]">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-black/5 font-mono text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f58c14] animate-pulse-dot" />
              18+ integrations and expanding
            </span>
          </p>
        </div>
      </div>

      {/* Marquee */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#f6f7fb] to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#f6f7fb] to-transparent z-10" />

        <div className="overflow-hidden">
          <div className="flex gap-4 animate-marquee whitespace-nowrap">
            {row.map((name, i) => (
              <div
                key={`${name}-${i}`}
                className="flex-shrink-0 px-6 py-4 rounded-xl bg-white border border-black/5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <span className="font-display text-lg font-semibold text-[#0f0f14] opacity-70 hover:opacity-100 transition-opacity">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 mt-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {[
            { label: "Payments", value: "12+" },
            { label: "Delivery platforms", value: "6+" },
            { label: "Accounting & CRM", value: "8+" },
            { label: "Messaging & comms", value: "5+" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-3xl font-bold text-[#0f0f14]">{s.value}</div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-[#666670] mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
