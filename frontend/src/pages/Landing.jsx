import React from "react";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
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
    <main data-testid="landing-page" className="min-h-screen bg-nua-bg text-[#eaeaea] font-body antialiased overflow-x-hidden">
      <SEO
        title="NUA: Restaurant OS"
        description="Point of sale built for independent hospitality venues. Payments, bookings, loyalty and forecasting in one system."
        canonical="https://nuapos.com.au/"
      />
      <Navbar />
      <Hero />
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
      <Footer />
    </main>
  );
}
