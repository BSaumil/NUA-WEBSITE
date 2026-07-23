import React from "react";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";

export default function PageShell({ testId, children }) {
  return (
    <main data-testid={testId} className="min-h-screen bg-nua-bg text-[#eaeaea] font-body antialiased overflow-x-hidden">
      <Navbar />
      {children}
      <Footer />
    </main>
  );
}
