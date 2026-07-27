import React from "react";

export default function LegalSection({ number, title, children }) {
  return (
    <section className="py-7 border-b border-white/5 last:border-0" data-testid={`legal-section-${number}`}>
      <h2 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
        {number}. {title}
      </h2>
      <div className="mt-3 space-y-3 text-[15px] text-[#a1a1aa] leading-relaxed [&_a]:text-[#f58c14] [&_a]:hover:underline [&_strong]:text-[#eaeaea] [&_strong]:font-semibold [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1.5 [&_li]:pl-1">
        {children}
      </div>
    </section>
  );
}
