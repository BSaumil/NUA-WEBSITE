# Content Inventory

**Directive:** §43, with the route-migration rules from §42
**Audited:** 2026-09-09 against `main` @ `1297a70`
**Scope:** 31 route patterns → 105 sitemap URLs (dynamic routes expand from data files)

> §42: *"For every old route: keep, improve, merge with redirect, or intentionally retire. Document decision. No broken URLs."*
>
> ⚠️ **Redirects are not available on GitHub Pages.** Every "merge with redirect" decision below is **blocked** until the hosting question is answered — see [§4](#4-the-redirect-problem).

---

## 1. Legend

| Decision | Meaning |
|---|---|
| **KEEP** | Survives V2 largely as-is; restyled to the new design system |
| **IMPROVE** | Survives, but content or structure changes materially |
| **SPLIT** | Becomes several vertical pages (hospitality / retail / services) |
| **MERGE** | Folds into another page; **needs a redirect** |
| **RETIRE** | Removed; **needs a redirect** |
| **NEW** | Does not exist yet |

---

## 2. Existing routes

### Core marketing

| Route | Current purpose | Decision | Audience | Primary CTA | SEO target | V2 notes |
|---|---|---|---|---|---|---|
| `/` | Homepage — "NUA: Restaurant OS" | **IMPROVE** | All three verticals | Book a Demo | brand + "operating system for business" | §11 rewrite: cinematic hero, business-mode switch, shift timeline, five operating worlds. Title change gated on content — see `NAMING_POLICY.md` §3 |
| `/features` | "Features, Explained Step by Step" | **SPLIT** | Evaluators | Book a Demo | feature terms | §24: becomes `/products/*` grouped into Sell/Serve/Operate/Grow/Know. Old URL **redirects** to `/products` |
| `/platform` | "Platform Architecture" | **IMPROVE** | Technical evaluators | Book a Demo | "restaurant platform architecture" | Overlaps `/features`; keep only if it says something `/products` does not |
| `/ai-agent` | "AI Agent" | **IMPROVE** | Evaluators | Book a Demo | "AI restaurant management" | §11.7 + Ash model: Detect → Recommend → Risk → Approve → Execute → Audit → Rollback. Rename per naming policy |
| `/pricing` | Plans + Lifetime | **IMPROVE** | Buyers | Start trial / Talk to sales | "restaurant POS pricing Australia" | §29: add business-type filter (Hospitality/Retail/Services). Verify "$0 markup" first — see `CLAIMS_REGISTER.md` |
| `/integrations` | Integration list | **KEEP** | Evaluators | Book a Demo | "POS integrations" | Restyle only |

### Vertical landing (highest commercial value)

| Route | Decision | Audience | SEO target | V2 notes |
|---|---|---|---|---|
| `/restaurant-pos` | **KEEP** | Restaurants | "restaurant POS Australia" | Already high-intent and prerendered. §30 asks for `/hospitality/restaurants`; **keep the flat URL** — it ranks and a move costs equity for no user gain |
| `/cafe-pos` | **KEEP** | Cafés | "cafe POS Australia" | As above |
| `/bar-pos` | **KEEP** | Bars, pubs | "bar POS Australia" | As above |
| `/hospitality-pos` | **KEEP** | Multi-venue | "hospitality POS software Australia" | Becomes the `/hospitality` hub, or redirects to it |
| `/solutions` | **IMPROVE** | All | "POS for [venue type]" | Becomes the three-vertical chooser |
| `/solutions/:slug` | **IMPROVE** | Venue types | long-tail venue terms | 6 pages; fold into the vertical structure |

### Content and proof

| Route | Decision | Audience | V2 notes |
|---|---|---|---|
| `/resources` | **KEEP** | Prospects, customers | FAQ + docs hub |
| `/docs`, `/docs/:slug` | **KEEP** | Customers, evaluators | 18 module guides. High trust value, low redesign need |
| `/blog`, `/blog/:slug` | **KEEP** | Organic search | 50 articles carrying real SEO equity. **Do not touch URLs** |
| `/compare`, `/compare/:slug` | **KEEP** | Late-stage buyers | 5 competitors. Keep the no-specific-claims standard |
| `/savings` | **KEEP** | Buyers | ROI calculator |
| `/gallery` | **IMPROVE** | Evaluators | §25: pair each interface with a real environment. Depends on the asset pack |
| `/customers` | ⚠️ **BLOCKED** | Prospects | §38 forbids fake proof. Cannot build without real authorised customers — see [§3](#3-pages-that-cannot-be-built-yet) |
| `/press` | **KEEP** | Media | Low traffic, cheap to keep |

### Company and trust

| Route | Decision | Notes |
|---|---|---|
| `/about` | **IMPROVE** | Reposition from hospitality-only to three verticals |
| `/careers` | **KEEP** | Restyle only |
| `/contact` | **IMPROVE** | §37: shorten the demo form; add business type + locations |
| `/security` | **KEEP** | Real trust value |
| `/status` | **KEEP** | Verify it reflects real monitoring, not a static page |
| `/privacy` | **KEEP** | Legal review before V2 launch |
| `/terms` | 🔴 **FIX NOW** | `[Insert State/Territory]` **live in production**. See `LEGAL_ENTITY_ACTION_REQUIRED.md` |
| `*` → 404 | **KEEP** | Prerendered to `404.html`, returns a real 404 |

---

## 3. Pages that cannot be built yet

| Page | Blocked by | Why it cannot be faked |
|---|---|---|
| `/customers` | No authorised customer stories | §38 and hard constraint #7 forbid invented names, logos, ratings or testimonials. §11.8 offers the alternative: case studies, founder-led pilot stories, "built with operators" content |
| `/retail/*` (§30) | Asset pack | §46: *"Do not reuse restaurant imagery."* Retail pages need retail photography, which is in the unextracted pack |
| `/services/*` (§30) | Asset pack | Same. Plus §23: avoid medical treatment claims unless legal scope supports them |
| `/products/*` (§30) | Asset pack | §24 requires real product UI per page |

**Roughly 20 of the ~30 new routes §30 proposes cannot begin** until the asset pack is extracted.

---

## 4. The redirect problem

Six routes above are marked MERGE or SPLIT, and each needs a **301** to preserve equity (§30, §42).

**GitHub Pages cannot issue redirects.** No `_redirects`, no `netlify.toml`, no rewrite rules. The only options are:

| Option | Verdict |
|---|---|
| Client-side JS redirect | ❌ Google treats it as a soft signal; loses most link equity; adds a render round-trip |
| `<meta http-equiv="refresh">` | ❌ Same, and worse for accessibility |
| Move to a host with redirect support | ✅ The actual fix |

**Consequence:** every SPLIT/MERGE decision is **on hold**. Doing them on Pages means either breaking URLs (violating §42's "No broken URLs") or shipping soft redirects that lose the equity §30 exists to protect.

This is the second concrete cost of the hosting decision, after the EDITH switch-vs-redeploy gap.

---

## 5. Summary

| Decision | Count |
|---|---|
| KEEP | 16 |
| IMPROVE | 9 |
| SPLIT | 1 (`/features` → `/products/*`) |
| BLOCKED (no proof) | 1 (`/customers`) |
| FIX NOW | 1 (`/terms`) |
| NEW, blocked on assets | ~20 |

### What is actionable today

1. 🔴 **`/terms`** — remove the live placeholder. Needs one verified value.
2. 🟠 **`/pricing`** — verify "$0 markup" before V2 amplifies it.
3. 🟢 **`/blog`, `/docs`, `/compare`, vertical landing pages** — 80+ URLs of real equity, all KEEP. The safest and most valuable part of the site needs no migration at all.

### What is gated

- Everything marked SPLIT or MERGE → **redirects** → hosting decision
- Every new vertical or product page → **asset pack**
- `/customers` → **real customer permission**
