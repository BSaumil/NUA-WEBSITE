import React from "react";
import { Mail, MapPin, Twitter, Linkedin, Github, ArrowRight } from "lucide-react";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import { useModals } from "@/components/ModalProvider";

const channels = [
  { icon: Mail, label: "General enquiries", value: "hello@nua.app", href: "mailto:hello@nua.app" },
  { icon: Mail, label: "Support", value: "support@nua.app", href: "mailto:support@nua.app" },
  { icon: Mail, label: "Sales", value: "sales@nua.app", href: "mailto:sales@nua.app" },
];

export default function Contact() {
  const { openLead } = useModals();

  return (
    <PageShell testId="contact-page">
      <PageHero
        eyebrow="— Contact"
        title="Talk to a human, not a chatbot."
        subtitle="Questions about pricing, a specific module, or migrating from your current stack — reach out, and a real person answers."
        accent="#ec4899"
        crumb="Contact"
      />

      <div className="relative max-w-3xl mx-auto px-6 lg:px-10 pb-24 lg:pb-32">
        <div className="rounded-2xl bg-gradient-to-br from-[#f58c14]/15 to-[#15151d] border border-[#f58c14]/30 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div>
            <div className="font-display text-lg font-semibold text-white">Prefer to just see it running?</div>
            <div className="text-sm text-[#a1a1aa] mt-1">Book a 30-minute demo — no pressure, no scripted pitch.</div>
          </div>
          <button
            type="button"
            onClick={() => openLead({ type: "demo" })}
            data-testid="contact-book-demo-btn"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#f58c14] hover:bg-[#d87b10] text-white text-sm font-medium transition-all duration-200 flex-shrink-0"
          >
            Book a Demo
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-6 grid sm:grid-cols-3 gap-4">
          {channels.map((c) => (
            <a
              key={c.label}
              href={c.href}
              data-testid={`contact-channel-${c.label.toLowerCase().replace(/\s+/g, "-")}`}
              className="rounded-2xl bg-[#15151d] border border-white/5 p-5 hover:border-white/10 transition-colors"
            >
              <div className="w-9 h-9 rounded-lg bg-[#ec4899]/15 flex items-center justify-center">
                <c.icon className="w-4 h-4 text-[#ec4899]" />
              </div>
              <div className="mt-3 font-mono text-[10px] uppercase tracking-wider text-[#a1a1aa]">{c.label}</div>
              <div className="mt-1 text-sm text-white font-medium">{c.value}</div>
            </a>
          ))}
        </div>

        <div className="mt-6 rounded-2xl bg-[#15151d] border border-white/5 p-6 sm:p-7">
          <div className="flex items-start gap-3">
            <MapPin className="w-4 h-4 text-[#a1a1aa] mt-0.5 flex-shrink-0" />
            <div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-[#a1a1aa]">Registered office</div>
              <div className="mt-1 text-sm text-white">
                NUA AUS PTY LTD · ABN 54 299 131 653<br />
                <span className="font-mono text-[#a1a1aa]">[Insert registered business address]</span>
              </div>
            </div>
          </div>
          <div className="mt-5 flex items-center gap-2">
            {[Twitter, Linkedin, Github].map((Icon, i) => (
              <a
                key={i}
                href="#"
                data-testid={`contact-social-${i}`}
                className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-[#a1a1aa] hover:text-white hover:border-white/20 transition-colors"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
