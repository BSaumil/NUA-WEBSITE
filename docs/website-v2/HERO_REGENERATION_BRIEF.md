# Homepage Hero — Regeneration Brief

**For:** whoever produces the image pack
**Covers:** the six files in `09_HOMEPAGE_HERO/`, the only folder not yet delivered
**Status:** requested 2026-09-09

---

## 1. Why these six are being redone

Three problems were found in the hero set. **All three are already forbidden by the pack's own rules** — this brief applies `IMAGE_MANIFEST.md` and `VISUAL_GENERATION_GUIDE.md`, it does not add new standards.

| Found | The pack's own rule |
|---|---|
| A star rating, `★★★★★ 4.8 from 2,000+ businesses`, rendered into the image | *"Prefer real NUA screenshots/components and live HTML/CSS for product UI, **important numbers**, headlines, buttons and CTAs."* |
| Six real third-party cosmetics brands shown as a customer logo wall | *"AI-drawn `NUA`, `nua`, or alternate wordmarks visible inside generated scenes are not authoritative logos."* — and third-party marks are a stronger version of the same problem |
| `£` pricing and UK locations | *"Australian market pages should use `$` / `AUD` and Australian terminology."* |

Two of these are not cosmetic.

**The rating is a fabricated review score.** NUA has no such rating. "Illustrative" cannot cover it, because nothing on the page tells a visitor it is illustrative — it reads as evidence. Australian Consumer Law treats a representation like that as misleading regardless of intent. The existing site already draws this line correctly: invented *venue names* carry the disclaimer "Illustrative venue names for evaluation purposes", because a made-up name is set dressing. A quantified score is proof.

**The six brands are real trading companies.** Showing their marks implies a customer relationship that does not exist. That is a trademark exposure, not just a consumer-law one, and it is the one item here that a third party rather than a regulator would act on.

The currency and locations are lower-stakes and covered by country-specific pricing — but AUD costs nothing to get right at generation time.

---

## 2. The rule that makes all three disappear

> **Generate the room. Not the interface, not the numbers, not the logos.**

Every hero file is already marked **"APPROVED SCENE — BRAND/UI OVERLAY REQUIRED"**. That status means the scene is approved and the branding and UI are supposed to be applied *in implementation* — as live HTML on top — not baked into the pixels.

So the fix is not "generate the same image with a different number in it". It is: **leave the space empty and let the website fill it.**

This is better for NUA independently of the compliance point:

- Text in HTML is selectable, translatable, indexable and screen-reader accessible. Text in a PNG is none of those.
- A price or a claim can be changed by editing a string, without regenerating an image.
- Real product UI beats generated product UI, and the site can composite it.
- It is what the manifest already asks for.

---

## 3. What to generate

Six scenes. **1672×941 (16:9)**, except where noted — matching the existing pack so the derivative pipeline needs no changes.

### Shared direction

Carried from `VISUAL_GENERATION_GUIDE.md`:

- Real business first, software second, intelligence third
- Warm white, ivory, stone, timber, stainless steel, natural venue materials
- Realistic operators and customers; hands doing work; natural believable lighting
- Avoid generic corporate stock, robots, holograms, neon brains, black/cyber styling
- Orange for operation and action; purple **only** for intelligence, forecasts and recommendations

### Shared exclusions — apply to all six

Do **not** render into the image:

- ❌ Star ratings, review scores, customer counts, "trusted by N businesses"
- ❌ Any third-party company name, logo or product mark
- ❌ Prices, plan names, or currency figures of any kind
- ❌ Phone numbers, street addresses, or place names
- ❌ The NUA wordmark, or any invented variant of it
- ❌ Legal entity names
- ❌ Sharp, readable body text in dashboards — suggest UI, do not spell it out

### Shared requirement — composition

Leave **deliberate clean negative space** where the live page will place its headline, subheading, CTA, logo and any real UI. Roughly the left third or the lower third depending on the scene. A composition that fills every corner leaves the website nowhere to put its own content, and forces the exact baked-in text this brief exists to remove.

### The six

| # | File | Ratio | Scene |
|---|---|---|---|
| 1 | `nua_modern_business_operating_system.png` | 16:9 | The master hero. One frame that reads as *business*, not *restaurant* — a working counter that could plausibly be hospitality, retail or a services reception. A person working, hardware present but not the subject. Wide clean space for the headline. |
| 2 | `nua_operating_system_homepage.png` | 16:9 | Alternate master. Same brief, different composition, so the two can be A/B tested or used at different breakpoints. |
| 3 | `nua_hospitality_pos_platform_homepage.png` | 16:9 | The hospitality mode of the business-type switch. Floor or pass, staff mid-service, a terminal visible. |
| 4 | `modern_retail_pos_saas_homepage.png` | 16:9 | The retail mode. Checkout counter, shelving behind, a customer being served. **No cosmetics brands, no product packaging bearing real marks** — plain or generic packaging only. |
| 5 | `spa_business_dashboard_hero_scene.png` | 16:9 | The services mode. A calm reception, a practitioner greeting a client, a booking screen present but not legible. Avoid anything implying a medical treatment claim. |
| 6 | `a_polished_commercial_marketing_scene_for_a_restau.png` | **1:1** | Square crop for social and card use. Hospitality scene, tighter framing, works cropped to a circle at the centre. |

---

## 4. What the website will add on top

So the generator knows what space to leave, and so nobody re-adds these to the raster later:

| Element | Where it comes from |
|---|---|
| Headline and subheading | Live HTML, from page content |
| NUA logo | `01_BRAND/nua-icon-authoritative-1024.png`, composited as a controlled overlay |
| Product UI | Real NUA screenshots and components |
| Prices | `plansData.js` — currently Starter $79, Growth $149, Enterprise $199 per month, Lifetime $3,499 one-time, all AUD |
| Legal entity | `siteConfig.js` — `NUA AUS PTY LTD`, ABN 54 299 131 653 |
| Any customer proof | Only when real and authorised. Until then, §38 requires case studies or "built with operators" content instead — never invented logos or scores. |

Note the prices above are the repository's current source of truth. The withdrawn hero showed a `$249 Scale` tier, which does not exist in the product. That is the third reason not to put prices in pixels: the image and the pricing page drifted apart, and the image won on the homepage.

---

## 5. Acceptance checklist

Before the batch is accepted, each file must satisfy:

- [ ] No rating, score, review count or customer count anywhere in frame
- [ ] No third-party brand, logo or product mark
- [ ] No price, plan name or currency symbol
- [ ] No phone number, address or place name
- [ ] No NUA wordmark rendered by the generator
- [ ] Clean negative space reserved for live copy and CTA
- [ ] Correct dimensions (16:9 at 1672×941; #6 at 1:1)
- [ ] Listed in `SHA256SUMS.txt` with a matching hash

The hash check is run automatically on upload. Everything above it is a human review.

---

## 6. If a scene really does need a screen in it

Sometimes a hero is weaker with a blank terminal. Two options, in order of preference:

1. **Leave the screen off, or angled away.** The strongest scenes in the delivered pack do this — the software is implied by the room and the person's posture.
2. **Show an indistinct interface.** Colour blocks, shapes, motion — enough to read as software, not enough to read as *words*. This satisfies "keep important UI text out of the raster" while keeping the screen in shot.

What to avoid is the middle ground: a screen with text almost legible enough to read. It draws the eye, invites scrutiny, and is the exact place where a wrong number or an invented metric ends up shipping.
