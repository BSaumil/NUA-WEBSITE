import React from "react";

/**
 * Catches render-time errors so one broken section can't unmount the entire
 * app. Without a boundary, React 18 tears the whole tree down on an uncaught
 * render throw, which on a prerendered page means content paints and then
 * vanishes — worse than never rendering at all.
 *
 * Must be a class: there is no hook equivalent of componentDidCatch.
 */
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error("[ErrorBoundary]", this.props.name || "app", error, info?.componentStack);
    // PostHog is loaded from index.html and may be blocked or still loading.
    try {
      window.posthog?.captureException?.(error, {
        boundary: this.props.name || "app",
      });
    } catch {
      /* never let error reporting throw from inside the handler */
    }
  }

  render() {
    if (!this.state.failed) return this.props.children;
    // `fallback === null` lets a caller drop a non-essential section silently
    // rather than showing an error card in the middle of the page.
    if (this.props.fallback !== undefined) return this.props.fallback;

    return (
      <div
        role="alert"
        data-testid="error-boundary-fallback"
        className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center"
      >
        <h1 className="font-display text-2xl font-bold text-white">
          Something went wrong on this page.
        </h1>
        <p className="mt-3 max-w-md text-sm text-[#a1a1aa] leading-relaxed">
          The rest of the site is fine. Try reloading, or head back to the
          homepage.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="px-5 py-2.5 rounded-full bg-[#f58c14] hover:bg-[#d87b10] text-[#1a1005] font-medium text-sm transition-colors"
          >
            Reload page
          </button>
          {/* Full navigation, not a router link: the router may be the thing
              that failed, and this remounts the app from scratch. */}
          <a
            href="/"
            className="px-5 py-2.5 rounded-full border border-white/15 text-white font-medium text-sm hover:bg-white/5 transition-colors"
          >
            Go to homepage
          </a>
        </div>
      </div>
    );
  }
}
