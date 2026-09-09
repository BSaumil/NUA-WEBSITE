import React, { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * The trade word in the hero headline, cycling Hospitality → Retail → Services.
 *
 * Three constraints shape this:
 *
 * 1. **Exactly one word of text.** The first version reserved width with an
 *    invisible copy of the longest word and added an sr-only list of all three.
 *    Both are text nodes, so the prerendered <h1> read "…for Modern
 *    HospitalityHospitalityHospitality, Retail and Services" — the word three
 *    times, in the most important heading on the site. Width is now reserved
 *    with min-width instead, and the three trades are named by the section
 *    directly below rather than smuggled into the headline.
 *
 * 2. **The painted text is never hidden.** The headline is the page's Largest
 *    Contentful Paint element and is prerendered, so the first word is plain
 *    server-side text and rotation begins only after mount. Animating the
 *    headline on mount was previously measured at ~0.8s of LCP delay.
 *
 * 3. **Hospitality stays first.** It is the current positioning and the term
 *    the page ranks for, so the HTML Google indexes still reads as it does
 *    today while the live page says NUA runs three trades.
 *
 * Reduced motion stops the rotation rather than speeding it up — the point of
 * the preference is no unrequested movement, and the first word alone reads
 * correctly.
 */
const TRADES = ["Hospitality", "Retail", "Services"];
const INTERVAL_MS = 2600;

export default function RotatingTrade() {
  const prefersReducedMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) return undefined;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % TRADES.length),
      INTERVAL_MS
    );
    return () => clearInterval(id);
  }, [prefersReducedMotion]);

  const word = TRADES[index];

  return (
    <span
      className="relative inline-block align-baseline text-left"
      // Sized to the longest trade so the centred headline does not reflow as
      // shorter words cycle through. ch is approximate against a display face,
      // so this is rounded up rather than fitted exactly.
      style={{ minWidth: "10.5ch" }}
    >
      <span key={word} className="text-shimmer animate-trade-in">
        {word}
      </span>
    </span>
  );
}
