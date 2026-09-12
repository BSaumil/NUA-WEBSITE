# NUA POS — Colour System

Hand this file to Claude Code (or any implementer) when building **NUA POS**, the product. It carries the same colour system as `nuapos.com.au`, with the parts a point-of-sale application needs that a marketing site does not.

Every ratio below was measured with the WCAG 2.1 relative-luminance formula, not estimated. Where a value in this file differs from an obvious "brand" choice, the reason is stated.

---

## 1. The one rule that matters

**The website runs one accent. A POS does not.**

The marketing site is burgundy on ivory because a visitor is reading prose and the page should have a single voice. A POS is a dashboard: colour is *information*. It is how a floor plan says T2 is seated and T4 is reserved, and how a kitchen screen says this ticket has been waiting eleven minutes.

So the system has two layers, and mixing them up is the main way this goes wrong:

| Layer | Where | Palette |
|---|---|---|
| **Chrome** | navigation, headings, body text, primary buttons, links, settings screens | Burgundy on ivory — §3 |
| **Data** | floor plans, kitchen tickets, order states, charts, stock levels, agent activity | The icon hues — §5, §6 |

A "Save" button is chrome and is burgundy. A table tile is data and is not.

---

## 2. Brand assets

### Icon (the Pulse Grid)

Exact source. **These four fills are the brand and must not be themed, darkened, or swept by any colour refactor.** The website learned this the hard way: a codemod matched on colour value rather than role and quietly darkened all four, and nothing caught it because a darkened logo still renders and still passes contrast.

```jsx
export const BRAND_FILLS = {
  orange: "#f58c14",
  purple: "#8b5cf6",
  pink:   "#ec4899",
  ink:    "#1c1917",
};

export default function BrandIcon({ size = 32, variant = "full", className = "" }) {
  if (variant === "mono") {
    // Below ~24px the 2x2 grid loses legibility; use this instead.
    return (
      <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
        <rect x="4" y="4" width="92" height="92" rx="20" fill={BRAND_FILLS.orange} />
        <polyline
          points="22,54 34,54 40,32 51,70 59,54 78,54"
          fill="none" stroke="#ffffff" strokeWidth="7.5"
          strokeLinecap="round" strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
      <rect x="6"  y="6"  width="40" height="40" rx="10" fill={BRAND_FILLS.orange} />
      <rect x="54" y="6"  width="40" height="40" rx="10" fill={BRAND_FILLS.purple} />
      <rect x="6"  y="54" width="40" height="40" rx="10" fill={BRAND_FILLS.pink} />
      <rect x="54" y="54" width="40" height="40" rx="10" fill={BRAND_FILLS.ink} />
      <polyline
        points="60,27 65,27 68,17 72,39 75,27 88,27"
        fill="none" stroke="#ffffff" strokeWidth="4.2"
        strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}
```

### Wordmark

`NUA`, uppercase, **Bricolage Grotesque Bold**, letter-spacing `-0.02em`, in `#750D28`.

The one exception: on a near-black surface, burgundy on `#29241E` measures **1.35:1** and is unreadable. There the wordmark takes `#FAF8F3`. The icon never changes in either case.

### Lockup

Icon + wordmark, horizontal, gap `8px`, optically centred on the wordmark's cap height.

### Raster assets

Already generated and colour-correct in the website repo under `frontend/public/` — reuse rather than regenerate:

`nua-icon-512.png` · `android-chrome-512x512.png` · `android-chrome-192x192.png` · `apple-touch-icon.png` · `favicon-48x48.png` · `favicon-32x32.png` · `favicon-16x16.png` · `favicon.ico`

> `og-card.png` is **not** reusable — it still has a near-black ground from the previous dark theme.

---

## 3. Chrome tokens

Drop-in for `tailwind.config.js` under `theme.extend.colors`:

```js
nua: {
  // Grounds
  bg:        '#FAF8F3',  // app background
  bgAlt:     '#F8F4ED',  // rails, headers, inset panels
  surface:   '#FFFDF9',  // cards, sheets, modals
  white:     '#FFFFFF',

  // Brand
  burgundy:       '#750D28',
  burgundyDark:   '#5F1A23',  // hover / pressed
  burgundyBright: '#8A1433',
  burgundyWash:   '#F5ECEA',  // selected rows, active nav, chips

  // Type
  ink:       '#29241E',  // primary       14.5:1 on bg
  ink2:      '#655D53',  // secondary       6.4:1 on surface
  muted:     '#756D67',  // tertiary        5.0:1 on surface
  mutedSoft: '#8D847D',  // DECORATIVE ONLY — 3.45:1, fails AA for text

  // Lines
  border:        '#E8DED4',  // card and table separators
  borderStrong:  '#D9CFC5',  // emphasis dividers
  borderControl: '#9A928B',  // inputs, where the border is the only affordance

  // Dark surfaces, used sparingly
  dark:       '#29241E',
  darkText:   '#FAF8F3',
  darkBody:   '#D9D1C8',
  darkAccent: '#E26383',  // 4.65:1 on #29241E
}
```

### Three values that look wrong and are not

These were each corrected after measurement. Do not "fix" them back:

| Token | Obvious choice | Why it was changed |
|---|---|---|
| `muted` | `#8D847D` | 3.45:1 on ivory — fails AA for body text. Kept as `mutedSoft` for decoration only. |
| `borderControl` | `#D9CFC5` | 1.51:1. An input's border is the only thing marking the control, so it is a UI component needing 3:1. |
| `darkAccent` | `#A94A62` | 2.81:1 on `#29241E`. Lightened to clear AA. |

### shadcn/ui variables

If the POS uses shadcn, repoint these once and the primitives follow without editing any of them:

```css
:root {
  --background: 40 40% 97%;      --foreground: 33 17% 14%;
  --card: 40 60% 99%;            --card-foreground: 33 17% 14%;
  --popover: 40 60% 99%;         --popover-foreground: 33 17% 14%;
  --primary: 344 80% 26%;        --primary-foreground: 0 0% 100%;
  --secondary: 37 39% 95%;       --secondary-foreground: 33 17% 14%;
  --muted: 37 39% 95%;           --muted-foreground: 27 8% 45%;
  --accent: 8 44% 94%;           --accent-foreground: 344 80% 26%;
  --destructive: 0 84% 60%;      --destructive-foreground: 0 0% 98%;
  --border: 30 32% 87%;          --input: 27 25% 81%;
  --ring: 344 80% 26%;           --radius: 0.75rem;
}
```

> `--destructive: 0 84% 60%` (≈`#ef4444`) is fine as a *fill* with white on it, but **do not use it as text on a light ground** — it measures 3.70:1, short of the 4.5:1 AA needs. For destructive text use `#B01B1B` (6.85:1). See §4.

### Type

| Role | Family | Use |
|---|---|---|
| Display | Bricolage Grotesque | headings, totals, large numerals |
| Body | Manrope | UI text, labels, running copy |
| Mono | JetBrains Mono | order numbers, table IDs, timers, prices in columns |

Use `font-variant-numeric: tabular-nums` anywhere digits sit in a column — totals, timers, quantities. Prices that jitter while a line updates read as a bug.

---

## 4. Semantic colours

The four meanings a POS needs constantly. Each has an **ink** value for text/icons on a light surface and a **fill** value for solid chips with a label on them — they are different values because the same hue cannot do both jobs.

| Meaning | Ink on `#FFFDF9` | Fill | Text on fill | Use for |
|---|---|---|---|---|
| **Success** | `#046C4E` — 6.34:1 | `#047857` | `#FFFFFF` — 5.48:1 | paid, synced, ticket ready, in stock |
| **Warning** | `#8a4a00` — 6.75:1 | `#d97706` | `#29241E` — 4.83:1 | ageing ticket, low stock, pending sync |
| **Danger** | `#B01B1B` — 6.85:1 | `#B01B1B` | `#FFFFFF` — 6.96:1 | void, refund, declined, overdue, offline |
| **Agent** | `#6d28d9` — 6.99:1 | `#7c3aed` | `#FFFFFF` — 5.70:1 | anything NUA Agent did or proposes |

Washes for chip backgrounds, with the ink that passes on them:

```js
success:  { wash: 'rgba(16,185,129,0.12)', text: '#046C4E', dot: '#059669' }  // 5.67:1
agent:    { wash: 'rgba(139,92,246,0.12)', text: '#6d28d9', dot: '#7c3aed' }  // 6.05:1
warning:  { wash: 'rgba(245,140,20,0.14)', text: '#8a4a00', dot: '#d97706' }  // 5.99:1
danger:   { wash: 'rgba(176,27,27,0.10)',  text: '#B01B1B', dot: '#B01B1B' }  // 5.76:1
```

**Purple always means NUA Agent.** Not "info", not "primary", not a decorative accent. If a screen shows something the agent executed, approved-pending, or suggested, it is purple; if the agent had nothing to do with it, it is not.

---

## 5. Data palette

The NUA icon hues, which is what makes a NUA screen recognisably NUA rather than generically colourful. **Three tiers, because the same hue cannot do every job at every size.**

```js
/** Tier 1 — true icon hues. Marks that carry NO text: bars, dots, blocks, washes. */
export const NUA_DATA = {
  orange: '#f58c14',
  purple: '#8b5cf6',
  pink:   '#ec4899',
  ink:    '#1c1917',
};

/** Tier 2 — fills with a label, number or icon on top. `on` is the ink that passes. */
export const NUA_DATA_SOLID = {
  orange: { bg: '#f58c14', on: '#29241E', ratio: 6.33 },
  purple: { bg: '#7c3aed', on: '#FFFFFF', ratio: 5.70 },
  pink:   { bg: '#db2777', on: '#FFFFFF', ratio: 4.60 },
  ink:    { bg: '#1c1917', on: '#FFFFFF', ratio: 17.49 },
};

/** Tier 3 — 1–2px strokes: sparklines, chart lines, thin rules. */
export const NUA_DATA_LINE = {
  orange: '#b45309',
  purple: '#7c3aed',
  pink:   '#be185d',
  ink:    '#29241E',
};
```

**Why three tiers.** Brand orange `#f58c14` is **2.39:1** against an ivory card. As a filled block with a dark label that is fine and the label carries the contrast. As a 1.5px sparkline it is nearly invisible. Tier 3 exists for exactly that, and skipping it is the single easiest mistake to make here.

**Why orange keeps its exact brand hex in Tier 2.** Dark ink already clears AA on it (6.33:1), so the hue people recognise most stays untouched. Only purple and pink deepen, and only because white text has to sit on them.

---

## 6. POS state colour coding

These match what `nuapos.com.au` already depicts, so the product and the marketing screenshots agree. Keep them aligned — if you change one, change both.

### Floor plan / tables

| State | Fill | Label ink | Chip label |
|---|---|---|---|
| Open | `#FFFFFF` + `1px #D9CFC5` | `#29241E` | Open |
| Reserved | `#7c3aed` | `#FFFFFF` | Reserved |
| Seated | `#1c1917` | `#FFFFFF` | Seated |
| VIP | `#db2777` | `#FFFFFF` | VIP |
| Overdue | `#f58c14` | `#29241E` | Overdue |

### Kitchen display

| Column | Accent | Ticket age |
|---|---|---|
| New | `#7c3aed` | under 5 min — column accent |
| Preparing | `#b45309` | 5–10 min — `#b45309` |
| Ready | `#047857` | over 10 min — `#B01B1B` |

Ticket age is the one place colour changes *by itself* while nobody touches the screen, so the timer text must also be visible as a number — never signal lateness by colour alone.

### Order / payment

| State | Treatment |
|---|---|
| Open tab | chrome — `#750D28` on `#F5ECEA` |
| Paid | success fill `#047857`, white text |
| Part-paid | warning fill `#d97706`, ink text |
| Refunded / void | danger `#B01B1B`, white text, **plus a strikethrough** |
| Offline, queued | `#8a4a00` ink on `rgba(245,140,20,0.14)`, with a queue count |

### Stock

| Level | Ink |
|---|---|
| In stock | `#046C4E` |
| Low | `#8a4a00` |
| Out | `#B01B1B` |

### NUA Agent

| Tier | Wash | Text | Dot |
|---|---|---|---|
| Executed | `rgba(16,185,129,0.12)` | `#046C4E` | `#059669` |
| Approved-pending | `rgba(139,92,246,0.12)` | `#6d28d9` | `#7c3aed` |
| Suggested | `rgba(245,140,20,0.14)` | `#8a4a00` | `#d97706` |

---

## 7. Rules for a POS specifically

A POS is operated fast, by people who are not looking carefully, in rooms the designer never saw.

1. **Never colour alone.** Every state above pairs colour with a label, icon or shape. A venue will have at least one colour-blind operator, and glare and screen tilt flatten hue differences that look obvious on a desk monitor. This is also why "Overdue" says *Overdue*.
2. **Destructive actions need two signals.** Void and refund get danger colour *and* a confirm step. Colour is not a safeguard.
3. **Don't tint the whole row.** Use a 3–4px leading edge bar or a chip. A fully tinted row drags every value inside it into a contrast problem.
4. **Money is `ink`, never accent.** Totals are `#29241E` at display weight. Reserve colour for state; a burgundy total reads as an alert.
5. **Selection is `burgundyWash` + a burgundy leading edge**, not a saturated fill. Selected rows stay readable.
6. **Minimum sizes.** Hit targets 44×44px; status dots at least 8px with a 3:1 edge against their ground; never rely on a 1px line to carry state.
7. **Test at brightness.** Check the floor plan and KDS at ~40% screen brightness before shipping. Tier 1 hues at low brightness are the first thing to disappear.

---

## 8. Enforcement

Three checks are worth porting from the website repo (`frontend/scripts/`). Each exists because the failure it catches actually shipped:

| Script | Catches |
|---|---|
| `check-brand-mark.js` | the icon drifting from the artwork |
| `check-retired-palette.js` | old palette values in ink positions — SVG `stroke`/`fill`/`stopColor`, Tailwind `text-[#…]` |
| `audit-contrast.js` | rendered contrast across real routes |

**Write the audit to cover these five, or it will report clean while the app is broken** — every one of these hid a live failure on the website:

- **SVG icons** — no `textContent`, so a text-node selector never examines one (missed charcoal on burgundy at 1.35:1)
- **`background-clip: text`** — computes to `color: transparent`, so an alpha guard skips it (missed 1.13:1 on a headline)
- **Translucent grounds** — a background under 0.5 alpha must be *composited*, not skipped, or text on a wash is measured against the wrong ground and passes falsely
- **Gradients** — a `background-image`, so a `background-color`-only walk goes straight past it
- **Hover / active / dialogs** — states behind interaction are never measured at rest

And verify the verifier: plant each failure deliberately and confirm the audit catches it. An audit that has never failed has not been tested.

---

## 9. Open decisions

Two things this file deliberately does not settle:

**Dark mode.** A POS in a dim dining room at 9pm is a real case the website never had, and the site has no dark theme to copy. The `nua-dark*` tokens in §3 are for occasional dark panels, **not** a full dark UI. If NUA POS needs one, treat it as a design exercise with its own measurements — inverting these values will not work, because burgundy on near-black is 1.35:1.

**Terminal vs. back-office.** This file assumes one system for both. If the terminal needs larger type and heavier fills for speed while the back office stays denser, that is a scale and density decision layered on top of these colours — the colours themselves stay the same.

---

*Values verified against the live system at `nuapos.com.au` as of this file's writing. If a token here disagrees with the website repo, the repo is the source of truth — `frontend/tailwind.config.js` and `frontend/src/theme/mockupPalette.js`.*
