# Blockers & Stack Reconciliation

**Date:** 2026-09-08
**Purpose:** Reconcile the V2 Master Directive against the actual repository, and record what cannot proceed without an operator decision.

The directive (§62.9) says to stop only for *"a genuine external blocker such as missing deployment credentials or a legal fact that cannot be inferred safely."* This document lists exactly those, and nothing else.

---

## Part 1 — Where the directive's assumptions differ from this repository

The directive appears to have been written against a Next.js/pnpm/Vercel-style project. This repository is not that. None of these are objections to the directive's *intent* — they change the implementation.

| # | Directive assumes | This repository | Impact |
|---|---|---|---|
| 1 | `pnpm site:*` scripts | **yarn 1.22.22**, pinned in `packageManager` | Rename to `yarn site:*` |
| 2 | `tsx scripts/site-channel/*.ts` | **No TypeScript** anywhere | Implement in plain Node ESM/CJS |
| 3 | `NEXT_PUBLIC_SITE_URL` (§4.2) | **CRA**, not Next.js | Use `REACT_APP_SITE_URL` |
| 4 | Provider with domain aliases | **GitHub Pages** | 🔴 See Part 2 |
| 5 | Server redirects (§30, §42) | Pages has **no redirect layer** | Needs provider change or client-side fallback |
| 6 | Asset pack extracted at repo root | **Not present** | 🔴 See Part 3 |

None of 1–3 are blockers. They are adaptations, and the directive explicitly permits them: *"If the project does not use Node/TypeScript tooling, implement equivalent scripts in the existing stack"* (§4).

---

## Part 2 — 🔴 BLOCKER: the three-channel architecture cannot run on GitHub Pages

### The requirement

§3.4 and §4 require three simultaneously-live hostnames:

```
legacy.nuapos.com.au → parked current website
next.nuapos.com.au   → Website V2
nuapos.com.au        → active production channel
```

with `site:switch:v2`, `site:switch:legacy` and `site:rollback` repointing the production domain at the deployment layer — and §3.5 explicitly forbids implementing "rollback" as reverting commits or force-pushing.

### Why it cannot work here

GitHub Pages binds **one custom domain per repository**, from the single `frontend/public/CNAME` file. `actions/deploy-pages@v4` publishes to one `github-pages` environment per repo. There is no alias layer, no deployment-to-domain mapping, and no atomic repoint.

Simulating a switch by editing `CNAME` and redeploying is **exactly what §3.5 prohibits**: it makes switching a source-code operation, is not atomic, and cannot roll back in one command.

### Options (operator decision required)

| Option | How it works | Trade-off |
|---|---|---|
| **A. Move hosting to Vercel / Netlify / Cloudflare Pages** | Native per-deployment domain aliases. Implements §3–§4 and §52 as written, plus real 301 redirects (fixes R6) and PR preview deployments (fixes R5). | Migration effort; new provider account and DNS changes. **Recommended.** |
| **B. Three GitHub repositories** | `NUA-WEBSITE` (prod), `-legacy`, `-next`, each with its own Pages site and CNAME. | Switching still means editing a CNAME and redeploying — does not satisfy §3.5. Triples release surface. |
| **C. Stay on Pages, drop the switching requirement** | Keep single-channel deploys; rely on the legacy branch for recovery. | Fails §52 acceptance. Loses the safety property the directive is built around. |

**I have not chosen.** This is a hosting and cost decision, and the directive forbids assuming a provider (§4.1: *"Do not assume Vercel, Railway, Cloudflare, Netlify, AWS… until inspected"*). I inspected: it is GitHub Pages, which cannot do this.

> Note: Vercel and Railway MCP tooling is available in this session. That is **not** evidence either is your intended host, so I have not acted on it. Tell me which and I will implement the matching adapter.

### What I did instead

The safety *property* the directive cares about — the current site remains recoverable — is achieved:

- `website/legacy-2026-09-04` is pushed and pins `2a5962f`
- Production is untouched and still serving that exact commit
- No refs were moved, deleted or force-pushed

---

## Part 3 — 🔴 BLOCKER: the asset pack is not in the repository

The Final Asset Package Addendum names `NUA_WEBSITE_V2_COMPLETE_ASSET_PACK_2026-09-08/` as *"the implementation authority for Website V2 assets"* and instructs: *"After extracting this package into the repository root, begin with…"*

**It has not been extracted.** Five Markdown files were provided; the package itself is absent.

Missing and required:

| Missing | Needed for |
|---|---|
| 74 production images across `02_`–`09_` | §15–§18, the entire page-asset map |
| `01_BRAND/nua-icon-authoritative-1024.png` | §6 brand authority, all logo compositing |
| `IMAGE_MANIFEST.md` | Named read-first authority; §15 |
| `NUA_POS_FEATURES_AND_COMPARISON-1.md` | Read-first; the code-verified feature baseline |
| 16 reference-only images | §10 reference set |

Consequence: the visual programme — §11 homepage, §12 (60% real photography), §13, §14 overlays, §15–18 manifests, §21–23 vertical pages, §25 gallery, §45 pipeline — **cannot begin**. Building it against invented placeholders would violate §44 (image quality control) and hard constraint #7 (no invented proof).

**To unblock:** extract the pack into the repository root without flattening, and commit it (or supply it as an archive).

---

## Part 4 — 🟠 Legal fact that cannot be inferred (§28)

`src/pages/TermsConditions.jsx:219` currently renders on the **live production site**:

> These Terms are governed by the laws of **`[Insert State/Territory]`**, Australia

§28: *"Remove template placeholders… Only fill verified values"* and *"Do not guess the legal entity."* The governing State/Territory is a legal fact about where NUA AUS PTY LTD is established and where it elects jurisdiction. I will not guess it.

This is tracked in `LEGAL_ENTITY_ACTION_REQUIRED.md`. It is a **live defect today**, independent of V2.

---

## Part 5 — What is not blocked, and is next

These P0 items need no external input and are the correct next work:

| Item | Directive | Status |
|---|---|---|
| Legacy branch pushed | §3.1 | ✅ **done** |
| Legacy tag | §3.1 | ⚠️ transport-blocked (branch covers recoverability) |
| `CURRENT_SITE_AUDIT.md` | §2 | ✅ **done** |
| Canonical domain portability — collapse 148 hardcoded URLs to one env-driven source | §4.2, §55 | ⬜ ready to start |
| `CLAIMS_REGISTER.md` — audit absolute/quantitative claims | §26 | ⬜ ready to start |
| `LEGAL_ENTITY_ACTION_REQUIRED.md` | §28 | ✅ **done** |
| `CONTENT_INVENTORY.md` — route-by-route keep/change/remove | §43 | ⬜ ready to start |
| Naming policy (NUA / NUA POS / NUA Intelligence) | §50 | ⬜ ready to start |
| Pre-merge CI (`pull_request` trigger) | §51 | ⬜ ready to start |

**§4.2 is the highest-value unblocked item.** It is a prerequisite for *any* provider option in Part 2 — the site cannot move domains while 148 files hardcode the host — and it delivers value even if the answer to Part 2 is "stay on Pages".

---

## Part 6 — Honest status against §52 acceptance

| Acceptance criterion | Status |
|---|---|
| legacy git branch exists | ✅ |
| legacy tag exists | ⚠️ local only — transport blocked |
| legacy deployment exists | ❌ blocked (Part 2) |
| V2 deployment exists | ❌ blocked (Part 2) |
| both loadable independently | ❌ blocked (Part 2) |
| production domain not coupled to source deletion | ⚠️ currently **is** coupled — CNAME is source |
| `site:status` works | ❌ not implemented pending provider decision |
| `site:switch:legacy` / `site:switch:v2` | ❌ not implemented pending provider decision |
| `site:rollback` | ❌ not implemented pending provider decision |
| `site:domain --dry-run` | ❌ not implemented pending provider decision |
| health checks exist | ❌ |
| canonical URL changeable by environment | ❌ 148 hardcoded occurrences |
| parked site noindex behaviour | ❌ no parked deployment |
| active site owns canonical | ✅ (single channel) |
| switch documentation exists | ⚠️ this document; runbook pending provider |

Per §59: **this is not claimed complete.** The blockers are provider capability and missing assets, not effort.

---

*Nothing in this document is a refusal. Each blocker names the decision or artefact that unblocks it.*
