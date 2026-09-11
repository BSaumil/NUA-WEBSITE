#!/usr/bin/env node
/**
 * The brand mark is not part of the site palette and must not drift with it.
 *
 * This exists because it already happened once: the ivory migration's codemod
 * rewrote the four fills in BrandIcon.jsx (#f58c14 -> #A45D0D, #8b5cf6 ->
 * #7D52DD, #ec4899 -> #BF3A7B) while sweeping UI colours, because it matched
 * on colour value rather than on the role the colour plays. Nothing caught it:
 * a darkened logo still renders, still passes contrast, and still looks
 * deliberate. It was spotted only when the supplied artwork was compared
 * against the running site by hand.
 *
 * So the mark gets an assertion of its own, against the supplied artwork.
 */
const fs = require("fs");
const path = require("path");

const FILE = path.join(__dirname, "..", "src", "components", "BrandIcon.jsx");

// From the supplied NUA logo artwork. Changing these means the brand changed.
const EXPECTED = {
  orange: "#f58c14",
  purple: "#8b5cf6",
  pink: "#ec4899",
  ink: "#1c1917",
};

const src = fs.readFileSync(FILE, "utf8");
const errors = [];

for (const [name, hex] of Object.entries(EXPECTED)) {
  // Anchored: an unanchored `ink:` also matches inside `pink:`.
  const declared = new RegExp(`(?:^|[\\s{,])${name}:\\s*"([^"]+)"`, "m").exec(src);
  if (!declared) {
    errors.push(`BRAND_FILLS.${name} is missing from BrandIcon.jsx`);
  } else if (declared[1].toLowerCase() !== hex) {
    errors.push(`BRAND_FILLS.${name} is ${declared[1]}, expected ${hex}`);
  }
}

// The fills must be consumed from the constant, not re-inlined next to it.
const inlined = src.match(/fill="#[0-9a-fA-F]{6}"/g) || [];
for (const f of inlined) {
  errors.push(`${f} is hard-coded in BrandIcon.jsx; use BRAND_FILLS so the guard can see it`);
}

if (errors.length) {
  console.error("check-brand-mark: the NUA mark has drifted from the supplied artwork\n");
  for (const e of errors) console.error(`  - ${e}`);
  console.error("\nIf the brand genuinely changed, update EXPECTED in this script too.");
  process.exit(1);
}

console.log("check-brand-mark: brand mark matches the supplied artwork");
