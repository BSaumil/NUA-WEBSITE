# Naming Policy

**Directive:** §50 ("Create one naming policy") and §41 (don't permanently define NUA as restaurant-only)
**Status:** policy agreed and documented; **not yet applied** — see [§5](#5-what-changes-and-when)
**Audited:** 2026-09-09 against `main` @ `1297a70`

---

## 1. The policy

| Layer | Name | Use it for |
|---|---|---|
| **Master brand** | **NUA** | The company and the platform. Default in almost all copy. |
| **Product category** | **NUA POS** | Only where the reader needs to know the category — SEO titles, ads, comparison pages, app-store style listings. |
| **Intelligence layer** | **NUA Intelligence** | The autonomous layer: prediction, recommendation, automation, audit. |
| **The acting component** | **NUA Agent** | The thing that takes an action, inside NUA Intelligence. |

**Do not invent further sub-brands.** Every module is "NUA" plus a plain descriptive noun: NUA Inventory, NUA Loyalty, NUA Bookings. Not "NUA Pantry OS", not "NUA Guest Cloud".

---

## 2. Current inconsistency

Five names are in use for two things:

| Name | Occurrences | Verdict |
|---|---|---|
| `NUA` | everywhere | ✅ correct master brand |
| `NUA AI Agent` | 7 | 🔄 → **NUA Agent** |
| `NUA Restaurant OS` | 1 (`schema.js`, `SoftwareApplication.name`) | 🔄 → **NUA POS** |
| `Restaurant OS` | 3 (navbar badge, homepage `<title>`, `index.html`) | 🔄 see §3 |
| `NUA Intelligence` | 0 | ➕ not yet used — adopt |

### Two problems, not one

**a) "AI" as a name.** §39 says avoid saying "AI" in every section; the intelligence should demonstrate value through prediction, recommendation, automation and auditability rather than the label. `NUA AI Agent` puts the label in the product name itself, so it repeats everywhere the agent is mentioned. **NUA Agent** says what it is — the thing that acts.

**b) "Restaurant OS" caps the brand.** §41 is explicit: *"Do not permanently define NUA only as restaurant software… Master brand: The operating system for modern business."* V2 expands into retail and professional services. A homepage titled **"NUA: Restaurant OS"** contradicts the master positioning on the most important page on the site, and tells Google the same thing.

---

## 3. The homepage title decision

`NUA: Restaurant OS` appears in three places that matter for SEO: the homepage `<title>`, the `og:title`, and the fallback `<title>` in `index.html`.

This is **not** a pure rename. "Restaurant POS" is a high-intent search term and the site currently ranks for hospitality language. §30 requires preserving SEO equity, and §9 requires the master positioning.

**Recommendation** — satisfies both:

| Where | From | To |
|---|---|---|
| Homepage `<title>` | `NUA: Restaurant OS` | `NUA: The Operating System for Modern Business` |
| Navbar badge | `Restaurant OS` | `Operating System` |
| `SoftwareApplication.name` | `NUA Restaurant OS` | `NUA POS` |

Hospitality intent is **kept where it belongs** — the vertical landing pages (`/restaurant-pos`, `/cafe-pos`, `/bar-pos`, `/hospitality-pos`) already target those terms with dedicated titles, and they are the pages that should rank for them. The homepage should rank for the brand.

⚠️ **Do not apply this until V2 content ships.** Changing the homepage title while the homepage is still hospitality-only content would create a mismatch between title and page — worse for SEO than either state alone.

---

## 4. Conventions to keep

| Convention | Rule |
|---|---|
| Page titles | `Page Name: NUA` — used consistently on 21 pages. Keep. |
| Legal name | `NUA AUS PTY LTD` in legal, footer and structured data only. Never in marketing copy. |
| Possessive | "NUA's" is fine. Never "the NUA". |
| Casing | Always `NUA`, never `Nua` or `nua` in prose. Lowercase only in code identifiers, filenames and URLs. |
| Modules | "NUA" + plain noun. Sentence case in prose: "the loyalty engine", not "the Loyalty Engine", unless naming the product. |

---

## 5. What changes, and when

Deliberately **not** applied in this commit. Each carries a different risk.

| Change | Files | When | Why wait |
|---|---|---|---|
| `NUA AI Agent` → `NUA Agent` | 7 across `docsData`, `plansData`, `Docs`, `Platform`, `Hero` | Safe to do now | Internal naming; no SEO exposure |
| `NUA Restaurant OS` → `NUA POS` | `schema.js` | Safe to do now | Structured-data `name` only |
| Homepage title / navbar badge | `Landing.jsx`, `Navbar.jsx`, `public/index.html` | **With V2 content** | Changes the primary indexed title of the highest-ranking page |

The first two are ~10 minutes. The third is a positioning change that should ship with the positioning.

---

## 6. What this policy forbids

- New sub-brands without a decision recorded here
- "AI" in a product name (it may describe behaviour in copy, sparingly — §39)
- "Restaurant" in the master brand or homepage title once V2 ships (§41)
- Mixed casing (`Nua`, `nua`) in prose
- The legal entity name in marketing copy
