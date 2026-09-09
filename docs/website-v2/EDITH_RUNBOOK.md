# EDITH — Website Recall Runbook

**EDITH** = *Emergency Deployment: Instantly Trace Home*

One action puts the **old website** back on nuapos.com.au. No engineer required.

---

## The short version

**Something is wrong with the website and you want the old one back:**

1. Go to **https://github.com/BSaumil/NUA-WEBSITE/actions/workflows/edith.yml**
2. Click **Run workflow**
3. Set:
   - **channel** → `legacy`
   - **confirm** → `EDITH`
   - **reason** → why (optional, but useful later)
4. Click the green **Run workflow** button

The old website is live in a few minutes.

**To put the current website back:** same steps, but **channel** → `live`.

That's it. Nothing else to do, nothing to undo afterwards.

---

## What the two channels are

| Channel | What it is |
|---|---|
| **`live`** | The current website — whatever is on the `main` branch right now |
| **`legacy`** | The website exactly as it was on 4 September 2026, frozen before the V2 redesign began |

`legacy` is pinned to commit `2a5962f` on the branch `website/legacy-2026-09-04`. It cannot drift: it is a fixed point in history, not "roughly what we had".

---

## Checking what's live

From the `frontend/` folder:

```bash
yarn edith status
```

Shows which channel is live, what it was built from, who deployed it and when. It reads a marker file the deploy writes into the site itself, so it reports what is *actually* published — not what someone assumed.

If it says `unknown`, that just means it couldn't reach the site (offline, or the site predates EDITH). It will never guess.

Other commands:

```bash
yarn edith recall     # exact steps to put the old site live
yarn edith restore    # exact steps to put the current site back
yarn edith verify     # confirm the old site is still intact and recallable
```

`yarn edith verify` is worth running occasionally. It checks four things:

- the legacy branch still exists on GitHub
- it still carries its dependency lockfile, so it will build identically
- it still carries the prerender verifier, so a recall can't publish a broken site
- its `CNAME` still binds the production domain

---

## What happens when you run it

1. **Guard** — refuses to continue unless you typed `EDITH` exactly. A mistyped confirmation stops the run before anything is built.
2. **Build** — checks out the chosen channel, installs from its own locked dependency tree, builds, prerenders all 106 pages.
3. **Verify** — the same gate the normal deploy uses. If prerendering produced empty or duplicate pages, **the deploy is abandoned** and the current site stays up. A recall cannot make things worse by publishing a broken site.
4. **Publish** — replaces what is served at nuapos.com.au, and stamps `edith.json` so `status` can report it afterwards.

Both EDITH and the normal deploy share a concurrency group, so a recall and an ordinary deploy can never publish over each other. If one is running, the other queues.

---

## Honest limitations

**This is a redeploy, not a switch.** Recovery takes a few minutes (a full build), not seconds.

The reason is GitHub Pages: it serves **one** website per repository, at **one** domain, set by a single `CNAME` file. There is no way to keep two finished websites warm and flip a pointer between them.

The V2 directive (§4) asks for exactly that flip, with `legacy.nuapos.com.au` and `next.nuapos.com.au` live alongside production. **That is not possible on GitHub Pages** — see `BLOCKERS_AND_STACK_RECONCILIATION.md`.

What EDITH does deliver is the property that actually matters in an incident:

| Requirement (§3.5) | EDITH |
|---|---|
| Not "revert dozens of commits" | ✅ one action |
| Not "manually restore files" | ✅ nothing to restore |
| Not "force-push branches" | ✅ never touches history |
| Not "redeploy from memory" | ✅ builds from an immutable ref |
| Reversible | ✅ run again with the other channel |
| Auditable | ✅ every run stamped into the site |

**Moving to a host with deployment aliases** (Vercel, Netlify, Cloudflare Pages) is what turns this from minutes into seconds, and unlocks the parallel `legacy.` / `next.` hostnames. That decision is still open.

---

## If EDITH itself fails

Rare, but the fallbacks in order:

1. **Re-run the workflow.** Most failures are transient (runner loss, network).
2. **Check `yarn edith verify`.** If the legacy branch was deleted or damaged, that is the real problem — recreate it from the tag or from commit `2a5962f`:
   ```bash
   git branch website/legacy-2026-09-04 2a5962f
   git push origin website/legacy-2026-09-04
   ```
3. **Read the run log.** The build step fails loudly; the verify step names exactly which routes were bad.
4. **Worst case,** the legacy site can be built and deployed by hand from `2a5962f` — but you should not need to, and if you do, that is a bug in EDITH worth fixing.

---

## Known gap: the legacy tag

The annotated tag `nua-web-legacy-2026-09-04` exists locally but is **not on GitHub**. Tag pushes fail from the build environment (`send-pack: unexpected disconnect`) while branch pushes of the same objects succeed.

This does **not** affect recall — EDITH uses the branch, which is pushed and pinned to the same commit. The tag is belt-and-braces. To add it from an unrestricted machine:

```bash
git fetch origin
git tag -a nua-web-legacy-2026-09-04 2a5962f -m "NUA website legacy snapshot before V2 redesign"
git push origin nua-web-legacy-2026-09-04
```

---

## Quick reference

| I want to… | Do this |
|---|---|
| Put the **old** site back | Actions → EDITH → `channel: legacy`, `confirm: EDITH` |
| Put the **current** site back | Actions → EDITH → `channel: live`, `confirm: EDITH` |
| See what's live | `yarn edith status` |
| Check the old site is still safe | `yarn edith verify` |
| Get the exact steps | `yarn edith recall` |
