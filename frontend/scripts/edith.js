#!/usr/bin/env node
/**
 * EDITH — Emergency Deployment: Instantly Trace Home
 *
 * Operator CLI for the website recall system.
 *
 *   yarn edith status    what is live now, and what can be recalled
 *   yarn edith recall    instructions to put the parked legacy site live
 *   yarn edith restore   instructions to put the current site back
 *   yarn edith verify    check the legacy ref is intact and buildable
 *
 * The actual production switch is deliberately NOT performed by this script.
 * Publishing to nuapos.com.au requires GitHub Pages credentials that only the
 * Actions runner holds, so the switch lives in .github/workflows/edith.yml as
 * a manual, confirmation-gated dispatch. A local script that pretended to do
 * it would either need a long-lived production token on a laptop, or would be
 * theatre. This one tells you the truth about state and hands you the exact
 * one-action command.
 */
const { execSync } = require("child_process");
const https = require("https");

const LEGACY_REF = "website/legacy-2026-09-04";
const LEGACY_TAG = "nua-web-legacy-2026-09-04";
// The domain the legacy branch's CNAME is expected to bind. Named rather than
// inlined because it is scheduled to change: once V2 moves to another host and
// takes the apex, legacy is served from a subdomain and its CNAME changes with
// it. A verify failure here should send you to that migration, not to a hunt.
const LEGACY_DOMAIN = "nuapos.com.au";
const REPO = "BSaumil/NUA-WEBSITE";
const ACTIONS_URL = `https://github.com/${REPO}/actions/workflows/edith.yml`;

const C = {
  dim: (s) => `\x1b[2m${s}\x1b[0m`,
  bold: (s) => `\x1b[1m${s}\x1b[0m`,
  green: (s) => `\x1b[32m${s}\x1b[0m`,
  amber: (s) => `\x1b[33m${s}\x1b[0m`,
  red: (s) => `\x1b[31m${s}\x1b[0m`,
};

function sh(cmd) {
  try {
    return execSync(cmd, { stdio: ["ignore", "pipe", "ignore"] }).toString().trim();
  } catch {
    return null;
  }
}

/** Reads the marker the deploy workflows stamp into the published site. */
function fetchLiveMarker(origin) {
  return new Promise((resolve) => {
    const req = https.get(`${origin}/edith.json`, { timeout: 8000 }, (res) => {
      if (res.statusCode !== 200) {
        res.resume();
        return resolve({ error: `HTTP ${res.statusCode}` });
      }
      let body = "";
      res.on("data", (c) => (body += c));
      res.on("end", () => {
        try {
          resolve({ marker: JSON.parse(body) });
        } catch {
          resolve({ error: "marker is not valid JSON" });
        }
      });
    });
    req.on("timeout", () => { req.destroy(); resolve({ error: "timed out" }); });
    req.on("error", (e) => resolve({ error: e.message }));
  });
}

function refInfo(ref) {
  const local = sh(`git rev-parse --short ${ref}`);
  const remote = sh(`git ls-remote --heads origin ${ref}`);
  const remoteSha = remote ? remote.split(/\s+/)[0].slice(0, 7) : null;
  return { local, remoteSha };
}

async function status() {
  const { SITE_URL } = require("./site-url");
  console.log(C.bold("\nEDITH — website channel status\n"));

  const legacy = refInfo(LEGACY_REF);
  const main = refInfo("main");
  const tagLocal = sh(`git rev-parse --short ${LEGACY_TAG}`);
  const tagRemote = sh(`git ls-remote --tags origin ${LEGACY_TAG}`);

  console.log(`  Production domain   ${SITE_URL}`);
  console.log(`  Channels`);
  console.log(`    live     main                       ${main.remoteSha || C.red("not on remote")}`);
  console.log(`    legacy   ${LEGACY_REF}  ${legacy.remoteSha || C.red("MISSING ON REMOTE")}`);
  console.log(
    `    tag      ${LEGACY_TAG}  ` +
      (tagRemote ? C.green("on remote") : tagLocal ? C.amber("local only — see runbook") : C.red("missing"))
  );

  console.log(`\n  ${C.dim("Querying the live site for its deployment marker…")}`);
  const { marker, error } = await fetchLiveMarker(SITE_URL);
  if (marker) {
    const label = marker.channel === "legacy" ? C.amber(marker.channel.toUpperCase()) : C.green(marker.channel.toUpperCase());
    console.log(`\n  Currently live      ${label}`);
    console.log(`    built from        ${marker.ref} @ ${String(marker.sha).slice(0, 7)}`);
    console.log(`    deployed          ${marker.deployedAt} by ${marker.deployedBy} (via ${marker.via})`);
    if (marker.reason) console.log(`    reason            ${marker.reason}`);
  } else {
    console.log(`\n  Currently live      ${C.amber("unknown")} — ${error}`);
    console.log(C.dim("    The marker only exists on deploys made after EDITH was added."));
    console.log(C.dim("    A sandboxed/offline environment also cannot reach the site."));
  }

  console.log(`\n  ${C.bold("To recall the old website")}`);
  console.log(`    yarn edith recall\n`);
}

function instructions(channel) {
  const isRecall = channel === "legacy";
  console.log(C.bold(`\nEDITH — ${isRecall ? "recall the parked legacy website" : "restore the current website"}\n`));
  console.log(`  This publishes ${C.bold(channel)} to production.\n`);
  console.log(`  1. Open:  ${ACTIONS_URL}`);
  console.log(`  2. Run workflow →`);
  console.log(`       channel  ${C.bold(channel)}`);
  console.log(`       confirm  ${C.bold("EDITH")}`);
  console.log(`       reason   (optional, recorded in the deploy)\n`);
  console.log(`  Or from a machine with the gh CLI:\n`);
  console.log(
    C.dim(`    gh workflow run edith.yml -R ${REPO} \\\n` +
          `      -f channel=${channel} -f confirm=EDITH -f reason="..."\n`)
  );
  console.log(`  ${C.dim(`Takes a few minutes: it rebuilds from ${isRecall ? LEGACY_REF : "main"} and republishes.`)}`);
  console.log(`  ${C.dim(`To undo: yarn edith ${isRecall ? "restore" : "recall"}`)}\n`);
}

function verify() {
  console.log(C.bold("\nEDITH — verifying the legacy channel is intact\n"));
  const checks = [];

  const remote = sh(`git ls-remote --heads origin ${LEGACY_REF}`);
  checks.push([`legacy branch on remote`, !!remote, remote ? remote.split(/\s+/)[0].slice(0, 7) : "MISSING"]);

  // The content checks below read the legacy tree. That tree is NOT in the
  // local object store of a shallow or single-branch clone — actions/checkout
  // fetches only the ref under test — so reading `origin/<LEGACY_REF>` there
  // fails for want of the ref, which is indistinguishable from the file being
  // absent. That is how this check reported a perfectly intact legacy channel
  // as "NOT safely recallable" on its first CI run: three false FAILs, from a
  // clone that had simply never fetched the branch.
  //
  // Fetch the ref explicitly (depth 1, so it stays cheap in a shallow clone)
  // and read from FETCH_HEAD. The result then describes the branch, not the
  // clone it happens to be verified from.
  //
  // sh() returns null when a command fails and "" when it succeeds silently;
  // `git fetch` writes only to stderr, so "" is the success case here.
  // Only worth fetching if the branch is actually there. Keeping these two
  // apart matters: a branch that is GONE is the loudest failure this tool
  // exists to catch, and must never be softened into "could not check".
  const fetched = remote ? sh(`git fetch --depth=1 --no-tags origin ${LEGACY_REF}`) !== null : false;

  if (!fetched) {
    const CONTENT_CHECKS = [
      "legacy carries yarn.lock (--frozen-lockfile)",
      "legacy carries the prerender verifier",
      "legacy CNAME binds the production domain",
    ];
    console.log(
      `  ${remote ? C.green("PASS") : C.red("FAIL")}  ${checks[0][0].padEnd(44)} ${C.dim(checks[0][2])}`
    );
    for (const label of CONTENT_CHECKS) {
      console.log(
        `  ${C.amber("????")}  ${label.padEnd(44)} ` +
          C.dim(remote ? "could not fetch legacy ref" : "no branch to check")
      );
    }
    console.log(
      remote
        ? // A safety check that says "broken" when it means "could not check"
          // trains people to ignore it — and is then disbelieved on the day
          // legacy really is broken. Report uncertainty as uncertainty, the
          // way `status` already does.
          C.amber(
            `\n  Could NOT verify the legacy channel — 'git fetch origin ${LEGACY_REF}' failed.` +
              `\n  This is not evidence that legacy is broken. Re-run with network access to origin.\n`
          )
        : C.red(
            `\n  Legacy channel is NOT safely recallable — the branch ${LEGACY_REF} is gone from origin.` +
              `\n  Recreate it: git branch ${LEGACY_REF} 2a5962f && git push origin ${LEGACY_REF}\n`
          )
    );
    process.exit(1);
  }

  const lock = sh(`git cat-file -e FETCH_HEAD:frontend/yarn.lock && echo ok`);
  checks.push([`legacy carries yarn.lock (--frozen-lockfile)`, !!lock, lock ? "present" : "absent"]);

  const verifier = sh(`git cat-file -e FETCH_HEAD:frontend/scripts/verify-prerender.js && echo ok`);
  checks.push([`legacy carries the prerender verifier`, !!verifier, verifier ? "present" : "absent"]);

  const cname = sh(`git show FETCH_HEAD:frontend/public/CNAME`);
  checks.push([`legacy CNAME binds the production domain`, cname === LEGACY_DOMAIN, cname || "missing"]);

  let ok = true;
  for (const [label, pass, detail] of checks) {
    console.log(`  ${pass ? C.green("PASS") : C.red("FAIL")}  ${label.padEnd(44)} ${C.dim(detail)}`);
    if (!pass) ok = false;
  }
  console.log(
    ok
      ? C.green("\n  Legacy channel is recallable.\n")
      : C.red("\n  Legacy channel is NOT safely recallable — fix before relying on EDITH.\n")
  );
  process.exit(ok ? 0 : 1);
}

const cmd = process.argv[2] || "status";
const commands = {
  status,
  recall: () => instructions("legacy"),
  restore: () => instructions("live"),
  verify,
};

if (!commands[cmd]) {
  console.error(`Unknown command "${cmd}". Use: status | recall | restore | verify`);
  process.exit(1);
}
Promise.resolve(commands[cmd]()).catch((e) => {
  console.error(e.message);
  process.exit(1);
});
