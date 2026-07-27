import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, Twitter, Linkedin, Github } from "lucide-react";

const cols = [
  {
    title: "Platform",
    items: [
      { label: "Point of Sale", to: "/features#pos" },
      { label: "Reservations", to: "/features#reservations" },
      { label: "Kitchen Display", to: "/features#kds" },
      { label: "Loyalty", to: "/features#loyalty" },
      { label: "Inventory", to: "/features#inventory" },
      { label: "Staff", to: "/features#staff" },
      { label: "Analytics", to: "/features#analytics" },
      { label: "Voice POS", to: "/features#voice" },
    ],
  },
  {
    title: "AI Agent",
    items: [
      { label: "Meet NUA", to: "/ai-agent" },
      { label: "Decision feed", to: "/ai-agent#nua" },
      { label: "Voice control", to: "/ai-agent#voice" },
      { label: "Forecasting", to: "/ai-agent#forecasting" },
      { label: "Automation library", to: "/ai-agent#automation-library" },
      { label: "Audit trail", to: "/ai-agent#audit-trail" },
    ],
  },
  {
    title: "Solutions",
    items: [
      { label: "Quick service", to: "/solutions/quick-service" },
      { label: "Casual dining", to: "/solutions/casual-dining" },
      { label: "Cafes", to: "/solutions/cafes" },
      { label: "Fine dining", to: "/solutions/fine-dining" },
      { label: "Bars", to: "/solutions/bars" },
      { label: "Hospitality groups", to: "/solutions/hospitality-groups" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About", to: "/about" },
      { label: "Customers", to: "/customers" },
      { label: "Careers", to: "/careers" },
      { label: "Blog", to: "/blog" },
      { label: "Press", to: "/press" },
      { label: "Contact", to: "/contact" },
    ],
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
                  <li key={item.label}>
                    <Link
                      to={item.to}
                      data-testid={`footer-link-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-sm text-[#eaeaea] hover:text-[#f58c14] transition-colors"
                    >
                      {item.label}
                    </Link>
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
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
            <a href="#" className="hover:text-white transition-colors">Security</a>
            <a href="#" className="hover:text-white transition-colors">Status</a>
            <span data-testid="footer-heart-nua">❤️ NUA</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
