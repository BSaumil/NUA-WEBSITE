#!/usr/bin/env node
/**
 * Second pass of the ivory + burgundy migration: surfaces, not text.
 *
 * codemod-ivory.js swept foreground colours, because that is what a contrast
 * failure is made of. It left the backgrounds, borders, glows and gradients
 * alone, and those were tuned for a near-black page. On ivory a 25% violet
 * blurred to 160px is a lilac cloud, and a /15 violet chip behind burgundy
 * text is a second accent competing with the first.
 *
 * The rule here is by ROLE rather than by value, which is the mistake the
 * first pass made:
 *
 *   chip / icon tile / wash    -> burgundy wash, because the hue carried no
 *                                 meaning; it was there to lift off black
 *   chip or control outline    -> burgundy at low alpha, or the neutral border
 *   ambient glow orb           -> removed or reduced to a warm lift
 *   cool grey mockup surface   -> the warm neutral the rest of the page uses
 *
 * Deliberately NOT touched:
 *   - #22c55e and other semantic status colours. Green means operational, and
 *     a mockup showing a healthy service has to still read as healthy.
 *   - Dark bezel gradients (#3a3a42 -> #1b1b21 and friends). Those are device
 *     frames in the product mockups and are meant to be dark.
 *   - Identity colours in data/*.js. They are consumed as ~5% washes at the
 *     call site, which is the "very low saturation" the brief asks for.
 *   - The NUA icon SVG, which stays exactly as it is.
 */
const fs = require("fs");
const path = require("path");

const SRC = path.join(__dirname, "..", "src");
const SKIP_DIRS = new Set(["ui"]);
const SKIP_FILES = new Set(["docsData.js", "verticalsData.js", "imageManifest.js"]);

// Ordered. Outline rules run before fill rules so a border is not rewritten by
// a pattern meant for a background.
const RULES = [
  // --- chip and control outlines -------------------------------------------
  [/border-\[#8b5cf6\]\/(?:60|50)/g, "border-nua-burgundy/45"],
  [/border-\[#8b5cf6\]\/(?:30|25|20)/g, "border-nua-burgundy/20"],
  [/border-\[#8b5cf6\](?![\/\w])/g, "border-nua-burgundy"],
  [/border-\[#(?:f58c14|ec4899)\]\/\d+/g, "border-nua-burgundy/20"],

  // --- ambient glow orbs ---------------------------------------------------
  // These only ever existed to bloom against a black page.
  [/bg-\[#(?:8b5cf6|ec4899|f58c14)\]\/(?:30|25|20)(\s+blur-)/g, "bg-nua-burgundy/[0.05]$1"],

  // --- chips, icon tiles, washes -------------------------------------------
  [/bg-\[#(?:8b5cf6|ec4899|f58c14)\]\/\[0\.08\]/g, "bg-nua-burgundyWash"],
  [/bg-\[#(?:8b5cf6|ec4899|f58c14)\]\/(?:15|10)/g, "bg-nua-burgundyWash"],

  // --- rings on mockup avatars --------------------------------------------
  [/ring-\[#(?:8b5cf6|ec4899|f58c14)\]\/\d+/g, "ring-nua-burgundy/30"],

  // --- cool greys inside mockups on a warm page ----------------------------
  [/bg-\[#fafafb\]/g, "bg-nua-bgAlt"],
  [/bg-\[#fafbfc\]/g, "bg-nua-bgAlt"],
  [/bg-\[#f3f4f6\]/g, "bg-nua-border/60"],

  // --- dead lifts left over from the dark page -----------------------------
  // A 4% white over ivory is not a surface, it is a no-op that reads as an
  // unstyled element next to the real cards.
  [/bg-white\/\[0\.0\d\]/g, "bg-nua-surface"],
];

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.has(entry.name)) walk(path.join(dir, entry.name), out);
    } else if (/\.jsx?$/.test(entry.name) && !SKIP_FILES.has(entry.name)) {
      out.push(path.join(dir, entry.name));
    }
  }
  return out;
}

let files = 0;
let total = 0;
for (const file of walk(SRC)) {
  const before = fs.readFileSync(file, "utf8");
  let after = before;
  let n = 0;
  for (const [pattern, replacement] of RULES) {
    after = after.replace(pattern, (...args) => {
      n += 1;
      return replacement.replace(/\$(\d)/g, (_, i) => args[Number(i)]);
    });
  }
  if (n > 0) {
    fs.writeFileSync(file, after);
    files += 1;
    total += n;
    console.log(`${String(n).padStart(3)}  ${path.relative(SRC, file)}`);
  }
}
console.log(`\n${total} replacements across ${files} files`);
