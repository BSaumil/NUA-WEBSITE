import React from "react";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import Modules from "@/components/sections/Modules";
import MeetNua from "@/components/sections/MeetNua";
import Voice from "@/components/sections/Voice";
import Reservations from "@/components/sections/Reservations";
import Loyalty from "@/components/sections/Loyalty";
import Inventory from "@/components/sections/Inventory";
import Staff from "@/components/sections/Staff";
import MultiLocation from "@/components/sections/MultiLocation";
import Analytics from "@/components/sections/Analytics";
import LiveGallery from "@/components/sections/LiveGallery";
import Integrations from "@/components/sections/Integrations";
import WhyNua from "@/components/sections/WhyNua";
import Pricing from "@/components/sections/Pricing";
import FinalCta from "@/components/sections/FinalCta";
import Footer from "@/components/sections/Footer";

export default function Landing() {
  return (
    <main data-testid="landing-page" className="min-h-screen bg-nua-bg text-[#eaeaea] font-body antialiased overflow-x-hidden">
      <Navbar />
      <Hero />
      <Modules />
      <MeetNua />
      <Voice />
      <Reservations />
      <Loyalty />
      <Inventory />
      <Staff />
      <MultiLocation />
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
