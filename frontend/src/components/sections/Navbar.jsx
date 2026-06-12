import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";
import { useModals } from "@/components/ModalProvider";

const navItems = [
  { label: "Features", href: "#modules" },
  { label: "Solutions", href: "#reservations" },
  { label: "Platform", href: "#analytics" },
  { label: "AI Agent", href: "#ash" },
  { label: "Integrations", href: "#integrations" },
  { label: "Pricing", href: "#pricing" },
  { label: "Resources", href: "#why-nua" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { openLead } = useModals();

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
          ? "backdrop-blur-xl bg-[#0b0b0f]/70 border-b border-white/5"
          : "bg-transparent"
      }`}
      data-testid="navbar"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        <a href="#hero" data-testid="navbar-logo" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#f58c14] via-[#ec4899] to-[#8b5cf6] flex items-center justify-center shadow-lg shadow-[#8b5cf6]/30">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-display text-xl font-bold text-white tracking-tight">NUA</span>
          <span className="hidden sm:inline-block font-mono text-[10px] text-[#a1a1aa] uppercase tracking-widest border border-white/10 rounded-full px-2 py-0.5 ml-1">Restaurant OS</span>
        </a>

        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              data-testid={`nav-link-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
              className="px-3 py-2 text-sm text-[#a1a1aa] hover:text-white transition-colors duration-200 rounded-md hover:bg-white/5"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <button
            type="button"
            onClick={() => openLead({ type: "trial" })}
            data-testid="navbar-trial-btn"
            className="text-sm px-4 py-2 rounded-full border border-[#8b5cf6]/60 text-[#c4b5fd] hover:bg-[#8b5cf6]/10 transition-all duration-200"
          >
            Start Free Trial
          </button>
          <button
            type="button"
            onClick={() => openLead({ type: "demo" })}
            data-testid="navbar-demo-btn"
            className="text-sm px-4 py-2 rounded-full bg-[#f58c14] text-white hover:bg-[#d87b10] transition-all duration-200 font-medium shadow-lg shadow-[#f58c14]/20"
          >
            Book Demo
          </button>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          data-testid="navbar-mobile-toggle"
          className="lg:hidden text-white p-2 -mr-2"
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-white/5 bg-[#0b0b0f]/95 backdrop-blur-xl">
          <div className="px-6 py-4 flex flex-col gap-2">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-sm text-[#a1a1aa] hover:text-white py-2"
              >
                {item.label}
              </a>
            ))}
            <a href="#final-cta" className="mt-2 text-center text-sm px-4 py-2.5 rounded-full bg-[#f58c14] text-white font-medium" onClick={(e) => { e.preventDefault(); setOpen(false); openLead({ type: "demo" }); }}>
              Book Demo
            </a>
          </div>
        </div>
      )}
    </motion.header>
  );
}
