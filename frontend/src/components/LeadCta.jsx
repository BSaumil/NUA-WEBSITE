import React from "react";
import { useModals } from "@/components/ModalProvider";
import { LEAD_CAPTURE_ENABLED, SUPPORT_EMAIL } from "@/config/siteConfig";

/**
 * Single gate for every "Book a Demo" / "Start Free Trial" style button.
 * While LEAD_CAPTURE_ENABLED is false, either renders nothing (fallback="hide",
 * the default) or swaps to a mailto CTA (fallback="email") so a button never
 * hides while its surrounding copy keeps promising it.
 */
export default function LeadCta({
  type = "demo",
  plan,
  label,
  className,
  testId,
  icon: Icon,
  iconClassName = "w-4 h-4",
  fallback = "hide",
  fallbackLabel,
  onClick,
}) {
  const { openLead } = useModals();

  if (!LEAD_CAPTURE_ENABLED) {
    if (fallback === "hide") return null;
    return (
      <a href={`mailto:${SUPPORT_EMAIL}`} data-testid={testId} className={className}>
        {fallbackLabel || SUPPORT_EMAIL}
        {Icon && <Icon className={iconClassName} />}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={() => {
        onClick?.();
        openLead({ type, plan });
      }}
      data-testid={testId}
      className={className}
    >
      {label}
      {Icon && <Icon className={iconClassName} />}
    </button>
  );
}
