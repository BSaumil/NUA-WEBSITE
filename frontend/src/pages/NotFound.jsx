import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Home, Mail } from "lucide-react";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";

export default function NotFound() {
  return (
    <PageShell testId="not-found-page">
      <PageHero
        eyebrow="404"
        title="This page doesn't exist."
        subtitle="The link might be old, mistyped, or the page has moved. Here's how to get back on track."
        accent="#f58c14"
      />

      <div className="relative max-w-2xl mx-auto px-6 lg:px-10 pb-24 lg:pb-32">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            data-testid="not-found-home-link"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#f58c14] hover:bg-[#d87b10] text-white font-medium text-sm shadow-xl shadow-[#f58c14]/25 transition-all duration-200 hover:-translate-y-0.5"
          >
            <Home className="w-4 h-4" />
            Back to homepage
          </Link>
          <Link
            to="/contact"
            data-testid="not-found-contact-link"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium text-sm transition-all duration-200"
          >
            <Mail className="w-4 h-4" />
            Tell us what broke
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
