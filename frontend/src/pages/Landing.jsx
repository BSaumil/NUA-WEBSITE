import React from "react";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import BusinessModes from "@/components/sections/BusinessModes";
import OperatingWorlds from "@/components/sections/OperatingWorlds";
import Modules from "@/components/sections/Modules";
import NewFeatures from "@/components/sections/NewFeatures";
import MeetNua from "@/components/sections/MeetNua";
import Voice from "@/components/sections/Voice";
import Reservations from "@/components/sections/Reservations";
import Loyalty from "@/components/sections/Loyalty";
import Inventory from "@/components/sections/Inventory";
import Staff from "@/components/sections/Staff";
import MultiLocation from "@/components/sections/MultiLocation";
import MoreModules from "@/components/sections/MoreModules";
import Analytics from "@/components/sections/Analytics";
import LiveGallery from "@/components/sections/LiveGallery";
import Integrations from "@/components/sections/Integrations";
import WhyNua from "@/components/sections/WhyNua";
import Pricing from "@/components/sections/Pricing";
import FinalCta from "@/components/sections/FinalCta";
import Footer from "@/components/sections/Footer";
import SEO from "@/components/SEO";

export default function Landing() {
  return (
    // Same landmark structure as PageShell. The homepage composes its sections
    // directly rather than going through the shell, which is why the shell's
    // skip link and landmark fix did not reach the one page most people see.
    <div className="min-h-screen bg-nua-bg text-nua-ink font-body antialiased overflow-x-hidden">
      <SEO
        title="NUA: The Operating System for Modern Business"
        description="One operating system for hospitality, retail and service businesses in Australia: point of sale, bookings, stock, staff, loyalty and forecasting, with NUA Agent handling the admin between them."
        path="/"
        includeSoftware
      />
      <a
        href="#main-content"
        data-testid="skip-to-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2.5 focus:rounded-full focus:bg-nua-burgundy focus:text-white focus:text-sm focus:font-medium focus:shadow-lg"
      >
        Skip to content
      </a>

      <Navbar />

      <main id="main-content" data-testid="landing-page" tabIndex={-1}>
      <Hero />
      <BusinessModes />
      <OperatingWorlds />
      <Modules />
      <NewFeatures />
      <MeetNua />
      <Voice />
      <Reservations />
      <Loyalty />
      <Inventory />
      <Staff />
      <MultiLocation />
      <MoreModules />
      <Analytics />
      <LiveGallery />
      <Integrations />
      <WhyNua />
      <Pricing />
      <FinalCta />
      </main>

      <Footer />
    </div>
  );
}
