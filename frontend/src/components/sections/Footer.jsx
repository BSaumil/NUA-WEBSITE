import React from "react";
import { Sparkles, Twitter, Linkedin, Github } from "lucide-react";

const cols = [
  {
    title: "Platform",
    items: ["Point of Sale", "Reservations", "Kitchen Display", "Loyalty", "Inventory", "Staff", "Analytics", "Voice POS"],
  },
  {
    title: "AI Agent",
    items: ["Meet NUA", "Decision feed", "Voice control", "Forecasting", "Automation library", "Audit trail"],
  },
  {
    title: "Solutions",
    items: ["Quick service", "Casual dining", "Cafes", "Fine dining", "Bars", "Hospitality groups"],
  },
  {
    title: "Company",
    items: ["About", "Customers", "Careers", "Blog", "Press", "Contact"],
  },
];

export default function Footer() {
  return (
    <footer data-testid="footer" className="relative border-t border-white/5 bg-nua-bg">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#f58c14] via-[#ec4899] to-[#8b5cf6] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-display text-xl font-bold text-white tracking-tight">NUA</span>
            </div>
            <p className="mt-4 text-sm text-[#a1a1aa] max-w-xs">
              The AI operating system for hospitality. Built by operators, for operators who refuse to be ordinary.
            </p>
            <div className="mt-6 flex gap-2">
              {[Twitter, Linkedin, Github].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  data-testid={`footer-social-${i}`}
                  className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-[#a1a1aa] hover:text-white hover:border-white/20 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <div className="font-mono text-[10px] uppercase tracking-widest text-[#a1a1aa]">{c.title}</div>
              <ul className="mt-4 space-y-2.5">
                {c.items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-[#eaeaea] hover:text-[#f58c14] transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="font-mono text-[11px] text-[#a1a1aa]">
            © {new Date().getFullYear()} NUA Hospitality OS. All rights reserved.
          </p>
          <div className="flex items-center gap-5 font-mono text-[11px] text-[#a1a1aa]">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Security</a>
            <a href="#" className="hover:text-white transition-colors">Status</a>
            <span data-testid="footer-heart-nua">❤️ NUA</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
