# NUA — AI Restaurant Operating System (Landing Page)

## Original Problem Statement
Build a high-end SaaS marketing landing page for **NUA**, an AI-powered Restaurant Operating System that replaces traditional POS, reservations, loyalty, inventory, staff and marketing tools. Core message: "Run your entire hospitality business with AI."

## User Choices
- Scope: **Landing page only** (no backend forms, no DB persistence)
- Sections: **All 14** sections from the brief
- Visual reference: **Nomni.ai** style (clean SaaS, dark/light alternation, dashboard mockups, premium typography)
- Typography: chosen by agent — **Bricolage Grotesque (headings) + Manrope (body) + JetBrains Mono (data)**

## Architecture
- **Frontend only** — React 19 + CRA + Tailwind + Framer Motion + Shadcn UI + Lucide icons
- Single-page composition: `pages/Landing.jsx` imports 16 section components from `components/sections/`
- No backend changes; no database; no auth; no API calls
- Brand tokens defined in `tailwind.config.js` (`nua.orange`, `nua.purple`, `nua.pink`, `nua.bg`, `nua.surface`, `nua.card`)

## What's Been Implemented (2025-12)
### Iteration 1 — Landing
- Sticky navbar with scroll-blur + mobile drawer
- Hero with CSS-built mock command-center dashboard, animated stat pills, voice waveform, reservations grid, Ash AI card
- 10-module bento grid with hover glows
- "Meet Ash" decision feed (light theme) with 5 entries × statuses (Executed/Approved/Suggested)
- Voice-first section with animated waveform + rotating phrase chips (auto-cycle every ~3.6s)
- Reservations floor plan with 13 tables, status legend, AI recommendation footer
- Loyalty premium card with tier ladder + floating perk chip (pink accent)
- Inventory: 4 AI recommendation cards (Buy now / Wait 3 days / Price increasing / Waste alert)
- Staff: weekly roster table with AI-highlighted shifts + Approve/Dismiss CTA
- Multi-location dotted-globe map with 12 pulse points
- Analytics: 4 KPI cards + SVG revenue stream + menu-engineering scatter matrix
- Integrations: full-width marquee + 4 category stats + "18+ integrations" badge
- Why NUA vs Traditional POS comparison table (9 capabilities)
- 3-tier pricing (Starter / Growth elevated / Enterprise) with full feature lists
- Final CTA with ambient orange+purple glow and dual buttons
- Footer with brand + 4 column groups + 3 social icons

### Iteration 2 — Lead capture + video modal
- Backend: `POST /api/leads`, `GET /api/leads` (FastAPI + MongoDB collection `leads`) with Pydantic + EmailStr validation
- Global `ModalProvider` context — any button can call `openLead({type, plan})` or `openVideo()`
- `LeadDialog` component (Shadcn Dialog) — full form (name, email, business, phone, venue chips, notes) with loading + success states + sonner toasts; submits to `/api/leads`
- Wired every CTA: hero Book Demo, hero Watch Tour, navbar Demo/Trial, pricing tier CTAs (passes plan name), final CTA buttons
- `VideoDialog` — Shadcn Dialog with YouTube iframe embed; iframe mounted only while open; VisuallyHidden a11y title; X + Done close
- Bug fixes from testing agent: 422 detail array normalisation; success-state reset on close (Done now calls handleOpenChange); a11y title on video; logger init order; venue field width

### Iteration 2 — Documentation
- `/app/README.md` — 5-year-old friendly guide covering: file map, how to edit text/colors/video, how to deploy on Emergent / Vercel+Railway / Render, and how to point a GoDaddy domain at the live app (DNS A / CNAME records explained)

## Testing
- testing_agent_v3 iteration_1: **37/37 frontend checks passed**, 0 issues
- Mobile (390×844): no overflow, drawer works, all sections render
- No console errors during full-page scroll

## Backlog (P1 / P2)
- P1: Wire "Book Demo" + "Start Free Trial" to a real form (would need backend: leads collection in MongoDB + admin view)
- P1: Replace Hero "Watch Product Tour" anchor with a real video modal
- P2: Per-item `data-testid` on Ash decision-feed entries, map pulse points and integration badges
- P2: Add resources/blog/customer-stories sub-pages
- P2: SEO metadata + Open Graph image + sitemap
- P2: Cookie consent banner + analytics hook (PostHog/GA)

## Next Tasks (Pick Any)
- Add a working lead-capture form (backend: FastAPI + MongoDB + admin dashboard)
- Add a real demo-video modal (or Loom embed)
- Add a FAQ accordion + customer testimonials carousel
- Convert to multi-page (Solutions, Industries, Resources, About)
