import React from "react";
import { motion } from "framer-motion";
import { CreditCard, Truck, Calculator, MessagesSquare } from "lucide-react";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import SEO from "@/components/SEO";
import Integrations from "@/components/sections/Integrations";

const categories = [
  { icon: CreditCard, title: "Payments", body: "Stripe, Square, PayPal, Apple Pay, reconcile every transaction automatically." },
  { icon: Truck, title: "Delivery platforms", body: "Uber Eats, DoorDash, Deliveroo orders flow straight into KDS, no tablet farm." },
  { icon: Calculator, title: "Accounting & CRM", body: "Xero, QuickBooks, Salesforce, HubSpot stay in sync with every sale and refund." },
  { icon: MessagesSquare, title: "Messaging & comms", body: "Twilio, Slack, Mailchimp power guest notifications and internal alerts." },
];

export default function IntegrationsPage() {
  return (
    <PageShell testId="integrations-page">
      <SEO
        title="Integrations: NUA"
        description="NUA replaces the tangle of point tools, but still speaks fluently with the accounting, payroll, delivery and marketing tools you want to keep."
        path="/integrations"
      />
      <PageHero
        eyebrow="Integrations"
        title="Plays nicely with your existing stack."
        subtitle="NUA replaces the tangle of point tools, but it still speaks fluently with the ones you want to keep."
        accent="#A45D0D"
        crumb="Integrations"
      />

      <section className="relative max-w-6xl mx-auto px-6 lg:px-10 pb-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="rounded-2xl bg-nua-surface border border-nua-border p-5"
            >
              <div className="w-9 h-9 rounded-lg bg-nua-burgundyWash flex items-center justify-center">
                <c.icon className="w-4 h-4 text-nua-burgundy" />
              </div>
              <h3 className="mt-4 font-display font-semibold text-nua-ink text-sm">{c.title}</h3>
              <p className="mt-1.5 text-[13px] text-nua-ink2 leading-relaxed">{c.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <Integrations />
    </PageShell>
  );
}
