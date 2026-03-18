# Implementation Plan: Landing Page

**Branch**: `001-landing-page` | **Date**: 2026-03-18 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-landing-page/spec.md`

## Summary

Build a single-page static landing page for omniagent.chat with three main sections: (1) AI/Agent exponential growth narrative with OpenClaw & Skills ecosystem statistics, (2) ai.com domain transaction value showcase, and (3) email contact section. The page uses an OpenAI-inspired design with GSAP + ScrollTrigger for premium scroll-driven animations, Tailwind CSS for responsive styling with automatic light/dark mode, and Next.js static export for optimal performance. All content is hardcoded — no backend required.

## Technical Context

**Language/Version**: TypeScript 5.x (strict mode enabled)
**Primary Dependencies**: Next.js 14+ (App Router, static export), Tailwind CSS 3.x, GSAP 3.x + ScrollTrigger
**Storage**: N/A — pure static site, all content hardcoded at build time
**Testing**: ESLint + Prettier (lint), `tsc --noEmit` (type check), Lighthouse CI (performance/a11y audit)
**Target Platform**: Web — latest 2 versions of Chrome, Firefox, Safari, Edge. Mobile (320px+) and desktop (up to 2560px+).
**Project Type**: Static website (SSG)
**Performance Goals**: LCP < 2.5s on mobile 4G, CLS < 0.1, INP < 200ms, Lighthouse Mobile 90+, scroll animations at 60fps
**Constraints**: Total transfer < 500KB initial load, JS bundle < 150KB gzipped, no runtime API calls, must render core content without JavaScript
**Scale/Scope**: Single page, 4 sections, ~6 components, ~15 files total

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Component-First | ✅ PASS | Each section is an isolated React component with typed props. Shared UI in `components/ui/`. |
| II. Performance-First | ✅ PASS | LCP < 2.5s, CLS < 0.1, INP < 200ms targets set. GSAP async-loaded. Fonts preloaded with swap. Images pre-optimized. |
| III. Accessibility (a11y) | ✅ PASS | Semantic HTML5, keyboard nav, ARIA hamburger menu, focus trap, `prefers-reduced-motion` respected, WCAG 2.1 AA contrast. |
| IV. Type Safety | ✅ PASS | TypeScript strict mode. All component props typed. Shared types in `types/`. |
| V. Visual Consistency | ✅ PASS | CSS custom properties for design tokens. Mobile-first responsive. `prefers-color-scheme` auto dark mode. `prefers-reduced-motion` respected. |
| VI. Simplicity | ✅ PASS | No state management library. No CMS. No backend. ~15 files total. GSAP is the only non-trivial dependency (justified by animation quality requirement). |
| Tech Constraints | ✅ PASS | TypeScript, React 18+ (Next.js), Tailwind CSS, pnpm, ESLint + Prettier, static export. All aligned. |
| Dev Workflow | ✅ PASS | PR-based flow, conventional commits, lint/type-check/build gates. |

**Post-Phase 1 Re-check**: All gates still pass. GSAP (~34KB gzip) is the only added dependency — justified by FR-005/FR-012 animation requirements and documented in research.md.

## Project Structure

### Documentation (this feature)

```text
specs/001-landing-page/
├── plan.md              # This file
├── research.md          # Phase 0: technology research & decisions
├── data-model.md        # Phase 1: TypeScript interfaces & data shape
├── quickstart.md        # Phase 1: setup & dev guide
├── contracts/
│   └── ui-contracts.md  # Phase 1: component props & browser contracts
└── tasks.md             # Phase 2 output (created by /speckit.tasks)
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── layout.tsx              # Root layout: fonts, metadata, global styles
│   ├── page.tsx                # Landing page: assembles all sections
│   └── globals.css             # Tailwind imports, CSS custom properties, design tokens
├── components/
│   ├── ui/
│   │   └── AnimatedCounter.tsx # Reusable number counter animation component
│   ├── Header.tsx              # Nav header + mobile hamburger menu overlay
│   ├── HeroSection.tsx         # Hero with entrance animation
│   ├── GrowthSection.tsx       # AI/Agent growth narrative + statistics
│   ├── DomainSection.tsx       # ai.com domain value showcase
│   ├── ContactSection.tsx      # Email contact section
│   └── Footer.tsx              # Page footer
├── hooks/
│   └── useScrollAnimation.ts   # GSAP ScrollTrigger hook (cleanup, reduced-motion)
├── lib/
│   └── constants.ts            # Hardcoded content: statistics, copy, contact info
└── types/
    └── index.ts                # Shared TypeScript interfaces (Section, Statistic, etc.)

public/
├── fonts/                      # Self-hosted font files (if not using next/font CDN)
└── images/                     # Pre-optimized WebP/AVIF assets

next.config.js                  # output: 'export', static export config
tailwind.config.ts              # Theme extension, darkMode: 'media', breakpoints
tsconfig.json                   # Strict mode TypeScript config
package.json                    # Dependencies & scripts
```

**Structure Decision**: Single-project structure (no backend, no separate frontend directory). This is a pure static site with Next.js App Router — all source lives under `src/` with the standard Next.js App Router conventions. Components are flat (not nested) since there are only ~6 page-level components, keeping file count under the constitution's 7-file-per-feature guideline.

## Complexity Tracking

> No constitution violations detected. All principles pass without exceptions.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| GSAP dependency (~34KB gzip) | FR-005, FR-012 require premium scroll-triggered animations and counter roll-up effects | CSS-only animations cannot achieve counter roll-up, scrubbed scroll effects, or staggered batch reveals with the same quality |
