import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import BrandIcon from "@/components/BrandIcon";
import LeadCta from "@/components/LeadCta";

const navItems = [
  { label: "Features", to: "/features" },
  { label: "Solutions", to: "/solutions" },
  { label: "Platform", to: "/platform" },
  { label: "AI Agent", to: "/ai-agent" },
  { label: "Integrations", to: "/integrations" },
  { label: "Pricing", to: "/pricing" },
  { label: "Resources", to: "/resources" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-[12px] bg-[rgba(250,248,243,0.94)] border-b border-nua-border"
          : "bg-transparent"
      }`}
      data-testid="navbar"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        <Link to="/" data-testid="navbar-logo" className="flex items-center gap-2 group">
          <BrandIcon size={32} />
          <span className="font-display text-xl font-bold text-nua-burgundy tracking-tight uppercase">NUA</span>
          <span className="hidden sm:inline-block font-mono text-[10px] text-nua-ink2 uppercase tracking-widest border border-nua-border rounded-full px-2 py-0.5 ml-1">Operating System</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              data-testid={`nav-link-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
              className="px-3 py-2 text-sm text-nua-ink hover:text-nua-burgundy transition-colors duration-200 rounded-md hover:bg-nua-burgundyWash"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <LeadCta
            type="trial"
            label="Start Free Trial"
            testId="navbar-trial-btn"
            className="text-sm px-4 py-2 rounded-full border border-[#8b5cf6]/60 text-nua-burgundy hover:bg-[#8b5cf6]/10 transition-all duration-200"
          />
          <LeadCta
            type="demo"
            label="Book Demo"
            testId="navbar-demo-btn"
            className="text-sm px-4 py-2 rounded-full bg-nua-burgundy text-white hover:bg-nua-burgundyDark transition-all duration-200 font-medium shadow-lg shadow-nua-burgundy/20"
          />
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          data-testid="navbar-mobile-toggle"
          className="lg:hidden text-nua-ink p-2 -mr-2"
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-nua-border bg-nua-bg/95 backdrop-blur-xl">
          <div className="px-6 py-4 flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                onClick={() => setOpen(false)}
                className="text-sm text-nua-ink2 hover:text-nua-ink py-2"
              >
                {item.label}
              </Link>
            ))}
            <LeadCta
              type="demo"
              label="Book Demo"
              onClick={() => setOpen(false)}
              className="mt-2 text-center text-sm px-4 py-2.5 rounded-full bg-nua-burgundy text-white font-medium"
            />
          </div>
        </div>
      )}
    </motion.header>
  );
}
