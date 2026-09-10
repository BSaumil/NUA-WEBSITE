#!/usr/bin/env node
/**
 * Every module in docsData appears in exactly one operating world.
 *
 * The homepage groups all eighteen modules under Sell / Serve / Operate / Grow
 * / Know. A module added to docsData without a home there gets a documentation
 * page and a place in the module count, but silently never appears on the
 * homepage — the kind of omission nobody notices until someone asks why their
 * feature is not on the site.
 *
 * This started life as a `process.env.NODE_ENV !== "production"` throw inside
 * the component. That was useless: CRA strips it from every real build, so it
 * only ran under `yarn start`. Verified against three planted regressions — a
 * module dropped from all worlds, a module in two worlds, and a slug that is
 * not a module — and it caught none of them. Moved here, where it fails the
 * build the way check-site-url-parity and check-image-provenance do.
 *
 * Parsing JSX with a regex is normally a bad idea. It is acceptable here
 * because the target is one array of string literals in a file this script is
 * named after: if that array is restructured, the parse fails loudly below
 * rather than passing vacuously.
 */
const fs = require("fs");
const path = require("path");

const SRC = path.resolve(__dirname, "..", "src");
const WORLDS = path.join(SRC, "components", "sections", "OperatingWorlds.jsx");
const DOCS = path.join(SRC, "data", "docsData.js");

function fail(message, detail = []) {
  console.error(`check-module-coverage: FAILED\n\n  ${message}`);
  for (const d of detail) console.error(`    ${d}`);
  console.error(
    "\nEvery module in docsData.js must appear in exactly one world in " +
      "OperatingWorlds.jsx.\nAdd it to the world whose job it does, or remove it " +
      "from docsData if it is not a module."
  );
  process.exit(1);
}

const worldsSrc = fs.readFileSync(WORLDS, "utf8");
const docsSrc = fs.readFileSync(DOCS, "utf8");

// Each world's slugs array, in declaration order.
const slugArrays = [...worldsSrc.matchAll(/slugs:\s*\[([^\]]*)\]/g)].map((m) =>
  [...m[1].matchAll(/"([^"]+)"/g)].map((s) => s[1])
);

if (slugArrays.length === 0) {
  fail(
    `no "slugs: [...]" arrays found in ${path.relative(SRC, WORLDS)} — ` +
      "the file was restructured and this check can no longer read it."
  );
}

const placed = slugArrays.flat();
const all = [...docsSrc.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);

if (all.length === 0) fail(`no slugs found in ${path.relative(SRC, DOCS)}`);

const missing = all.filter((s) => !placed.includes(s));
const unknown = placed.filter((s) => !all.includes(s));
const duplicated = placed.filter((s, i) => placed.indexOf(s) !== i);

const problems = [];
if (missing.length) problems.push(`${missing.length} module(s) in no world: ${missing.join(", ")}`);
if (unknown.length) problems.push(`${unknown.length} slug(s) not in docsData: ${unknown.join(", ")}`);
if (duplicated.length) problems.push(`${duplicated.length} module(s) in more than one world: ${[...new Set(duplicated)].join(", ")}`);

if (problems.length) {
  fail("the homepage does not cover the module list.", problems);
}

console.log(
  `check-module-coverage: OK — ${all.length} modules across ` +
    `${slugArrays.length} worlds, each exactly once.`
);
