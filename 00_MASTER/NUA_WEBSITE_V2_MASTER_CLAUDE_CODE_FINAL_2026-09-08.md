# NUA WEBSITE V2 — MASTER REDESIGN, ASSET, MIGRATION & SWITCHING DIRECTIVE
**Date:** 2026-09-04  
**Website:** https://nuapos.com.au/  
**Brand:** NUA / NUA POS  
**Primary objective:** Rebuild the public website into a premium, realistic, conversion-led operating-system brand for **Hospitality, Retail, and Professional Services**, while preserving the entire current website as a parked, instantly recoverable legacy release.

---

# 0. EXECUTION MODE

You are Claude Code acting as senior product designer, brand director, staff frontend engineer, SEO engineer, performance engineer, conversion architect, accessibility engineer, and release engineer.

Do not merely redesign a homepage.

Deliver the complete production-ready NUA website system, including:
- information architecture
- UX
- UI
- responsive layouts
- real-world photography integration
- product UI composites
- lightweight motion
- product storytelling
- Hospitality pages
- Retail pages
- Professional Services pages
- Features / Products pages
- Pricing
- Resources
- Customers / proof
- About
- Contact
- SEO
- accessibility
- performance
- analytics instrumentation
- legal/footer cleanup
- image manifest
- legacy-site preservation
- parallel deployments
- one-command website switching
- portable domain reassignment
- rollback procedure
- release documentation

Work autonomously inside the repository.

Do not stop for cosmetic questions. Use the directives in this file as the decision system.

## Hard constraints
1. **DO NOT destroy, overwrite, squash away, or make inaccessible the current website.**
2. The current public website must be preserved exactly as a separately recoverable legacy release.
3. Do not delete current routes or content until the legacy snapshot and immutable deployment are verified.
4. Do not change production DNS/domain routing as part of normal implementation.
5. Production cutover must be performed only through the explicit release/switch command created in this directive.
6. Every domain switch must support a one-command rollback.
7. Do not use invented testimonials, invented customer logos, invented ratings, or fake external proof.
8. Use the existing authentic NUA logo files from the repository. Do not redraw or approximate the NUA logo.
9. Preserve all valid existing product functionality and SEO equity unless this directive intentionally improves it.
10. Prefer real product UI and realistic operational imagery over abstract AI graphics.

---

# 1. OUTCOME

The website should stop feeling primarily like an "AI startup website."

It should feel like:

> **A premium operating platform embedded inside real businesses.**

Visual formula:

**REAL BUSINESS → NUA SOFTWARE → INTELLIGENCE**

Not:

**AI → AI → AI → product**

Target impression:
- mature global technology company
- hospitality-native
- retail-ready
- professional-services-ready
- operational rather than conceptual
- fast and calm
- warm, premium, physical
- sophisticated without looking futuristic for its own sake

Reference quality:
- premium editorial photography
- strong commerce product photography
- Apple-like visual restraint
- modern POS merchandising
- real operational environments
- actual product screens
- short, confident copy

Do not copy competitors.

---

# 2. CURRENT WEBSITE — PRESERVE BEFORE TOUCHING

Before making redesign changes, inspect:
- git status
- branches
- tags
- current commit
- repository structure
- framework
- build command
- deployment provider
- DNS/provider configuration if represented in repo
- production environment variables
- current route inventory
- current sitemap
- current public assets
- current brand assets
- analytics
- current SEO metadata
- current redirects
- current legal pages

Generate:

`docs/website-v2/CURRENT_SITE_AUDIT.md`

with:
- current production SHA
- route list
- page titles
- major website components
- dependency snapshot
- build/deploy config
- logo asset paths
- public image asset paths
- analytics integrations
- current hosting provider
- current public URL
- migration risks

---

# 3. PARK THE CURRENT WEBSITE — MANDATORY

The current site is not to be "replaced and forgotten."

It must become a first-class **legacy release channel**.

## 3.1 Create immutable git references

Use the actual current production commit.

Create, if they do not already exist:

```bash
git branch website/legacy-2026-09-04 <CURRENT_PRODUCTION_SHA>
git tag -a nua-web-legacy-2026-09-04 <CURRENT_PRODUCTION_SHA> -m "NUA website legacy snapshot before V2 redesign"
```

Push both safely:

```bash
git push origin website/legacy-2026-09-04
git push origin nua-web-legacy-2026-09-04
```

Do not force-push.

## 3.2 Optional portable repository snapshot

If repo policy allows release artifacts, create a Git bundle outside normal source paths:

```bash
mkdir -p .release-backups
git bundle create .release-backups/nua-web-legacy-2026-09-04.bundle \
  website/legacy-2026-09-04 \
  nua-web-legacy-2026-09-04
```

Do **not** commit a large bundle unless repository policy explicitly supports that.

Document how to recreate the legacy branch from the tag.

## 3.3 Immutable legacy deployment

Inspect the current hosting provider and create a dedicated long-lived legacy deployment.

Preferred hostname:

`legacy.nuapos.com.au`

Alternative if provider restrictions exist:

`legacy-web.nuapos.com.au`

The legacy deployment:
- must build from `website/legacy-2026-09-04`
- must remain isolated from Website V2
- must not auto-follow `main`
- must have the same non-secret public configuration required to render correctly
- must be protected from accidental deletion
- should be noindex unless explicitly being used as the active production website
- should not receive canonical ownership while parked

## 3.4 V2 parallel deployment

Create V2 from the current production baseline.

Recommended branch:

```bash
git switch -c website/v2
```

Preferred staging hostname:

`next.nuapos.com.au`

Alternative:

`v2.nuapos.com.au`

Both websites must exist simultaneously:

```text
legacy.nuapos.com.au -> parked current website
next.nuapos.com.au   -> Website V2
nuapos.com.au        -> active production channel
```

## 3.5 Do not use source deletion as switching

Switching websites must happen at the deployment/domain-alias layer.

Do not make "rollback" mean:
- reverting dozens of commits
- manually restoring files
- force-pushing branches
- redeploying from memory

A rollback must mean:

> "point the production domain back to the legacy deployment."

---

# 4. WEBSITE CHANNEL / SWITCHING SYSTEM

Implement a small release-channel command system inside the repository.

Create:

```text
scripts/site-channel/
  adapter.ts
  providers/
  status.ts
  promote.ts
  domain.ts
  rollback.ts
```

Create package scripts similar to:

```json
{
  "scripts": {
    "site:status": "tsx scripts/site-channel/status.ts",
    "site:switch:legacy": "tsx scripts/site-channel/promote.ts legacy",
    "site:switch:v2": "tsx scripts/site-channel/promote.ts v2",
    "site:rollback": "tsx scripts/site-channel/rollback.ts",
    "site:domain": "tsx scripts/site-channel/domain.ts"
  }
}
```

If the project does not use Node/TypeScript tooling, implement equivalent scripts in the existing stack.

## Required operator commands

After implementation, the following operator experience must exist:

### Check which website is live

```bash
pnpm site:status
```

Example output:

```text
NUA Website Channel
Production domain: nuapos.com.au
Active release: v2
Active deployment: <provider-id>
Legacy deployment: <provider-id>
V2 deployment: <provider-id>
Last switch: 2026-09-04T...
Rollback target: legacy
```

### Activate the parked/current website

```bash
pnpm site:switch:legacy
```

This must:
- point `nuapos.com.au` and configured canonical production aliases to the legacy deployment
- preserve V2 at `next.nuapos.com.au`
- run health checks
- record previous active channel
- print rollback command

### Activate Website V2

```bash
pnpm site:switch:v2
```

This must:
- point `nuapos.com.au` to V2
- leave legacy online at `legacy.nuapos.com.au`
- run health checks
- record previous active channel
- print rollback command

### Roll back to the previously active site

```bash
pnpm site:rollback
```

### Bind a website release to another domain

Required conceptual interface:

```bash
pnpm site:domain --channel v2 --domain example.com.au
```

or:

```bash
pnpm site:domain --channel legacy --domain old.nuapos.com.au
```

The script must:
- validate the domain
- use the current provider's supported alias/custom-domain API or CLI
- not hardcode `nuapos.com.au` in application logic
- update/verify canonical-domain configuration
- print required DNS records if automation cannot finish them
- support dry run

Required dry run:

```bash
pnpm site:domain --channel v2 --domain example.com.au --dry-run
```

## 4.1 Provider adapter

Inspect the actual hosting provider and implement the correct adapter.

Do not assume Vercel, Railway, Cloudflare, Netlify, AWS, or another provider until inspected.

Design the release-channel abstraction so another provider can be added later.

Suggested interface:

```ts
interface SiteProviderAdapter {
  getStatus(): Promise<SiteChannelStatus>;
  promote(channel: "legacy" | "v2", domain: string): Promise<void>;
  bindDomain(channel: "legacy" | "v2", domain: string): Promise<void>;
  verify(domain: string): Promise<HealthCheckResult>;
  rollback(): Promise<void>;
}
```

Provider tokens/secrets:
- never commit
- use existing secret storage
- validate presence
- fail safely with actionable instructions

## 4.2 Canonical domain portability

The application must not scatter hardcoded production URLs throughout the codebase.

Create one canonical configuration source such as:

```env
NEXT_PUBLIC_SITE_URL=https://nuapos.com.au
SITE_CANONICAL_HOST=nuapos.com.au
```

or equivalent for the framework.

Use it for:
- canonical tags
- metadata
- sitemap
- robots
- OpenGraph URL
- structured data
- absolute links
- auth callback URLs where applicable
- marketing links

Domain movement should require configuration, not code rewrites.

---

# 5. RELEASE SAFETY

Before a switch:

```text
1. build passes
2. unit tests pass
3. lint passes
4. typecheck passes
5. key route smoke tests pass
6. Lighthouse/performance threshold passes
7. robots/canonical rules are correct
8. production health endpoint passes
9. legacy health endpoint passes
10. V2 health endpoint passes
11. operator gets a clear diff/status
```

After switching:
- verify HTTP 200
- verify homepage
- verify 5 key pages
- verify forms
- verify analytics
- verify sitemap
- verify robots
- verify canonical
- verify logo/assets
- verify no mixed-content errors
- verify mobile

Store release history at:

`docs/website-v2/RELEASE_HISTORY.md`

---

# 6. BRAND SYSTEM

Use the actual NUA logo asset already present in the repository.

If multiple NUA marks exist:
- identify canonical wordmark
- identify app icon
- identify monochrome variants
- record them in `BRAND_ASSET_INDEX.md`

Do not generate a fake NUA wordmark with CSS or SVG approximation.

## Primary palette

Retain NUA orange as the dominant brand/action colour.

Use existing brand token if defined.

If current token is:

`#F58C14`

retain it unless repository evidence proves the canonical orange differs.

Secondary existing brand colour may include purple.

Suggested website system:

```text
NUA Orange       = canonical logo orange
Warm White       = #FAF8F5
Soft Stone       = #F1EEE9
Paper White      = #FFFFFF
Charcoal         = #171717
Soft Charcoal    = #2B2927
Border Warm Grey = #E7E1DA
Muted Text       = #6D6965
```

### Intelligence colour
Reserve purple for:
- NUA Insight
- intelligence
- prediction
- recommendations
- automation
- Pulse
- agent suggestions

Do not make purple a general CTA colour.

### Pink
Use very sparingly for:
- marketing/CRM accent
- occasional segmentation
- rarely as a primary block

Visual semantic rule:

> **ORANGE = NUA OPERATING**  
> **PURPLE = NUA THINKING**

---

# 7. LIGHT/DARK BALANCE

Do not keep the existing website predominantly black.

Target:

```text
80% light / warm
20% dark contrast
```

Use dark charcoal sections strategically:
- cinematic product demonstration
- KDS / night service
- one intelligence story
- optional footer or high-contrast break

Do not create a page that looks like a cyber-security dashboard.

---

# 8. TYPOGRAPHY

Use typography with:
- strong editorial display headlines
- highly legible product/UI sans-serif
- generous spacing
- restrained sizes on mobile

Suggested editorial headline tone:

```text
Built for the rush.
Know the floor.
Run the back of house.
Never wonder what's in stock.
Know every client.
You can go home. NUA doesn't.
```

Avoid:
- inflated superlatives
- walls of copy
- repetitive "AI-powered" phrasing
- buzzword soup

---

# 9. WEBSITE POSITIONING

Primary master positioning:

# NUA
## The operating system for modern business.

Support:

**Built for hospitality, retail and professional services.**

Do not make the master homepage opening claim only "AI Restaurant Manager."

NUA Intelligence should be powerful but secondary in visual hierarchy.

---

# 10. TOP-LEVEL INFORMATION ARCHITECTURE

Recommended main navigation:

```text
NUA logo
Hospitality
Retail
Services
Products
Pricing
Resources
Login
Book a Demo
```

Desktop: mega menus with photography.

Mobile: concise accordion navigation.

## Hospitality sub-navigation
- Restaurants
- Cafés
- Bars & Pubs
- Quick Service
- Fine Dining
- Multi-site Hospitality

## Retail sub-navigation
- Fashion
- Beauty Retail
- Grocery / Convenience
- Specialty Retail
- Multi-location Retail

## Professional Services
- Hair & Beauty
- Barbers
- Spas & Wellness
- Clinics / service businesses where legally appropriate
- Studios
- Other appointment-led businesses

Do not imply regulated clinical capabilities NUA does not actually support.

## Products
Group products into five operating worlds:

### SELL
- POS
- Payments
- Mobile POS
- Online Ordering / Omnichannel if implemented
- Returns / refunds where implemented

### SERVE
- Reservations
- Waitlist
- Floor plan
- Guest profiles
- KDS
- Appointment scheduling
- client check-in

### OPERATE
- Inventory
- Purchasing
- Suppliers
- Pantry
- Invoice import
- Menu import
- Staff
- Rostering
- Payroll shell if actually implemented
- Multi-location

### GROW
- CRM
- Loyalty
- Memberships
- Gift cards
- Referrals
- Marketing
- Social media
- campaigns

### KNOW
- Analytics
- Reports
- Pulse
- Forecasting
- Voice
- NUA Intelligence / Agent
- operational insights

Only market features actually implemented or clearly marked as upcoming.

---

# 11. HOMEPAGE — NEW STORY

## Section 1 — Cinematic Hero

Light/warm hero.

Use real-world scenes:
- hospitality on one side
- retail/service on another
- or interactive business-mode switch

Master headline:

> **The operating system for modern business.**

Support:

> Built for hospitality, retail and professional services.

Primary CTA:
`Book a Demo`

Secondary:
`See NUA in Action`

Small product row:
`POS · Payments · Bookings · Inventory · Staff · Loyalty · Insights`

Do not lead with a dashboard wall.

## Section 2 — Business mode selector

Create:

```text
[ Hospitality ] [ Retail ] [ Services ]
```

Changing mode should transform:
- photograph
- product labels
- UI sample
- feature emphasis
- language

Do not reload full page if avoidable.

## Section 3 — One shift/day with NUA

Create a visual operating story.

Hospitality:

```text
7:00 AM  Opening
12:30 PM Lunch rush
3:30 PM  Prep & stock
7:15 PM  Dinner
10:45 PM Close
```

Retail:

```text
9:00 AM  Open
12:30 PM Trade
2:00 PM  Click & collect
4:15 PM  Stock transfer
6:00 PM  Close
```

Services:

```text
8:30 AM  Calendar
10:00 AM Check-in
1:00 PM  Staff / rooms
4:00 PM  Rebooking
6:00 PM  End-of-day
```

## Section 4 — Physical ecosystem

Show:
- countertop POS
- handheld
- KDS
- payment terminal
- scanner
- customer display
- staff/owner mobile app

Use real device/product photography where legally available or NUA-owned.

## Section 5 — Five operating worlds

Large visual modules:
- Sell
- Serve
- Operate
- Grow
- Know

Do not use 20 small repetitive SaaS cards.

## Section 6 — Product-in-reality

Use full-bleed realistic photography with authentic NUA UI overlays.

## Section 7 — Intelligence

Only here introduce deeper autonomous capability.

Headline example:

> **NUA sees what the business needs next.**

Show a realistic recommendation:
- increase FOH coverage
- purchase low stock
- re-engage lapsed client
- identify demand spike
- flag margin change

Keep it assistive and explainable.

## Section 8 — Customer proof

Only real authorised customers.

If insufficient:
- use case studies
- founder-led pilot stories
- product demonstrations
- "Built with operators" content

Do not fabricate logos/ratings/testimonials.

## Section 9 — Pricing

Simple.
Short.
Segment-aware.

## Section 10 — CTA

Warm white / pale orange.

> **Run your business with NUA.**

CTA:
`Book a Demo`

---

# 12. VISUAL STORYTELLING PRINCIPLE

Website target:

```text
60% real photography/video
25% actual NUA interface
10% typography
5% decorative graphics
```

When possible:

> If an image can explain it, remove the paragraph.

Visuals should answer:
- what is happening?
- who is using NUA?
- where is it used?
- what changed because NUA is there?

---

# 13. PHOTOGRAPHY DIRECTION

Avoid:
- generic corporate stock photography
- futuristic robots
- glowing brains
- neon server rooms
- excessive 3D AI shapes
- random holograms
- fake hardware

Prefer:
- hands
- real service
- staff using tablets
- chef at pass
- host at door
- customer checkout
- stock count
- scanner use
- packing click & collect
- salon reception
- appointment check-in
- owner checking performance
- realistic venue/store lighting
- premium but believable environments

Photography should have:
- warm neutrals
- natural light
- genuine activity
- shallow but not excessive depth of field
- real materials: timber, stone, stainless, linen, glass

---

# 14. NUA UI OVERLAY SYSTEM

Build a reusable marketing overlay component library.

Examples:
- POS order sent
- payment approved
- reservation arriving
- VIP
- waitlist
- low stock
- purchase suggestion
- labour %
- loyalty wallet
- customer profile
- appointment
- rebooking
- returns
- store transfer
- campaign suggestion
- NUA Insight

UI overlays:
- warm white card
- subtle border
- restrained shadow
- orange for actions
- purple for Intelligence
- real data labels
- no meaningless lorem ipsum

Do not permanently bake important text into raster images where responsive HTML can overlay it.

Prefer:
- photo as image
- UI/data as live HTML overlays
when practical.

This improves:
- accessibility
- localization
- responsiveness
- SEO
- content updates

---

# 15. FEATURE IMAGE MANIFEST

Create at least **2–3 visual assets per major product capability**.

Use:
1. context image
2. interface/action image
3. outcome/analytics image where useful

Store manifests in:

`docs/website-v2/IMAGE_MANIFEST.md`

Asset naming:

```text
nua-{vertical}-{feature}-{scenario}-{index}-{ratio}.webp
```

Example:

```text
nua-hospitality-pos-table-service-01-16x9.webp
nua-hospitality-pos-counter-02-4x3.webp
nua-retail-inventory-stock-transfer-01-16x9.webp
nua-services-bookings-client-checkin-01-16x9.webp
```

## Hospitality image families

Create visual briefs for:

### POS
- waiter tableside ordering
- counter POS
- payment completion

### Payments
- card terminal
- split/tip/payment flow where implemented
- customer checkout

### Reservations
- host stand
- floor plan overlay
- arriving booking

### Waitlist
- walk-in
- SMS/ready state
- table assignment

### Floor Plan
- actual dining room
- digital table map
- occupancy/turn-time

### KDS
- kitchen pass
- live ticket queue
- order ready/expedite

### Inventory
- cool room/pantry
- low stock
- usage/forecast

### Purchasing
- supplier comparison
- reorder suggestion
- purchase order

### Staff / Rostering
- shift briefing
- schedule
- demand-based staffing suggestion

### Loyalty
- returning guest
- wallet/pass
- reward redemption

### CRM
- guest profile
- preferences
- visit history

### Analytics
- owner reviewing phone/tablet
- sales/labour/food cost
- end-of-day

### Voice
- hands-busy service scenario
- spoken command
- confirmed action

### NUA Intelligence
- operational suggestion
- approval
- audit trail / outcome

### Marketing
- guest segment
- campaign
- return visit

### Social Media
- dish photographed
- generated content preview
- scheduled post

### Menu Import
- printed/PDF menu
- import processing
- resulting POS catalog

### Invoice Import
- supplier invoice
- extraction
- stock/cost update

### Pantry
- physical pantry
- digital stock list
- reorder state

### Kitchen Timer
- active cooking
- timer card
- completion

### Multi-location
- multiple venues
- comparison
- owner overview

---

# 16. RETAIL IMAGE FAMILIES

Create 2–3 each:

### Retail POS
- boutique checkout
- scanner
- payment complete

### Product Catalog
- variants
- size/colour
- search

### Barcode
- scan product
- instant item lookup
- stock adjustment

### Inventory
- store count
- low stock
- cross-store visibility

### Store Transfers
- transfer request
- in transit
- received

### Returns / Exchanges
- item return
- original payment refund
- size exchange

### Click & Collect
- online order
- packing
- customer pickup

### Customer CRM
- profile
- purchase history
- VIP/re-engagement

### Loyalty
- points
- rewards
- repeat purchase

### Purchasing
- low-stock suggestion
- PO
- supplier delivery

### Analytics
- daily sales
- conversion / basket if implemented
- location comparison

### Multi-store
- location dashboard
- staff
- cross-location stock

### Staff
- roster
- permissions
- sales performance where appropriate

### Marketing
- customer segment
- campaign
- attributable return

### NUA Intelligence
- reorder recommendation
- anomaly
- store staffing suggestion

---

# 17. PROFESSIONAL SERVICES IMAGE FAMILIES

Create 2–3 each:

### Appointments
- reception calendar
- client check-in
- service completion

### Service POS / Checkout
- service line items
- retail add-on
- payment

### Client CRM
- profile
- service history
- preferences/notes

### Memberships
- active plan
- inclusions
- renewal

### Rebooking
- checkout prompt
- next appointment
- conversion metric

### Loyalty
- visit reward
- points
- redemption

### Staff Scheduling
- appointment load
- roster
- coverage

### Inventory
- professional products
- low stock
- reorder

### Packages / Gift Cards
- package
- balance
- redemption

### Marketing
- lapsed client
- campaign
- return booking

### Analytics
- appointments
- utilisation
- revenue
- rebooking

### Multi-location
- studios/locations
- performance
- staffing

### NUA Intelligence
- predicted rebooking
- inventory suggestion
- staffing suggestion

Only include capabilities that exist or are intentionally shipping in this website release.

---

# 18. IMAGE RATIOS

For each priority hero/feature family prepare:

```text
16:9 desktop hero
4:3 desktop/tablet
1:1 social/card
4:5 editorial
9:16 mobile/vertical where needed
```

Do not simply crop faces/devices off.

Use `object-position` deliberately.

Generate modern formats:
- AVIF preferred
- WebP fallback where required

Use responsive `srcset`.

---

# 19. MOTION

Motion should demonstrate operation, not decorate.

Good motion:
- order moves POS → KDS
- booking moves reserved → seated
- item scan adds to cart
- inventory drops after sale
- transfer changes location
- appointment changes confirmed → checked in → complete
- insight appears only after underlying event
- loyalty reward credits after checkout

Bad motion:
- constant floating gradient blobs
- excessive parallax
- meaningless particles
- looping AI brain animations

Respect `prefers-reduced-motion`.

---

# 20. MICRO-INTERACTIONS

Implement:
- smooth business-mode switching
- feature image swaps
- product screen hover detail
- table hover / booking data
- cart item scan
- KDS ticket transition
- inventory status update
- rebooking conversion
- collapsible product mega menus

All interactions must remain usable:
- keyboard
- touch
- screen reader
- reduced motion

---

# 21. HOSPITALITY PAGE

Headline examples:

> **Built for service.**

> **Built for the rush.**

Show:
- POS
- payments
- tables
- reservations
- KDS
- staff
- inventory
- guest loyalty
- analytics
- Intelligence

Story should follow the venue day.

---

# 22. RETAIL PAGE

Headline examples:

> **One system. Every store. Every sale.**

or:

> **Sell beautifully. Operate intelligently.**

Show:
- checkout
- barcode
- product variants
- inventory
- customers
- returns
- click & collect
- multi-store
- purchasing
- analytics
- Intelligence

Do not reuse restaurant imagery.

---

# 23. PROFESSIONAL SERVICES PAGE

Headline examples:

> **Appointments, beautifully handled.**

or:

> **Know every client.**

Show:
- calendar
- check-in
- services
- client profiles
- memberships
- loyalty
- rebooking
- staff
- inventory
- checkout
- analytics
- Intelligence

Photography can initially focus on:
- salon
- spa/wellness
- barber
- appointment-led studio

Avoid medical treatment claims unless product/legal scope supports them.

---

# 24. PRODUCTS / FEATURE PAGE

Replace repetitive generic cards with visual product demonstrations.

Each product page should include:

```text
Hero
Real-world use case
Actual NUA UI
Workflow
Outcome
Relevant integrations
Vertical examples
FAQ
CTA
```

Keep copy short.

---

# 25. GALLERY / PRODUCT PROOF

Preserve a deep gallery/demo section but upgrade it.

For each interface:

```text
REAL ENVIRONMENT | ACTUAL NUA SCREEN
```

Examples:
- restaurant → floor plan
- kitchen → KDS
- counter → POS
- stockroom → inventory
- owner → Pulse
- retail counter → retail POS
- salon desk → booking calendar

Avoid presenting constructed mock screens as if they are customer evidence.

Label interactive/product demos accurately.

---

# 26. TRUST & CREDIBILITY CLEANUP

Current public claims must be audited.

Remove or qualify:
- invented venue names
- illustrative logos presented as customer evidence
- invented ratings
- impossible absolutes
- unverified performance numbers
- claims such as "zero downtime ever"
- "zero fines"
- "zero double bookings ever"
unless actually contractually and technically supportable

Better language:
- "Built to keep trading offline."
- "Designed to prevent conflicting bookings."
- "Automated temperature records and alerts."
- "Recommendations with approval controls and audit history."

Create:

`docs/website-v2/CLAIMS_REGISTER.md`

Each quantitative/absolute marketing claim must have:
- claim
- evidence/source
- owner
- last verified date
- allowed wording

---

# 27. DATA CONSISTENCY

All demo metrics must reconcile.

Example checks:
- Revenue
- Covers/transactions
- AOV
- labour %
- food cost
- booking counts
- inventory

Do not show mathematically inconsistent fake dashboards.

Add a test or data utility where practical so demo fixtures remain internally coherent.

---

# 28. LEGAL / ENTITY REVIEW

Audit footer/legal entity strings across:
- homepage footer
- terms
- privacy
- contact
- pricing
- checkout/form terms

Do not guess the legal entity.

Create:

`docs/website-v2/LEGAL_ENTITY_ACTION_REQUIRED.md`

If live website identifiers conflict with public registration evidence, flag them clearly for owner/accountant/legal review.

Do not silently invent an ABN/ACN/company name.

Remove template placeholders such as:
- `[Insert State/Territory]`
- `[Company Name]`
- placeholder addresses
- placeholder governing law

Only fill verified values.

---

# 29. PRICING

Keep pricing easy to understand.

Avoid giant feature-comparison walls.

Use:
- concise tier cards
- "who this is for"
- number of registers/locations where applicable
- clear payment-processing distinction
- clear inclusions
- FAQ below

Allow business type filter:
- Hospitality
- Retail
- Services

Do not imply payment processing fees are included unless true.

---

# 30. SEO ARCHITECTURE

Create intentional landing pages.

Examples:

```text
/hospitality
/hospitality/restaurants
/hospitality/cafes
/hospitality/bars
/hospitality/quick-service

/retail
/retail/fashion
/retail/beauty
/retail/grocery
/retail/specialty
/retail/multi-store

/services
/services/salon
/services/barber
/services/spa
/services/studio

/products/pos
/products/payments
/products/bookings
/products/kds
/products/inventory
/products/loyalty
/products/staff
/products/analytics
/products/marketing
/products/nua-intelligence
```

Only create pages with enough unique content to avoid thin SEO duplication.

Implement:
- canonical
- OpenGraph
- Twitter metadata
- sitemap
- robots
- schema.org where accurate
- breadcrumbs
- internal linking
- semantic headings
- unique titles/descriptions

Preserve old URL equity with explicit redirects.

Generate:

`docs/website-v2/REDIRECT_MAP.md`

---

# 31. PERFORMANCE

Target:
- excellent Core Web Vitals
- lazy load non-critical photography
- preload only true hero
- responsive images
- AVIF/WebP
- code-split heavy demos
- do not autoplay large uncompressed video
- defer below-the-fold animations
- avoid layout shift
- reduce client JS

Lighthouse target on representative production build:

```text
Performance >= 90
Accessibility >= 95
Best Practices >= 95
SEO >= 95
```

Do not game Lighthouse by removing functionality.

---

# 32. ACCESSIBILITY

Target WCAG 2.2 AA.

Required:
- semantic landmarks
- skip link
- keyboard access
- visible focus
- colour contrast
- form labels
- error states
- reduced motion
- screen-reader naming
- alt text
- no text-only-in-image for critical messaging
- touch targets
- meaningful link copy

Photography alt text should explain meaningful context, not keyword-stuff.

---

# 33. RESPONSIVE DESIGN

Design mobile intentionally.

Do not shrink desktop.

Mobile:
- compact sticky header
- business-mode switch
- headline max 2–4 lines
- photography crops preserve action
- UI overlays reflow under image
- feature story becomes vertical timeline
- pricing remains readable
- no tiny charts
- no horizontal scroll
- CTAs remain thumb-friendly

---

# 34. WEBSITE COMPONENT SYSTEM

Create reusable components, e.g.:

```text
SiteHeader
MegaMenu
BusinessModeSwitcher
EditorialHero
ContextImage
ProductOverlay
InsightCard
MetricCard
FeatureStory
ShiftTimeline
HardwareRail
OperatingWorlds
CustomerProof
PricingCards
DemoCTA
SiteFooter
```

Keep implementation within the existing framework conventions.

---

# 35. DESIGN TOKENS

Create/standardise tokens for:
- colour
- spacing
- radius
- typography
- border
- shadow
- motion
- breakpoints
- z-index

Avoid one-off magic values.

---

# 36. ANALYTICS & CONVERSION

Instrument:
- Book a Demo CTA
- See NUA in Action
- Hospitality/Retail/Services mode switch
- pricing interaction
- feature page CTA
- form start
- form complete
- gallery interaction
- scroll-depth meaningful milestones

Respect current consent/privacy architecture.

Do not add invasive tracking.

Create:
`docs/website-v2/ANALYTICS_EVENTS.md`

---

# 37. DEMO FORM

Demo form should be short.

Suggested fields:
- name
- business
- work email
- phone optional/required depending current sales process
- business type
- number of locations
- optional message

Do not ask 15 questions before conversion.

---

# 38. CUSTOMER STORIES

If real authorised customers exist, build:
- portrait / venue image
- business context
- problem
- NUA setup
- measurable result
- quote

Do not use fake names as trust badges.

---

# 39. COPY RULES

Use:
- short
- operator language
- outcome language
- clear verbs

Prefer:

> "Send orders straight to the kitchen."

over:

> "Leverage our intelligent unified ecosystem for frictionless operational orchestration."

Avoid saying "AI" in every section.

NUA Intelligence should demonstrate value through:
- prediction
- recommendation
- automation
- auditability

---

# 40. VISUAL TEST

For each major page, perform this test:

> If most text disappeared, could a hospitality operator, retailer, or service-business owner still understand what NUA does?

If no, improve the visuals.

Second test:

> Could an image/interface demonstrate this paragraph faster?

If yes, replace or shorten the paragraph.

---

# 41. NEW WEBSITE SHOULD NOT BLOCK FUTURE INDUSTRIES

Keep the master brand broad enough that NUA can later expand.

Do not permanently define NUA only as:
- restaurant software
- café POS
- retail checkout

Master brand:

> **The operating system for modern business.**

Industry pages become vertical expressions of the common platform.

---

# 42. ROUTE MIGRATION

Do not remove existing route value casually.

For every old route:
- keep
- improve
- merge with redirect
- intentionally retire

Document decision.

No broken URLs.

---

# 43. CONTENT INVENTORY

Generate:

`docs/website-v2/CONTENT_INVENTORY.md`

Include:
- route
- current purpose
- keep/change/remove
- target audience
- primary CTA
- SEO target
- hero image family
- required product UI
- legacy redirect decision

---

# 44. IMAGE QUALITY CONTROL

Do not publish an AI-generated marketing image if:
- logo is malformed
- UI text is gibberish
- device hardware is physically impossible
- fingers/hands are broken
- receipt/card terminal is nonsensical
- random brands appear
- fake customer logos appear
- impossible pricing/data is visible

For production:
1. use generated photography as background/context only if high quality
2. overlay actual NUA UI using HTML/CSS or real screenshots
3. use actual NUA logo asset
4. remove all fake brand marks from generated imagery
5. keep important interface text outside raster assets where possible

---

# 45. IMAGE PRODUCTION PIPELINE

Create:

```text
public/marketing/
  hospitality/
  retail/
  services/
  products/
  hardware/
  intelligence/
```

Original source assets should not be overcompressed.

Build script should output responsive derivatives where stack supports it.

Generate `image-manifest.json` with:
- id
- vertical
- feature
- ratio
- source
- alt
- focal point
- usage
- status
- rights/source note

---

# 46. DO NOT MIX INDUSTRIES RANDOMLY

Master homepage can mix industries deliberately.

Industry pages must feel native.

Hospitality page:
- restaurant/café/bar imagery

Retail page:
- store/checkout/stock imagery

Services page:
- appointments/client/reception/studio imagery

Do not put a restaurant KDS into a salon page.

---

# 47. DARK SECTIONS

Where dark sections are used:
- keep them purposeful
- KDS/night service
- deep analytics demo
- intelligence command sequence

Use warm charcoal rather than pure black where possible.

---

# 48. ICONOGRAPHY

Use simple line icons.

NUA orange for active/action.

Purple only for Intelligence.

Do not use an unrelated icon pack style from section to section.

---

# 49. FOOTER

Light or warm-stone footer preferred.

Include:
- Hospitality
- Retail
- Services
- Products
- Resources
- Company
- Legal
- Login
- Book a Demo

Legal entity must be verified.

---

# 50. PRE-LAUNCH CONTENT CORRECTIONS

Audit for:
- illustrative customers
- fake venue names
- placeholder metrics
- placeholder legal values
- stale copyright year
- wrong pricing
- impossible guarantees
- inconsistent names: NUA / NUA POS / NUA AI / NUA Restaurant OS

Create one naming policy.

Suggested:
- master brand: **NUA**
- product category where useful: **NUA POS**
- intelligence layer: **NUA Intelligence**
- owner/mobile experience: use actual shipped product name
- do not invent new sub-brands unnecessarily

---

# 51. TESTING

Required tests:
- build
- typecheck
- lint
- unit
- component
- route smoke
- responsive
- accessibility
- forms
- navigation
- switching script dry-run
- switching status
- canonical host logic
- redirects
- sitemap
- robots

Do not perform destructive DNS changes in automated tests.

---

# 52. WEBSITE SWITCHING ACCEPTANCE TESTS

The project is not done until:

```text
[ ] legacy git branch exists
[ ] legacy tag exists
[ ] legacy deployment exists
[ ] V2 deployment exists
[ ] both can be loaded independently
[ ] production domain is not coupled to source deletion
[ ] `site:status` works
[ ] `site:switch:legacy` works or is fully provider-configured and ready
[ ] `site:switch:v2` works or is fully provider-configured and ready
[ ] `site:rollback` works
[ ] `site:domain --dry-run` works
[ ] health checks exist
[ ] canonical URL can change by environment
[ ] parked site noindex behavior is correct
[ ] active site owns canonical
[ ] switch documentation exists
```

If provider permissions prevent actually testing domain mutation:
- fully implement the adapter
- validate dry run
- document exact missing credential/permission
- do not fabricate success

---

# 53. OPERATOR RUNBOOK

Create:

`docs/website-v2/SITE_SWITCH_RUNBOOK.md`

It must be understandable by a non-engineer.

Include:

## See current live site

```bash
pnpm site:status
```

## Put Website V2 live

```bash
pnpm site:switch:v2
```

## Restore old website

```bash
pnpm site:switch:legacy
```

## Undo latest switch

```bash
pnpm site:rollback
```

## Put V2 on another domain

```bash
pnpm site:domain --channel v2 --domain newdomain.com
```

## Preview a domain move

```bash
pnpm site:domain --channel v2 --domain newdomain.com --dry-run
```

Include provider-specific notes generated from the actual hosting platform.

---

# 54. RELEASE CHANNEL UX

If possible, protect production switching with:
- explicit interactive confirmation
- current/target display
- dry-run
- health validation
- rollback state

Example:

```text
Current: legacy
Target: v2
Domain: nuapos.com.au
Health: PASS
Canonical: PASS
Ready: YES

Type SWITCH to continue:
```

Also support CI/non-interactive mode only through explicit flag:

```bash
pnpm site:switch:v2 -- --yes
```

Do not make destructive defaults.

---

# 55. DOMAIN MOVE ARCHITECTURE

Ensure V2 can be moved to another domain without rebuilding the website architecture.

Things that must be configurable:
- canonical URL
- sitemap base
- robots sitemap reference
- OpenGraph URL
- form origin allowlists
- CORS where applicable
- analytics domain
- auth callback if any
- webhook origin if any
- demo-booking callback
- CSP connect-src/img-src if domain-specific

Document:

`docs/website-v2/DOMAIN_PORTABILITY.md`

---

# 56. SUGGESTED RELEASE STRATEGY

### Phase A — Freeze legacy
- audit
- branch
- tag
- immutable deploy
- verify

### Phase B — Build V2
- branch
- design system
- pages
- imagery
- UI overlays
- copy
- SEO
- performance

### Phase C — Parallel QA
- legacy.nuapos.com.au
- next.nuapos.com.au
- no production change

### Phase D — Soft launch
- internal review
- mobile/device QA
- conversion QA
- legal check
- claims check

### Phase E — Production switch
- `pnpm site:switch:v2`

### Phase F — Rollback if needed
- `pnpm site:rollback`
or:
- `pnpm site:switch:legacy`

Do not delete either deployment after launch.

---

# 57. DEFINITION OF DONE

Website V2 is done only when:

### Brand
- NUA logo authentic
- orange-first light visual identity
- purple restricted to Intelligence
- photography feels operational

### UX
- Hospitality, Retail, Services clear
- mobile excellent
- short copy
- visual product storytelling

### Product
- all major current capabilities represented accurately
- actual UI used wherever practical
- no feature invented accidentally

### Trust
- no fake customers
- no fake ratings
- no placeholder legal values
- claims defensible

### SEO
- metadata
- sitemap
- redirects
- structured data
- canonical
- fast pages

### Engineering
- clean components
- no unnecessary code duplication
- automated tests
- accessible
- high performance

### Release
- legacy parked
- V2 parallel
- one-command switching
- one-command rollback
- movable to another domain
- documented

---

# 58. DELIVERABLES

At completion, produce:

```text
docs/website-v2/
  CURRENT_SITE_AUDIT.md
  WEBSITE_V2_ARCHITECTURE.md
  CONTENT_INVENTORY.md
  IMAGE_MANIFEST.md
  BRAND_ASSET_INDEX.md
  DESIGN_SYSTEM.md
  CLAIMS_REGISTER.md
  LEGAL_ENTITY_ACTION_REQUIRED.md
  REDIRECT_MAP.md
  SEO_REPORT.md
  ACCESSIBILITY_REPORT.md
  PERFORMANCE_REPORT.md
  ANALYTICS_EVENTS.md
  DOMAIN_PORTABILITY.md
  SITE_SWITCH_RUNBOOK.md
  RELEASE_HISTORY.md
  FINAL_IMPLEMENTATION_REPORT.md
```

Also deliver:
- completed website implementation
- image assets
- responsive derivatives
- route tests
- switch tooling
- legacy deployment reference
- V2 deployment reference
- exact production switch command
- exact rollback command

---

# 59. FINAL REPORT FORMAT

When complete, report:

```text
NUA WEBSITE V2 — FINAL REPORT

Legacy snapshot:
Legacy tag:
Legacy branch:
Legacy deployment:
V2 branch:
V2 deployment:
Current production channel:

Pages completed:
Features represented:
Image families completed:
SEO:
Accessibility:
Performance:
Tests:
Open legal/claim items:

SWITCH TO V2:
<exact command>

SWITCH TO LEGACY:
<exact command>

ROLLBACK:
<exact command>

MOVE V2 TO ANOTHER DOMAIN:
<exact command>

Known limitations:
```

Do not claim something is complete if blocked by credentials/provider permissions.

---

# 60. EXECUTION PRIORITY

Execute in this order:

## P0
- preserve legacy website
- verify legacy
- audit stack
- design/release architecture
- legal/claims blockers
- canonical/domain portability
- switching system

## P1
- new brand system
- homepage
- Hospitality
- Retail
- Services
- product grouping
- navigation
- responsive system

## P2
- full feature pages
- image production
- actual UI overlays
- product gallery
- pricing
- customer proof

## P3
- animation
- microinteractions
- SEO expansion
- analytics
- performance tuning
- accessibility polish

## P4
- final QA
- parallel deploy
- runbook
- production-readiness report

Do not perform the actual production switch unless explicitly commanded by the operator.

---

# 61. GUIDING PRINCIPLE

Build NUA so that a visitor can understand the product before reading a paragraph.

Real people.  
Real businesses.  
Real transactions.  
Real service.  
Real products.  
Real NUA interfaces.

Then let the intelligence reveal itself underneath.

> **NUA should look like the operating layer of the business, not an AI website trying to look futuristic.**

---

# 62. START NOW

Begin by:
1. reading this entire directive
2. auditing the current repository
3. preserving the current production state
4. creating the legacy branch/tag/deployment plan
5. generating the audit documents
6. implementing the V2 architecture
7. building in priority order
8. testing continuously
9. stopping only for a genuine external blocker such as missing deployment credentials or a legal fact that cannot be inferred safely

Do not ask for approval for routine engineering/design decisions already covered by this directive.

Do not overwrite or remove the parked legacy website.

---

# FINAL ASSET PACKAGE ADDENDUM — 2026-09-08

This section supersedes any earlier generic image-path instructions in this directive.

## Package authority

The extracted `NUA_WEBSITE_V2_COMPLETE_ASSET_PACK_2026-09-08/` directory is the implementation authority for Website V2 assets.

Read these files before touching UI:

1. `11_IMPLEMENTATION_DOCS/IMAGE_MANIFEST.md`
2. `11_IMPLEMENTATION_DOCS/WEBSITE_PAGE_ASSET_MAP.md`
3. `11_IMPLEMENTATION_DOCS/VISUAL_GENERATION_GUIDE.md`
4. `00_MASTER/NUA_POS_FEATURES_AND_COMPARISON-1.md`

## Brand authority

`01_BRAND/nua-icon-authoritative-1024.png` is the supplied authoritative NUA icon in this package.

Generated images frequently contain AI-drawn `NUA`/`nua` wordmarks. They are not brand assets.

Implementation rule:
- use generated images for scene/composition/background
- remove, cover or crop generated logos where practical
- place the authentic NUA brand asset as a controlled overlay
- use real NUA product screenshots/components for final UI whenever available
- render important copy, numbers, buttons and calls-to-action in live HTML/CSS

Do not extract an invented wordmark from a generated image.

## Approved vs reference

Normal implementation may select only from:
- `02_HOSPITALITY/`
- `03_RETAIL/`
- `04_PROFESSIONAL_SERVICES/`
- `05_ASH_INTELLIGENCE/`
- `06_FINANCE_COMPLIANCE/`
- `07_ENTERPRISE_MULTI_LOCATION/`
- `08_RELIABILITY_OFFLINE_HARDWARE/`
- `09_HOMEPAGE_HERO/`

Do not use `10_REFERENCE_ONLY/` without explicit reason and documentation.

## Ash representation

Ash is not to be marketed as a generic chatbot or decorative AI robot.

The final website must demonstrate:
**Detect → Recommend → Risk Level → Owner Approval → Execute → Audit Trail → Rollback**

Use real application components and the code-verified feature inventory to ensure these claims are accurate.

## Legacy website / switching requirement remains mandatory

Before V2 production cutover:
- preserve current production in the legacy branch/tag
- maintain a dedicated legacy deployment
- maintain V2 as a parallel deployment
- implement `site:status`, `site:switch:v2`, `site:switch:legacy`, `site:rollback`, and portable-domain tooling
- do not switch `nuapos.com.au` until explicitly instructed by the operator

Preferred channel layout:
- `legacy.nuapos.com.au` → parked current site
- `next.nuapos.com.au` → V2
- `nuapos.com.au` → selected active release

## First implementation command

After extracting this package into the repository root, begin with:

```bash
claude --dangerously-skip-permissions "Read ./NUA_WEBSITE_V2_COMPLETE_ASSET_PACK_2026-09-08/00_MASTER/NUA_WEBSITE_V2_MASTER_CLAUDE_CODE_FINAL_2026-09-08.md completely. Then read IMAGE_MANIFEST.md, WEBSITE_PAGE_ASSET_MAP.md, VISUAL_GENERATION_GUIDE.md and NUA_POS_FEATURES_AND_COMPARISON-1.md. Preserve the existing production website as the legacy release before changing V2. Implement the complete Website V2 autonomously in priority order, using only approved production asset folders unless explicitly justified. Do not switch nuapos.com.au to V2 until instructed."
```
