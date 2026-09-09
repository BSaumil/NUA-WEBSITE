# Claims Register

**Directive:** §26 (Trust & credibility cleanup)
**Last audited:** 2026-09-09 · against `main` @ `8da0654`
**Owner column:** who must confirm the claim before it ships. "Product" = NUA product owner; "Legal" = legal/accountant; "Marketing" = whoever signs off site copy.

> §26 requires every quantitative or absolute marketing claim to carry: the claim, its evidence, an owner, a last-verified date, and the allowed wording.
>
> Australian Consumer Law treats an absolute representation about a future outcome as misleading unless there are reasonable grounds for it. The distinction used throughout this register is:
>
> - **Product-behaviour claims** describe what the software itself does. Defensible by inspection.
> - **Outcome claims** promise a result that depends on third parties — regulators, banks, networks, staff. Only defensible with contractual backing.

---

## 1. 🔴 Fixed this audit — absolute outcome claims

§26 names three of these verbatim as examples to remove or qualify. All were **live on the production site**. All are now changed.

| Was | Now | Why it was indefensible |
|---|---|---|
| "Zero downtime, ever" | "Built to keep trading offline" | Promised uninterrupted service. NUA does not control the venue's power, hardware, ISP, or the payment network. |
| "Zero manual logs, zero fines" | "Automated temperature records and alerts" | **"Zero fines" promises a regulatory outcome.** Fines are issued by a health authority on grounds NUA has no control over. Indefensible under any circumstances. |
| "Zero manual logs. Zero fines." | "Temperature records and alerts, automated." | As above. |
| "Zero double-bookings" | "Designed to prevent conflicting bookings" | Absolute for all time. Cannot hold against manual overrides, phone bookings entered late, or third-party channels. |
| "Zero double-bookings, ever." | "Designed to prevent conflicting bookings." | As above — "ever" makes it worse. |
| "never goes down" | "built to keep trading offline" | Same as "zero downtime". |

Replacement wording is taken directly from §26's own suggested language.

**Files:** `pages/Gallery.jsx`, `components/sections/LiveGallery.jsx`, `components/sections/MoreModules.jsx`

---

## 2. ✅ Reviewed and kept — product-behaviour claims

Absolute in form but describing the software's own design, not a promised outcome. Verifiable by using the product.

| Claim | Where | Evidence | Owner | Verified |
|---|---|---|---|---|
| "Zero clicks" | Gallery — Voice POS | Voice POS is a spoken-command interface. Describes the interaction model. | Product | 2026-09-09 |
| "Zero paper tickets" | Gallery — Kitchen Display | KDS replaces printed dockets with screens. That is what the module is. | Product | 2026-09-09 |
| "$1 spent = 1 point, credited instantly" | LiveGallery, featuresData | A configured rule in the Loyalty engine, not a performance promise. | Product | 2026-09-09 |
| "30-day money-back guarantee" | plansData — Lifetime | A commercial commitment NUA controls and can honour. | Legal | ⬜ **confirm this is honoured** |

---

## 3. 🟠 Needs owner verification before V2

Not changed, because they may well be true — but nothing in the repository evidences them, and §26 requires evidence rather than assumption.

| # | Claim | Where | What must be confirmed | Owner |
|---|---|---|---|---|
| 1 | **"$0 markup on top of bank rates"** / "$0 markup on bank rates" / "no bundled markup" | `LiveGallery.jsx:16`, `Gallery.jsx:44`, `MoreModules.jsx:15` | This is a **pricing representation**, the highest-risk class on the site. Is it true for every plan, every payment method and every acquiring arrangement? If it holds only on some plans or above a volume, the wording must say so. | Product + Legal |
| 2 | **"24/7 support"** | `plansData.js:77` (Enterprise) | Is 24/7 human coverage actually staffed and contracted? If it is best-effort or business-hours with an emergency path, say that. | Product |
| 3 | **"settled instantly"** | `MoreModules.jsx:15`, `Gallery.jsx:44` | Settlement timing is set by the acquirer, not NUA. "Instantly" is almost certainly authorisation, not settlement. Likely needs rewording. | Product + Legal |
| 4 | **"Smart routing, zero ticket drift"** | `featuresData.js:42` | Borderline. Reads as an operational outcome rather than a product description. Deliberately left for the owner rather than silently reworded. Suggested: "Smart routing that keeps tickets in order." | Marketing |
| 5 | **"Decisions made while you sleep"** | `LiveGallery.jsx:12` | Fine as positioning **provided** the autonomy model is represented accurately elsewhere — the agent only auto-executes in Assisted/Autonomous mode, within guardrails the operator sets. | Marketing |

---

## 4. ✅ Illustrative content — correctly disclaimed

§26 forbids invented venue names, logos or ratings presented as customer evidence.

| Item | Status |
|---|---|
| Trust marquee venue names (Saltgrass, Hojo & Co, Maru Bistro, …) | ✅ Carries "*Illustrative venue names for evaluation purposes." (`Hero.jsx:277`) |
| Customer logos | ✅ None used |
| Star ratings / review scores | ✅ None used |
| Testimonials | ✅ None used |
| Dashboard figures in product mockups | ✅ Presented as product demonstrations, not customer results |
| Competitor comparison pages | ✅ General category positioning only; per-page disclaimers (`compareData.js`) |

⚠️ **V2 watch item:** §11 §8 asks for customer proof. If real authorised customers do not exist yet, §38 requires case studies or "built with operators" content instead — **never fabricated logos or names as trust badges.** The current illustrative marquee must not silently become a customer-logo wall in V2.

---

## 5. Figures marked illustrative at source

Not site copy, but they support marketing claims and are recorded so nobody promotes them to fact:

| Figure | Where | Status |
|---|---|---|
| Competitor category pricing ($89/$65/$49/…) | Sales deck | Labelled illustrative in speaker notes |
| Food-cost trajectory (28.4% → 34.8% vs 27.4%) | Sales deck | Labelled illustrative — not a customer result |
| Loyalty cohort counts (3,180 / 2,240 / 1,120 / 410) | Sales deck | Labelled illustrative — single-venue example |
| Savings calculator inputs | `savingsData.js` | Operator-editable estimates, defaults shown as estimates |

---

## 6. Rules for new copy

1. **Never** promise an outcome controlled by a third party — regulators, banks, ISPs, payment networks, the venue's own staff.
2. **Never** use "ever", "always", "never" or "zero" about an outcome. They are fine about product design ("zero paper tickets").
3. Prefer capability language: *built to*, *designed to*, *automated*, *with approval controls and audit history*.
4. Any number in customer-facing copy needs a row in this register before it ships.
5. A claim that cannot be evidenced is not "aspirational" — it is unshipped.

---

## 7. Summary

| | Count |
|---|---|
| 🔴 Fixed this audit (indefensible absolutes) | **6** |
| ✅ Reviewed and kept (product-behaviour) | 4 |
| 🟠 Awaiting owner verification | 5 |
| ✅ Illustrative content correctly disclaimed | 6 categories |

**Most urgent:** item 3.1, the **"$0 markup"** pricing representation. It is the strongest commercial claim on the site and the one most likely to be relied on by a buyer.
