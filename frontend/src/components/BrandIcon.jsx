import React from "react";

/**
 * NUA Pulse Grid mark: the brand icon used in the navbar, footer, and favicon set.
 * variant="mono" is for very small sizes (<24px) where the 2x2 grid would lose legibility.
 *
 * THESE FOUR FILLS ARE THE BRAND AND ARE NOT PART OF THE SITE PALETTE.
 *
 * The ivory migration's codemod swept them once — #f58c14 became #A45D0D and
 * so on — because it matched colour values rather than the role a colour
 * plays, and a logo is not a UI surface. They are restored here to the supplied
 * artwork and must stay exactly as they are: a mark that shifts with a theme
 * is not a mark. scripts/check-brand-mark.js fails the build if they drift.
 */
export const BRAND_FILLS = {
  orange: "#f58c14",
  purple: "#8b5cf6",
  pink: "#ec4899",
  ink: "#1c1917",
};

export default function BrandIcon({ size = 32, variant = "full", className = "" }) {
  if (variant === "mono") {
    return (
      <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
        <rect x="4" y="4" width="92" height="92" rx="20" fill={BRAND_FILLS.orange} />
        <polyline
          points="22,54 34,54 40,32 51,70 59,54 78,54"
          fill="none" stroke="#ffffff" strokeWidth="7.5"
          strokeLinecap="round" strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
      <rect x="6" y="6" width="40" height="40" rx="10" fill={BRAND_FILLS.orange} />
      <rect x="54" y="6" width="40" height="40" rx="10" fill={BRAND_FILLS.purple} />
      <rect x="6" y="54" width="40" height="40" rx="10" fill={BRAND_FILLS.pink} />
      <rect x="54" y="54" width="40" height="40" rx="10" fill={BRAND_FILLS.ink} />
      <polyline
        points="60,27 65,27 68,17 72,39 75,27 88,27"
        fill="none" stroke="#ffffff" strokeWidth="4.2"
        strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}
