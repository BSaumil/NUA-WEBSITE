#!/usr/bin/env node
/**
 * One-off codemod: dark theme -> the ivory + burgundy design system.
 *
 * Run once, reviewed as a diff, then kept in the repository as the record of
 * exactly what the mechanical part of the redesign did. It is not wired into
 * any build.
 *
 * Order matters. Compound CTA patterns are rewritten before the general text
 * sweep, because a primary button's `text-white` is correct on burgundy and
 * must not be swept to charcoal along with every heading.
 *
 * What it deliberately does NOT touch:
 *   - docsData / verticalsData module colours. Those drive the brand icon
 *     tints, which the brief requires to stay unchanged.
 *   - Anything under components/ui. Those shadcn primitives read the CSS
 *     variables repointed in index.css, so they follow the system already.
 *   - Photography and product imagery.
 */
const fs = require("fs");
const path = require("path");

const SRC = path.resolve(__dirname, "..", "src");
const SKIP_DIRS = new Set(["ui"]);
const SKIP_FILES = new Set(["docsData.js", "verticalsData.js", "imageManifest.js"]);

// [pattern, replacement, label] — applied in this order.
const RULES = [
  // ---- 1. Primary CTA: orange -> burgundy, keeping white text -------------
  [/bg-\[#f58c14\] hover:bg-\[#d87b10\] text-\[#1a1005\]/g,
   "bg-nua-burgundy hover:bg-nua-burgundyDark text-white", "primary CTA"],
  [/bg-\[#f58c14\] text-\[#1a1005\]/g, "bg-nua-burgundy text-white", "CTA no-hover"],
  [/hover:bg-\[#d87b10\]/g, "hover:bg-nua-burgundyDark", "CTA hover"],
  [/text-\[#1a1005\]/g, "text-white", "CTA label"],
  [/shadow-\[#f58c14\]\/(\d+)/g, "shadow-nua-burgundy/$1", "CTA shadow"],

  // ---- 2. Accent colour: orange and purple -> burgundy --------------------
  // The brief keeps the icon palette for low-opacity tints only, so solid and
  // text uses of orange/purple as an accent become burgundy.
  [/text-\[#f58c14\]/g, "text-nua-burgundy", "accent text"],
  [/bg-\[#f58c14\](?!\/)/g, "bg-nua-burgundy", "accent fill"],
  [/border-\[#f58c14\]/g, "border-nua-burgundy", "accent border"],
  [/text-\[#8b5cf6\]/g, "text-nua-burgundy", "purple text"],
  [/text-\[#6d28d9\]/g, "text-nua-burgundy", "purple text dark"],
  [/text-\[#c4b5fd\]/g, "text-nua-burgundy", "purple text light"],
  [/text-\[#fbcfe8\]/g, "text-nua-burgundy", "pink text light"],
  [/text-\[#ec4899\]/g, "text-nua-burgundy", "pink text"],

  // ---- 3. Surfaces --------------------------------------------------------
  [/bg-\[#15151d\]/g, "bg-nua-surface", "card surface"],
  [/bg-\[#1c1c26\]/g, "bg-nua-surface", "raised surface"],
  [/bg-\[#0b0b0f\]/g, "bg-nua-bg", "page ground"],
  [/bg-\[#f6f7fb\]/g, "bg-nua-bgAlt", "light section"],
  [/bg-white\/\[0\.03\]/g, "bg-nua-bgAlt", "faint white fill"],
  [/bg-white\/\[0\.02\]/g, "bg-nua-bgAlt", "faint white fill 2"],
  [/bg-white\/5(?![0-9])/g, "bg-nua-bgAlt", "white/5 fill"],
  [/bg-white\/10(?![0-9])/g, "bg-nua-bgAlt", "white/10 fill"],

  // ---- 4. Type ------------------------------------------------------------
  // Runs AFTER the CTA rules above, so button labels are already `text-white`
  // by intent rather than by inheritance from the dark theme.
  [/text-\[#eaeaea\]/g, "text-nua-ink", "body text"],
  [/text-\[#a1a1aa\]/g, "text-nua-ink2", "secondary text"],
  [/text-\[#666670\]/g, "text-nua-muted", "muted text"],
  [/text-\[#444450\]/g, "text-nua-ink2", "muted text on light"],
  [/text-\[#0f0f14\]/g, "text-nua-ink", "ink on light section"],

  // ---- 5. Lines -----------------------------------------------------------
  [/border-white\/5(?![0-9])/g, "border-nua-border", "hairline"],
  [/border-white\/10(?![0-9])/g, "border-nua-border", "hairline 10"],
  [/border-white\/20(?![0-9])/g, "border-nua-borderStrong", "hairline 20"],
  [/border-black\/5(?![0-9])/g, "border-nua-border", "black hairline"],
  [/divide-white\/5(?![0-9])/g, "divide-nua-border", "divider"],
];

// `text-white` is swept last and separately: by this point every legitimate
// white-on-burgundy label has been set explicitly by rule 1, so what remains
// is dark-theme heading text.
const WHITE_TEXT = [/\btext-white\b/g, "text-nua-ink"];

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.has(entry.name)) walk(path.join(dir, entry.name), out);
    } else if (/\.(jsx|js)$/.test(entry.name) && !SKIP_FILES.has(entry.name)) {
      out.push(path.join(dir, entry.name));
    }
  }
  return out;
}

const counts = {};
let touched = 0;

for (const file of walk(SRC)) {
  const before = fs.readFileSync(file, "utf8");
  let after = before;

  for (const [re, to, label] of RULES) {
    const n = (after.match(re) || []).length;
    if (n) {
      counts[label] = (counts[label] || 0) + n;
      after = after.replace(re, to);
    }
  }

  const n = (after.match(WHITE_TEXT[0]) || []).length;
  if (n) {
    counts["heading text-white"] = (counts["heading text-white"] || 0) + n;
    after = after.replace(WHITE_TEXT[0], WHITE_TEXT[1]);
  }

  if (after !== before) {
    fs.writeFileSync(file, after);
    touched += 1;
  }
}

console.log(`codemod-ivory: rewrote ${touched} files\n`);
for (const [label, n] of Object.entries(counts).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${String(n).padStart(4)}  ${label}`);
}
