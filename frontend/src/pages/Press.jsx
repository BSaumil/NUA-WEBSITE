import React from "react";
import { Download, Mail } from "lucide-react";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";

export default function Press() {
  return (
    <PageShell testId="press-page">
      <PageHero
        eyebrow="Press"
        title="Press & media."
        subtitle="Resources for journalists and media covering NUA and the hospitality technology space."
        accent="#f58c14"
        crumb="Press"
      />

      <div className="relative max-w-3xl mx-auto px-6 lg:px-10 pb-24 lg:pb-32 space-y-6">
        <div className="rounded-2xl bg-[#15151d] border border-white/5 p-6 sm:p-7">
          <h2 className="font-display text-xl font-bold text-white">About NUA</h2>
          <p className="mt-3 text-[15px] text-[#a1a1aa] leading-relaxed">
            NUA AUS PTY LTD (ABN 54 299 131 653) builds NUA, an AI-powered operating system for hospitality venues, unifying point
            of sale, reservations, kitchen display, loyalty, inventory, staff management, analytics, marketing
            automation and voice ordering under a single AI agent. NUA is built for cafés, restaurants, bars and
            multi-venue hospitality groups.
          </p>
        </div>

        <div className="rounded-2xl bg-[#15151d] border border-white/5 p-6 sm:p-7">
          <h2 className="font-display text-xl font-bold text-white">Media assets</h2>
          <p className="mt-3 text-[15px] text-[#a1a1aa] leading-relaxed">
            Logos, product screenshots and founder headshots are available on request. Email us and we'll send
            over a media kit.
          </p>
          <a
            href="mailto:info@nuapos.com.au"
            data-testid="press-media-kit-request"
            className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-medium transition-all duration-200"
          >
            <Download className="w-4 h-4" />
            Request media kit
          </a>
        </div>

        <div className="rounded-2xl bg-[#15151d] border border-white/5 p-6 sm:p-7">
          <h2 className="font-display text-xl font-bold text-white">Media contact</h2>
          <p className="mt-3 text-[15px] text-[#a1a1aa] leading-relaxed">
            For interviews, comment, or media enquiries, reach our team directly.
          </p>
          <a
            href="mailto:info@nuapos.com.au"
            data-testid="press-contact-email"
            className="mt-4 inline-flex items-center gap-2 text-[#f58c14] hover:underline text-sm"
          >
            <Mail className="w-4 h-4" />
            info@nuapos.com.au
          </a>
        </div>
      </div>
    </PageShell>
  );
}
