# Vercel Migration Plan

**Decision:** move `nuapos.com.au` from GitHub Pages to Vercel
**Approved by:** owner, 2026-09-09
**Status:** plan only — **nothing has been changed yet**, awaiting sign-off on §7

---

## 1. Why

Three things are blocked on GitHub Pages, and all three are blocked by the same
property: Pages serves **one site per repository, at one domain, via a single
`CNAME` file.**

| Blocked | Why Pages cannot do it |
|---|---|
| **301 redirects** for six routes (§42) | Pages has no `_redirects`, no rewrite rules, no server config at all. Client-side alternatives lose most of the link equity a 301 exists to preserve. |
| **`legacy.` / `next.` / live channels** (§4) | One domain per repo. Two finished sites cannot be kept warm with a pointer flipped between them. |
| **EDITH as a repoint** (§3.5) | Recall is a full rebuild — minutes, not seconds — because there is nothing to repoint. |

Vercel solves all three natively. Netlify and Cloudflare Pages are equivalent;
Vercel is chosen and the rest of this document assumes it.

**What is not a reason:** performance. The current site scores well and is
already prerendered. This migration buys capability, not speed.

---

## 2. What does not change

Worth stating plainly, because it is most of the system:

- The React app, the build, and `craco` config
- Prerendering — still runs in GitHub Actions, still 107 routes, still verified
- `yarn.lock`, the frozen install, the parity and provenance guards
- The claims and placeholder guards in CI
- Every URL that visitors and Google currently know

**The build stays in Actions.** Vercel receives already-built output via
`vercel deploy --prebuilt`. This keeps one build definition rather than two, and
keeps the prerender verification gate in front of every publish — a deploy that
produced empty or duplicate pages is still abandoned before it goes live.

---

## 3. DNS

The one step with real-world latency. Current records point the apex at GitHub.

| Host | Type | Value | When |
|---|---|---|---|
| `nuapos.com.au` | A / ALIAS | Vercel's apex target | Cutover |
| `www` | CNAME | `cname.vercel-dns.com` | Cutover |
| `next` | CNAME | `cname.vercel-dns.com` | Before cutover — safe, unused today |
| `legacy` | CNAME | `cname.vercel-dns.com` | Before cutover — safe, unused today |

`next.` and `legacy.` can be added **now**, ahead of any production change.
They point at Vercel deployments that do not affect the live site, which means
the whole architecture can be proven on real hostnames before the apex moves.

TTL should be lowered to 300s at least 24h before cutover, so a rollback is
minutes rather than hours. Raise it again a week after.

---

## 4. Redirects

The six routes from `CONTENT_INVENTORY.md`, expressed as real 301s in
`vercel.json`. This is the capability the migration exists to buy.

```jsonc
{
  "redirects": [
    { "source": "/features", "destination": "/products", "permanent": true }
    // …the remaining five, added as each SPLIT/MERGE actually ships.
  ]
}
```

**Deliberately not written in advance.** A redirect added before its
destination exists sends visitors and crawlers to a 404, which is worse than
the current state. Each one lands in the same commit as the page it points to.

---

## 5. EDITH after the move

EDITH stops being a rebuild and becomes a repoint.

| | Pages (today) | Vercel |
|---|---|---|
| Recall time | ~3 min (full build) | ~5 s (alias swap) |
| Mechanism | Rebuild from `2a5962f`, redeploy | Point the production alias at an existing immutable deployment |
| Can it publish something broken? | No — verify gate | No — the target already built and passed |
| Parallel channels | Impossible | `legacy.` and `next.` live permanently |

The runbook's operator instructions do not change: Actions → EDITH →
`channel: legacy`, `confirm: EDITH`. Only what happens underneath changes. That
matters — the person recalling the site in an incident should not have to learn
a new procedure because the hosting changed.

---

## 6. Sequence

Each step is independently reversible. Nothing touches production until step 6.

| # | Step | Production risk | Reversible by |
|---|---|---|---|
| 1 | Create Vercel project, link repo, **no domains** | none | Deleting the project |
| 2 | Add `vercel.json`; deploy to a `*.vercel.app` URL | none | — |
| 3 | Verify all 107 routes on the preview URL: titles, canonicals, schema, images, 404 behaviour | none | — |
| 4 | Point `next.nuapos.com.au` at it; review the real site on a real hostname | none | Removing the DNS record |
| 5 | Lower apex TTL to 300s, wait 24h | none | — |
| 6 | **Move the apex.** Site is now served by Vercel | ⚠️ this is the cutover | Repointing DNS to GitHub (~5 min at 300s TTL) |
| 7 | Point `legacy.` at a deployment built from `2a5962f` | none | — |
| 8 | Switch EDITH from rebuild to alias swap | none | The Pages workflow still exists |
| 9 | After a week clean: retire `deploy-pages.yml`, raise TTL | none | Git history |

**Steps 1–5 can all be done today without touching the live site.** The
decision point is step 6, and by then the entire site has been reviewed on
`next.` at a real hostname.

---

## 7. What is needed from the owner

Only two things, both at step 1 and step 6:

1. **A Vercel account**, and the GitHub repository connected to it. Free tier
   covers this site comfortably. I cannot create the account.
2. **DNS access** for `nuapos.com.au`, or someone who has it. I do not know
   where the domain is registered — that is the one fact this plan is missing.

Everything between those two points is mine.

**Not needed:** any change to how you work. Merging to `main` still deploys.

---

## 8. Risks

| Risk | Mitigation |
|---|---|
| DNS propagation leaves some users on the old site | Both serve the same content at cutover; low TTL bounds it to minutes |
| Vercel free-tier limits | Static prerendered output, no serverless functions — the limits that bite are bandwidth and build minutes, neither close at this size |
| Two deploy paths briefly coexist | Intentional, and the reason Pages is retired a week later rather than immediately |
| `vercel.json` redirect loop | Each redirect ships with its destination and is tested on `next.` first |
| Losing the Pages fallback too early | `deploy-pages.yml` stays until step 9 |

The genuine risk is step 6, and it is bounded: DNS is the most reversible part
of the system, and the previous host stays fully functional throughout.

---

## 9. Open question

**Where is `nuapos.com.au` registered?** Everything up to step 5 proceeds
without it. Step 6 does not.
