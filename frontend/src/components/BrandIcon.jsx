import React from "react";

/**
 * NUA Pulse Grid mark: the brand icon used in the navbar, footer, and favicon set.
 * variant="mono" is for very small sizes (<24px) where the 2x2 grid would lose legibility.
 */
export default function BrandIcon({ size = 32, variant = "full", className = "" }) {
  if (variant === "mono") {
    return (
      <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
        <rect x="4" y="4" width="92" height="92" rx="20" fill="#f58c14" />
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
      <rect x="6" y="6" width="40" height="40" rx="10" fill="#f58c14" />
      <rect x="54" y="6" width="40" height="40" rx="10" fill="#8b5cf6" />
      <rect x="6" y="54" width="40" height="40" rx="10" fill="#ec4899" />
      <rect x="54" y="54" width="40" height="40" rx="10" fill="#1c1917" />
      <polyline
        points="60,27 65,27 68,17 72,39 75,27 88,27"
        fill="none" stroke="#ffffff" strokeWidth="4.2"
        strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}
