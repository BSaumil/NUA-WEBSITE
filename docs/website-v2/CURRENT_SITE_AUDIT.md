# Current Site Audit — pre-V2 baseline

**Audit date:** 2026-09-08
**Directive:** §2 (Current website — preserve before touching)
**Status:** Complete. Legacy snapshot created and pushed (§3.1) before any V2 change.

---

## 1. Production state

| Field | Value |
|---|---|
| **Production SHA** | `2a5962f2bb53087849b46b42a074d8b9380b8995` |
| Commit subject | Commit yarn.lock and pin CI installs to it (#35) |
| Production branch | `main` |
| Public URL | https://nuapos.com.au |
| Custom domain source | `frontend/public/CNAME` → `nuapos.com.au` |

### Legacy snapshot (§3.1)

| Reference | Status |
|---|---|
| `website/legacy-2026-09-04` (branch) | ✅ **pushed** → `2a5962f` |
| `nua-web-legacy-2026-09-04` (tag) | ⚠️ created locally, **push blocked** — see [Migration risks](#7-migration-risks) |

No force-push was used. No existing ref was moved or deleted.

---

## 2. Stack

| Field | Value |
|---|---|
| Framework | **Create React App 5.0.1** + `@craco/craco` (⚠️ **not Next.js**) |
| Language | **JavaScript / JSX** (⚠️ **no TypeScript** — no `typescript` dependency) |
| Package manager | **yarn 1.22.22** (pinned via `packageManager`) ⚠️ **not pnpm** |
| Router | `react-router-dom` v7 (client-side SPA) |
| Styling | Tailwind CSS + shadcn/ui |
| Animation | Framer Motion |
| Icons | lucide-react |
| Node (CI) | 20 |

### Build pipeline

```
prebuild   → node scripts/generate-sitemap.js
build      → craco build
postbuild  → node scripts/prerender.js      (Playwright renders all 106 routes to static HTML)
verify     → node scripts/verify-prerender.js  (fails the build on empty/duplicate output)
```

Prerendering exists because GitHub Pages serves static files only; without it every route would ship an empty `<div id="root">`.

---

## 3. Deployment

| Field | Value |
|---|---|
| Provider | **GitHub Pages** |
| Workflow | `.github/workflows/deploy-pages.yml` |
| Trigger | `push` to `main`, plus `workflow_dispatch` |
| Publish action | `actions/deploy-pages@v4` (single `github-pages` environment) |
| Install | `yarn install --frozen-lockfile` (lockfile committed) |
| Pre-merge CI | ❌ **none** — the workflow does not run on `pull_request` |

> **Architectural consequence:** a GitHub Pages site serves **one** custom domain per repository, set by the single `CNAME` file. This is the central conflict with directive §3.3/§3.4/§4 — see the reconciliation document.

---

## 4. Route inventory

31 route patterns in `src/App.js`; **105 URLs** in the generated sitemap (dynamic `:slug` routes expand from data files).

| Group | Routes |
|---|---|
| Core | `/` `/features` `/platform` `/ai-agent` `/pricing` `/integrations` |
| Solutions | `/solutions` `/solutions/:slug` |
| Vertical landing (SEO) | `/restaurant-pos` `/cafe-pos` `/bar-pos` `/hospitality-pos` |
| Content | `/resources` `/docs` `/docs/:slug` `/blog` `/blog/:slug` |
| Comparison | `/compare` `/compare/:slug` |
| Company | `/about` `/customers` `/careers` `/press` `/contact` |
| Trust | `/security` `/status` `/privacy` `/terms` |
| Other | `/savings` `/gallery` `*` (NotFound) |

`404.html` is prerendered from the NotFound route, so unknown URLs return a genuine 404 status rather than a soft-404 redirect.

---

## 5. Assets and brand

**Location:** `frontend/public/`

| Asset | Purpose |
|---|---|
| `nua-icon-512.png` | Primary icon; referenced by Organization structured data |
| `favicon.ico`, `favicon-16/32/48.png` | Browser icons |
| `apple-touch-icon.png` | iOS |
| `android-chrome-192/512.png` | Android / manifest |
| `og-card.png` | Open Graph share card (1200×630) |

⚠️ **No standalone wordmark asset (SVG or PNG) exists in the repository.** The navbar and footer render the NUA wordmark as **live HTML/CSS text** plus two coloured squares — not an imported logo file.

This matters for directive §6 ("Use the actual NUA logo asset already present in the repository… Do not generate a fake NUA wordmark with CSS or SVG approximation"). The current site is already in the state §6 forbids, and the package's `01_BRAND/nua-icon-authoritative-1024.png` is **not present** in the repo.

---

## 6. SEO, analytics, legal

| Area | Current state |
|---|---|
| Metadata | Per-page via `src/components/SEO.jsx` — title, description, canonical, `og:url`, OG/Twitter tags |
| Structured data | `src/lib/schema.js` — one `@graph` per page: Organization + WebSite, plus SoftwareApplication / BreadcrumbList / FAQPage / HowTo where relevant. Validated: 105 blocks, 0 errors |
| Sitemap | `public/sitemap.xml`, generated at build from the route table + data files |
| robots.txt | Present |
| Redirects | ❌ **None configured** — GitHub Pages has no redirect layer |
| Analytics | **PostHog** only (loaded in `public/index.html`) |
| Consent architecture | ⚠️ None detected — no cookie banner or consent gate |
| Legal entity | `NUA AUS PTY LTD`, ABN `54 299 131 653` (`siteConfig.js`) |

---

## 7. Migration risks

### 🔴 R1 — GitHub Pages cannot host the three-channel architecture

One repository → one Pages site → one custom domain. `legacy.nuapos.com.au`, `next.nuapos.com.au` and `nuapos.com.au` cannot coexist from this repo. **Blocks §3.3, §3.4, §4, §52.** Requires a provider decision from the operator.

### 🔴 R2 — Tag pushes fail at the transport layer

`git push origin refs/tags/*` fails repeatedly:

```
send-pack: unexpected disconnect while reading sideband packet
fatal: the remote end hung up unexpectedly
```

Branch pushes of the *same objects* succeed, and a lightweight tag fails identically — so this is tag-ref transport, not object size or the annotated-tag object. Retried 4× with backoff, and again with `http.version=HTTP/1.1` and a 500 MB `postBuffer`.

**Mitigation:** the legacy branch is pushed and pins the same SHA, so recoverability is intact. To add the tag from an unrestricted machine:

```bash
git fetch origin
git tag -a nua-web-legacy-2026-09-04 2a5962f -m "NUA website legacy snapshot before V2 redesign"
git push origin nua-web-legacy-2026-09-04
```

### 🟠 R3 — 148 hardcoded production URLs

`https://nuapos.com.au` appears **148 times** across `src/`, `public/` and `scripts/`, including `siteConfig.js`, `faqData.js`, `schema.js`, `generate-sitemap.js`, `prerender.js`, `verify-prerender.js` and many page components.

Directive §4.2 and §55 require the canonical host to be **configuration, not code**. Today a domain move is a 148-site edit. Must be collapsed to one env-driven source before any domain portability claim is credible.

### 🟠 R4 — Legal placeholder still live in production

`src/pages/TermsConditions.jsx:219` renders:

> These Terms are governed by the laws of **`[Insert State/Territory]`**, Australia

§28 requires placeholder removal and forbids guessing. This is a **content defect on the live site right now**, not just a V2 item. See `LEGAL_ENTITY_ACTION_REQUIRED.md`.

### 🟠 R5 — No pre-merge CI

`deploy-pages.yml` runs only on `push: [main]`. Nothing validates a pull request; every check runs *after* merge, as part of deploying to production. A V2 programme of this size without a PR gate is high-risk.

### 🟡 R6 — No redirect layer

GitHub Pages cannot issue 301s. §30/§42 require preserving URL equity via explicit redirects. On Pages the only options are client-side redirects (bad for SEO) or a provider with real redirect support.

### 🟡 R7 — Asset pack absent

`NUA_WEBSITE_V2_COMPLETE_ASSET_PACK_2026-09-08/` is **not in the repository**. All 74 production images, the 16 reference images and `01_BRAND/nua-icon-authoritative-1024.png` are unavailable, as are `IMAGE_MANIFEST.md` and `NUA_POS_FEATURES_AND_COMPARISON-1.md`.

### 🟡 R8 — No consent architecture

PostHog loads unconditionally. §36 says "respect current consent/privacy architecture" — there isn't one. Expanding analytics instrumentation without addressing this increases privacy exposure.

---

## 8. Dependency snapshot

Full tree pinned in `frontend/yarn.lock` (committed 2026-08-31, 11,323 lines). Headline versions:

| Package | Version |
|---|---|
| react / react-dom | 19.x |
| react-router-dom | 7.5.1 |
| react-scripts | 5.0.1 |
| @craco/craco | 7.x |
| tailwindcss | 3.x |
| framer-motion | latest |
| playwright | build-time only (prerender) |

CI installs with `--frozen-lockfile`, so builds are reproducible.

---

*Generated per directive §2. No V2 changes were made before this audit and the §3.1 legacy snapshot.*
