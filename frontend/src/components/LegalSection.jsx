import React from "react";

export default function LegalSection({ number, title, children }) {
  return (
    <section className="py-7 border-b border-nua-border last:border-0" data-testid={`legal-section-${number}`}>
      <h2 className="font-display text-xl sm:text-2xl font-bold text-nua-ink tracking-tight">
        {number}. {title}
      </h2>
      <div className="mt-3 space-y-3 text-[15px] text-nua-ink2 leading-relaxed [&_a]:text-nua-burgundy [&_a]:hover:underline [&_strong]:text-nua-ink [&_strong]:font-semibold [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1.5 [&_li]:pl-1">
        {children}
      </div>
    </section>
  );
}
