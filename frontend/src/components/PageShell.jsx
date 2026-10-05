import React from "react";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";

/**
 * The page shell: skip link, header, main, footer.
 *
 * `<main>` used to wrap the Navbar and Footer as well as the page content,
 * which put the banner and contentinfo landmarks *inside* the main landmark.
 * For anyone navigating by landmark that collapses the page into one region
 * and makes "skip to main content" meaningless, because main starts at the
 * top of the navigation. The outer element is now a plain div and `<main>`
 * contains only the page's own content.
 *
 * Two things still depend on this shape and are deliberately preserved:
 * `main > section` in index.css carries the content-visibility optimisation,
 * and scripts/prerender.js waits on `main[data-testid]` to know a route has
 * rendered. Both still match, because the sections remain direct children of
 * main and the test id moved with it.
 */
export default function PageShell({ testId, children }) {
  return (
    <div className="min-h-screen bg-nua-bg text-nua-ink font-body antialiased overflow-x-hidden">
      {/*
        Off-screen until focused, then pinned top-left. First thing in the DOM
        so it is the first stop for a keyboard user, which is the only position
        that makes it useful.
      */}
      <a
        href="#main-content"
        data-testid="skip-to-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2.5 focus:rounded-full focus:bg-nua-burgundy focus:text-white focus:text-sm focus:font-medium focus:shadow-lg"
      >
        Skip to content
      </a>

      <Navbar />

      <main id="main-content" data-testid={testId} tabIndex={-1}>
        {children}
      </main>

      <Footer />
    </div>
  );
}
