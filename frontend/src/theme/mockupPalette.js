/**
 * The palette for product mockups — NOT for site chrome.
 *
 * The site runs one accent: burgundy on ivory. A dashboard does not. Inside a
 * mockup, colour is information — it is how a floor plan says T2 is occupied
 * and T4 is reserved, and how four KPI tiles read as four different metrics
 * rather than one repeated four times. Flattening the mockups to burgundy made
 * them consistent with the page and useless as pictures of the product.
 *
 * So mockups use the NUA icon colours. The mark is the one place the brand is
 * already multicolour, which makes it the honest source for this.
 *
 * TWO TIERS, and the difference matters:
 *
 *   MOCKUP        the true icon hues. Use for marks that carry NO text —
 *                 chart bars, sparklines, status dots, occupancy blocks,
 *                 waveforms, borders, washes.
 *
 *   MOCKUP_SOLID  the same hues deepened just enough that text sits on them at
 *                 AA. Use whenever a fill has a label, number or icon on top.
 *                 Each entry names the ink that passes and the ratio, measured
 *                 rather than assumed.
 *
 * Reaching for a raw hex instead of these is what check-retired-palette.js
 * exists to catch: going through this module is the signal that a colour is
 * deliberate mockup vocabulary rather than a leftover from the dark theme.
 */

/** True NUA icon hues. No text on these. */
export const MOCKUP = {
  orange: "#f58c14",
  purple: "#8b5cf6",
  pink: "#ec4899",
  ink: "#1c1917",
};

/**
 * Deepened for text. `on` is the ink to use; `ratio` is its measured contrast
 * against that fill. Orange keeps its true brand value because dark ink already
 * clears AA on it, so the one hue people recognise most stays exact.
 */
export const MOCKUP_SOLID = {
  orange: { bg: "#f58c14", on: "#29241E", ratio: 6.33 },
  purple: { bg: "#7c3aed", on: "#FFFFFF", ratio: 5.70 },
  pink: { bg: "#db2777", on: "#FFFFFF", ratio: 4.60 },
  ink: { bg: "#1c1917", on: "#FFFFFF", ratio: 17.49 },
};

/**
 * Hairline strokes — sparklines, 1-2px chart lines.
 *
 * A 1.5px line needs more weight than a filled block to read at all: true
 * brand orange is 2.39:1 against an ivory card, which is fine for a large
 * shape and close to invisible as a hairline. These are the same hues carried
 * to at least 4.9:1, which is what a thin line actually needs. Use MOCKUP for
 * anything with area.
 */
export const MOCKUP_LINE = {
  orange: "#b45309",
  purple: "#7c3aed",
  pink: "#be185d",
  ink: "#29241E",
};

/**
 * The NUA Agent confidence tiers, as chips on a light card.
 *
 * Approved and Suggested had both become burgundy, so two of the three tiers
 * were indistinguishable — on a component whose entire subject is that the
 * agent behaves differently at different confidence. `text` is measured
 * against `wash` over the ivory surface; each chip also carries its label.
 */
export const MOCKUP_TIER = {
  executed: { wash: "rgba(16,185,129,0.12)", text: "#046C4E", dot: "#059669", label: "Executed" },
  approved: { wash: "rgba(139,92,246,0.12)", text: "#6d28d9", dot: "#7c3aed", label: "Approved" },
  suggested: { wash: "rgba(245,140,20,0.14)", text: "#8a4a00", dot: "#d97706", label: "Suggested" },
};

/**
 * Mockup state colours, kept semantic so a reader can tell states apart without
 * relying on hue alone — every call site also carries a label or a shape.
 */
export const MOCKUP_STATE = {
  reserved: MOCKUP_SOLID.purple,
  occupied: MOCKUP_SOLID.ink,
  vip: MOCKUP_SOLID.pink,
  attention: MOCKUP_SOLID.orange,
};
