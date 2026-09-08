# Legal Entity — Action Required

**Date:** 2026-09-08
**Directive:** §28 (Legal / entity review)
**Audience:** business owner, accountant, legal adviser — not engineering

> §28: *"Do not guess the legal entity… Do not silently invent an ABN/ACN/company name… Only fill verified values."*
>
> Nothing below has been guessed, changed or filled in. This document reports what the live site currently states and what it is missing.

---

## 1. 🔴 Live defect — unresolved placeholder in Terms

**File:** `frontend/src/pages/TermsConditions.jsx:219`
**Route:** https://nuapos.com.au/terms
**Status:** rendering in production right now

The governing-law clause reads:

> These Terms are governed by the laws of **`[Insert State/Territory]`**, Australia, and you submit to the exclusive jurisdiction of the courts of that State/Territory.

### Why this needs a person, not an engineer

The governing State or Territory is a legal election about where NUA AUS PTY LTD is established and which courts have jurisdiction. It is commonly — but **not always** — the State of the registered office. Getting it wrong is not cosmetic: it determines where a dispute is heard.

### What is needed

One verified value, e.g. `New South Wales`, `Victoria`, `Queensland`.

### Then

```
frontend/src/pages/TermsConditions.jsx:219
  replace: [Insert State/Territory]
  with:    <the verified State or Territory>
```

Once supplied I will make the change, rebuild, and verify it renders on `/terms`. **Do not** ask me to infer it from the ABN or from where the business appears to operate.

---

## 2. ✅ Entity identifiers currently published

Defined once in `frontend/src/config/siteConfig.js` and consumed by the footer, contact page and `Organization` structured data:

| Field | Published value | Verification status |
|---|---|---|
| Legal name | `NUA AUS PTY LTD` | ⬜ **unverified against ASIC** |
| ABN | `54 299 131 653` | ⬜ **unverified against ABR** |
| Country | `AU` | ✅ consistent |
| Contact email | `info@nuapos.com.au` | ✅ consistent |
| Registered address | *(deliberately absent)* | ✅ intentional — see §3 |
| ACN | *(not published)* | ⬜ decision needed — see §4 |

These values were supplied previously and are used consistently. They have **not** been checked against a public register in this session.

### Recommended verification

| Register | Check |
|---|---|
| ABN Lookup — abr.business.gov.au | ABN `54 299 131 653` is active and its entity name matches `NUA AUS PTY LTD` exactly |
| ASIC — connectonline.asic.gov.au | Company name and status |

§28: *"If live website identifiers conflict with public registration evidence, flag them clearly."* No conflict is asserted here — only that the check has not been performed.

---

## 3. ✅ Registered business address — correctly absent

A placeholder (`[Insert registered business address]`) previously appeared on the contact page and was **removed** at the owner's instruction, pending a finalised address.

Current state, verified this session:

- No street address anywhere in the built output
- `Organization.address` emits `{"@type":"PostalAddress","addressCountry":"AU"}` — country only, no invented street data
- The contact page reads "Business details" with legal name and ABN

This is the correct handling. **When a registered address is finalised**, it should be added to `siteConfig.js` so the contact page and structured data update together.

---

## 4. ⬜ Open questions for the owner

| # | Question | Why it matters |
|---|---|---|
| 1 | Which State/Territory governs the Terms? | 🔴 Blocks removal of the live placeholder |
| 2 | Should the ACN be published alongside the ABN? | Common for Pty Ltd companies; some contexts expect it |
| 3 | Is a registered office address to be published? | Affects contact page + structured data; some jurisdictions expect a business address in T&Cs |
| 4 | Has the ABN been confirmed active on ABR? | Structured data asserts it publicly as `PropertyValue`/ABN |
| 5 | Do Terms and Privacy need legal review before V2 launch? | §57 "Trust" requires defensible claims; V2 expands into retail and professional services, which may change consumer-law exposure |

---

## 5. Scope note — V2 widens legal surface

The directive moves NUA from hospitality-only into **retail** and **professional services** (§9, §22, §23), and §23 warns: *"Avoid medical treatment claims unless product/legal scope supports them."*

Two consequences worth raising before V2 content is written:

1. **Services pages** covering spas, clinics and wellness can drift toward regulated health claims. §10 already says not to imply regulated clinical capabilities NUA does not support.
2. **Comparative marketing** against named competitors is governed by Australian Consumer Law. The repo's existing standard (`compareData.js`) — general category positioning, no specific competitor claims, per-page disclaimers — should be carried into V2 unchanged.

---

## 6. Summary

| Item | Severity | Blocked on |
|---|---|---|
| `[Insert State/Territory]` live on `/terms` | 🔴 | One verified value from owner/legal |
| Legal name + ABN unverified against registers | 🟠 | Owner/accountant confirmation |
| ACN publication decision | 🟡 | Owner decision |
| Registered address | 🟡 | Owner — correctly omitted meanwhile |
| Legal review before V2 launch | 🟠 | Owner to commission |

**Nothing here has been changed or invented.** Supply item 1 and I will fix it immediately.
