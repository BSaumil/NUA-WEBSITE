#!/usr/bin/env node
/**
 * The dark theme's palette must not reappear in components or pages.
 *
 * Three separate sweeps have now each left some of it behind, because each one
 * matched the shape of the code it was written for and the next leftover was
 * always in a shape nobody had thought of yet:
 *
 *   codemod-ivory      swept `text-*` foregrounds; missed every background,
 *                      border, glow and gradient
 *   codemod-surfaces   swept className utilities and inline style backgrounds;
 *                      missed SVG presentation attributes, so 22 chart strokes,
 *                      fills and gradient stops were still on the old palette
 *                      and shipped to production
 *
 * So this enumerates the retired VALUES, which is a closed set, and flags them
 * in the positions where a colour becomes INK — the stroke, fill or text that
 * a reader has to see against a ground:
 *
 *   stroke="..."  fill="..."  stopColor="..."     SVG presentation attributes
 *   text-[#...]                                   Tailwind foreground
 *   color: "..."                                  inline style
 *
 * It deliberately does NOT flag these values in data position. The module
 * identity colours are still legitimate there: they reach the page as ~5-20%
 * washes and as small dots, never as ink, and a first draft of this check that
 * matched on value alone reported 106 findings of which none was a defect.
 * A guard that cries wolf at that rate gets switched off, so it only asserts
 * what it can actually be sure about.
 *
 * Allowed to keep these values even in ink position:
 *   components/BrandIcon.jsx  the brand mark is not part of the site palette;
 *                             check-brand-mark.js asserts it separately
 *   src/theme/mockupPalette   the sanctioned home for the icon hues used inside
 *                             product mockups, where colour is information
 *                             (which table is seated, which shift the agent
 *                             assigned). Not scanned, because it is the one
 *                             place these values are meant to be declared —
 *                             which is exactly why call sites should import
 *                             from it rather than retyping a hex.
 */
const fs = require("fs");
const path = require("path");

const SRC = path.join(__dirname, "..", "src");
const ROOTS = ["components", "pages"];
const ALLOW = new Set([path.join("components", "BrandIcon.jsx")]);

// Retired: the original dark-theme palette, and the darkened variants the
// first migration produced from it.
const RETIRED = [
  "#f58c14", "#8b5cf6", "#ec4899", "#7c3aed", "#f97362",  // original accents
  "#A45D0D", "#7D52DD", "#BF3A7B", "#157E3C",             // darkened variants
  "#d4d4d8", "#eaeaea", "#a1a1aa", "#94a3b8", "#facc15",  // dark-theme greys
  "#0f0f17", "#1a1a22", "#52525b", "#71717a", "#6b6b75",
  "#5c5c66", "#5f5f6b", "#8a4a00", "#c66a00", "#a16207",
];

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (entry.name !== "ui") walk(path.join(dir, entry.name), out);
    } else if (/\.jsx?$/.test(entry.name)) {
      out.push(path.join(dir, entry.name));
    }
  }
  return out;
}

const findings = [];
for (const root of ROOTS) {
  for (const file of walk(path.join(SRC, root))) {
    const rel = path.relative(SRC, file);
    if (ALLOW.has(rel)) continue;
    const lines = fs.readFileSync(file, "utf8").split("\n");
    lines.forEach((line, i) => {
      for (const hex of RETIRED) {
        // Ink positions only. `color: "#A45D0D"` inside a data array is fine;
        // `stroke="#A45D0D"` on a chart path is not.
        // Only positions that are unambiguously ink. An inline style's
        // `color: "#..."` is indistinguishable by regex from an object
        // literal's `color:` key in a data array, and the data use is
        // legitimate, so that case is deliberately not checked here — the
        // rendered contrast audit covers it instead.
        const ink = new RegExp(
          `(?:stroke|fill|stopColor|stop-color)\\s*=\\s*["']${hex}` +
          `|text-\\[${hex}\\]`,
          "i"
        );
        if (ink.test(line)) {
          findings.push({ rel, line: i + 1, hex, text: line.trim().slice(0, 90) });
        }
      }
    });
  }
}

if (findings.length) {
  console.error(`check-retired-palette: ${findings.length} retired colour(s) still in use\n`);
  for (const f of findings) {
    console.error(`  ${f.rel}:${f.line}  ${f.hex}`);
    console.error(`      ${f.text}`);
  }
  console.error("\nUse a token from tailwind.config.js (nua-burgundy, nua-ink, nua-ink2,");
  console.error("nua-muted, nua-border...) instead. Module identity colours belong in");
  console.error("src/data and should reach the page as a low-opacity wash, not as ink.");
  process.exit(1);
}

console.log("check-retired-palette: no retired dark-theme colours in components or pages");
