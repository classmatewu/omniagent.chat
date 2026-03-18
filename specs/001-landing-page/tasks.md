# Tasks: Landing Page

**Input**: Design documents from `/specs/001-landing-page/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Initialize Next.js project with TypeScript, Tailwind CSS, GSAP, and core configuration

- [x] T001 Initialize Next.js 14+ project with TypeScript strict mode, App Router, and static export (`output: 'export'`) in `next.config.js`
- [x] T002 Install dependencies: `tailwindcss`, `postcss`, `autoprefixer`, `gsap` (with ScrollTrigger), `eslint`, `prettier`, `eslint-config-next`
- [x] T003 [P] Configure Tailwind CSS with `darkMode: 'media'` and extend theme with semantic color tokens referencing CSS custom properties in `tailwind.config.ts`
- [x] T004 [P] Configure ESLint + Prettier with pre-commit enforcement and add `pnpm lint`, `pnpm build`, `pnpm dev`, `pnpm preview` scripts in `package.json`
- [x] T005 [P] Create shared TypeScript interfaces (Section, Statistic, NavItem, ContactInfo, ThemeTokens) in `src/types/index.ts` per data-model.md

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Design tokens, global styles, layout shell, and animation infrastructure that ALL user stories depend on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T006 Define CSS custom properties for light and dark theme design tokens (surface, surfaceAlt, text, textMuted, accent, border colors) with `prefers-color-scheme` media query in `src/app/globals.css`. Include Tailwind `@tailwind base/components/utilities` imports, `@layer base` token definitions, and base typography styles using a clean sans-serif font (Inter or similar via `next/font/google`)
- [x] T007 Create root layout in `src/app/layout.tsx` with: font loading via `next/font/google` (Inter, `font-display: swap`, preloaded), SEO metadata (title: "omniagent.chat — AI Agents Are Inevitable", description, Open Graph tags, canonical URL), globals.css import, semantic `<html>` and `<body>` structure
- [x] T008 Create hardcoded content constants in `src/lib/constants.ts`: NAV_ITEMS array (4 items: Hero, Growth, Domain, Contact with anchor hrefs), STATISTICS array (minimum 3 items with label/value/prefix/suffix/context about AI/Agent growth and OpenClaw/Skills), DOMAIN_DATA object (domainName: "ai.com", salePrice, salePriceNumeric, context), CONTACT_INFO object (email, displayLabel), HERO_CONTENT object (headline, subheadline)
- [x] T009 Create `useScrollAnimation` custom hook in `src/hooks/useScrollAnimation.ts`: accepts a container ref, registers GSAP + ScrollTrigger in `useEffect` only, uses `gsap.context()` scoped to ref for cleanup, checks `prefers-reduced-motion` and skips all animations if set, configures `ScrollTrigger.config({ limitCallbacks: true, ignoreMobileResize: true })`, returns cleanup via `ctx.revert()`. Mark file with `'use client'`
- [x] T010 [P] Create `AnimatedCounter` component in `src/components/ui/AnimatedCounter.tsx`: `'use client'` component that animates a number from 0 to target value using GSAP with ScrollTrigger. Props: `value: number`, `prefix?: string`, `suffix?: string`, `duration?: number`. Renders formatted number with prefix/suffix. Respects `prefers-reduced-motion` (shows final value immediately). Uses `gsap.to()` on a ref with `snap` for integer display

**Checkpoint**: Foundation ready — design tokens, layout, content data, animation infrastructure all in place

---

## Phase 3: User Story 1 — Discover the AI Agent Growth Narrative (Priority: P1) 🎯 MVP

**Goal**: Deliver the hero section and growth narrative section with scroll-triggered animations showcasing AI/Agent exponential growth and OpenClaw/Skills ecosystem statistics

**Independent Test**: Load the page, verify hero section is visible above the fold with headline and fade-in animation. Scroll down to verify growth narrative section appears with at least 3 statistics using counter animations. Test on mobile (320px) and desktop (1024px+). Verify animations are smooth at 60fps. Verify content is visible with JS disabled.

### Implementation for User Story 1

- [x] T011 [P] [US1] Create Header component in `src/components/Header.tsx`: `'use client'` component with `HeaderProps` (brandName, navItems). Desktop (≥768px): horizontal nav with anchor links styled per OpenAI aesthetic (clean, minimal). Mobile (<768px): hamburger `<button>` with `aria-expanded`, `aria-controls="nav-menu"`, `aria-label="Menu"`. Toggles full-screen overlay `<nav id="nav-menu">` with anchor links. Overlay closes on: link click, Escape key, backdrop click. Focus trap when open (Tab cycles within overlay). Return focus to toggle button on close. Use `hidden` attribute when closed. Animate overlay open/close with GSAP (fade + slide). Sticky header with subtle background blur on scroll. Responsive: hamburger hidden on desktop, nav links hidden on mobile
- [x] T012 [P] [US1] Create HeroSection component in `src/components/HeroSection.tsx`: `'use client'` component with `HeroSectionProps` (headline, subheadline). Full-viewport-height section with `id="hero"`. Bold headline about AI/Agent exponential growth centered above the fold. Subheadline tagline below. Entrance animation: fade-in + subtle upward slide on page load using GSAP `gsap.from()` in `useEffect`. OpenAI-inspired styling: generous whitespace, large clean typography, monochromatic palette. Responsive: text sizes scale down on mobile. Set initial CSS states (`opacity: 0; transform: translateY(20px)`) to prevent CLS. Respect `prefers-reduced-motion`
- [x] T013 [P] [US1] Create GrowthSection component in `src/components/GrowthSection.tsx`: `'use client'` component with `GrowthSectionProps` (heading, description, statistics). Section with `id="growth"`. Heading and description paragraph. Grid/flex layout of Statistic cards (minimum 3). Each statistic uses `AnimatedCounter` for the numeric value with label and context. Scroll-triggered animations: use `ScrollTrigger.batch()` for staggered fade-up reveal of statistic cards as section enters viewport. Animate only `transform` and `opacity` (compositor-only). Use `scrub: 0.5` or triggered playback. Responsive: cards stack vertically on mobile, grid on desktop. Generous spacing matching OpenAI aesthetic. Set initial CSS states for animated elements
- [x] T014 [US1] Assemble page in `src/app/page.tsx`: Import Header, HeroSection, GrowthSection (and placeholder sections for US2/US3). Pass constants from `src/lib/constants.ts` as props. Use semantic HTML: `<main>` wrapping sections, `<header>` for Header. Ensure correct section order: Header → Hero → Growth → (Domain placeholder) → (Contact placeholder) → Footer. Content renders as static HTML without JavaScript (progressive enhancement)
- [x] T015 [US1] Create Footer component in `src/components/Footer.tsx`: Minimal footer with `<footer>` semantic element. Copyright text and brand name. Consistent styling with page theme. Responsive layout

**Checkpoint**: Hero section visible above the fold with entrance animation. Growth narrative with 3+ statistics and scroll-triggered counter animations. Mobile responsive. Content visible without JS. Header with working navigation and mobile hamburger menu.

---

## Phase 4: User Story 2 — Learn About the ai.com Domain Transaction (Priority: P2)

**Goal**: Deliver the ai.com domain value showcase section with a standout dollar-amount animation that creates a memorable visual moment

**Independent Test**: Scroll to the domain section and verify: ai.com domain name displayed, sale price shown with counter roll-up or spotlight animation, contextual information about the transaction significance. Animation triggers on viewport entry and is the most eye-catching on the page. Works on mobile and desktop.

### Implementation for User Story 2

- [x] T016 [US2] Create DomainSection component in `src/components/DomainSection.tsx`: `'use client'` component with `DomainSectionProps` (domainName, salePrice, salePriceNumeric, context). Section with `id="domain"`. Prominent display of "ai.com" domain name. Dollar amount using `AnimatedCounter` with large, bold typography — this is the single most eye-catching animation on the page. Use GSAP ScrollTrigger for viewport-entry trigger. Consider spotlight/glow effect on the dollar figure using GSAP-animated `opacity` and `scale` (compositor-only properties). Context paragraph explaining transaction significance and record-breaking status. OpenAI-inspired premium layout: centered, generous whitespace, dramatic typography sizing. Responsive: text scales appropriately, maintains visual impact on mobile. Set initial CSS states. Respect `prefers-reduced-motion`
- [x] T017 [US2] Integrate DomainSection into `src/app/page.tsx`: Replace domain placeholder with DomainSection component. Pass DOMAIN_DATA constants as props. Ensure section order is maintained: Hero → Growth → Domain → Contact

**Checkpoint**: Domain section fully functional with standout dollar-amount animation. Independently testable by scrolling to section.

---

## Phase 5: User Story 3 — Contact the Site Owner (Priority: P3)

**Goal**: Deliver a clean, minimal contact section with email mailto: link for visitors to reach the site owner

**Independent Test**: Scroll to contact section and verify: "Get in Touch" heading visible, email address displayed as clickable link, clicking opens default mail client with pre-filled address. Layout is clean and consistent with page design on all devices.

### Implementation for User Story 3

- [x] T018 [US3] Create ContactSection component in `src/components/ContactSection.tsx`: Section with `id="contact"`. "Get in Touch" heading. Email displayed as a styled `<a href="mailto:...">` link. Subtle fade-up entrance animation via GSAP ScrollTrigger on viewport entry. OpenAI-inspired minimal aesthetic: centered content, generous whitespace, clean typography. Responsive layout. Respect `prefers-reduced-motion`. Props: `ContactSectionProps` (heading, email, displayLabel)
- [x] T019 [US3] Integrate ContactSection into `src/app/page.tsx`: Replace contact placeholder with ContactSection component. Pass CONTACT_INFO constants as props. Final section order: Header → Hero → Growth → Domain → Contact → Footer

**Checkpoint**: Contact section fully functional. Email link opens mail client. All three user stories independently testable.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Performance optimization, accessibility hardening, responsive fine-tuning across all stories

- [x] T020 [P] Verify and refine responsive design across all breakpoints (320px, 768px, 1024px, 2560px+) in all section components. Ensure: no horizontal scrolling, content centered with max-width constraint on wide screens, hamburger menu works correctly at mobile breakpoint, all text readable, all animations smooth. Test both light and dark themes at each breakpoint
- [x] T021 [P] Accessibility audit and fixes: verify semantic HTML5 structure (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`), keyboard Tab navigation follows visual order (hero → growth → domain → contact), all images have `alt` text (decorative: `alt="" aria-hidden="true"`), color contrast meets WCAG 2.1 AA (4.5:1 body, 3:1 large text) in both light and dark themes, hamburger menu ARIA attributes correct, focus indicators visible on all interactive elements
- [x] T022 [P] Performance optimization: verify GSAP is loaded asynchronously (not blocking initial render), fonts preloaded with `font-display: swap`, initial animation CSS states set to prevent CLS, no layout-triggering properties animated (only transform/opacity), total transfer under 500KB. Run `pnpm build` and verify static export in `/out` directory produces valid HTML with all content present
- [x] T023 Validate `prefers-reduced-motion` support: with reduced motion enabled, verify ALL animations are disabled across hero entrance, growth counters, growth card reveals, domain spotlight/counter, contact fade-up, and hamburger menu overlay. Content must appear in final state immediately. Validate `prefers-color-scheme` support: verify light and dark themes apply correctly with proper contrast ratios and no visual artifacts
- [x] T024 Final integration validation: load page end-to-end, verify smooth scroll through all sections, all animations trigger correctly on viewport entry, navigation anchor links scroll to correct sections, hamburger menu works on mobile, email link opens mail client. Run `pnpm lint` and `pnpm build` with zero errors

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion — BLOCKS all user stories
- **User Stories (Phase 3–5)**: All depend on Foundational phase completion
  - US1 (Phase 3): Can start after Phase 2 — no dependencies on other stories
  - US2 (Phase 4): Can start after Phase 2 — independent of US1 (uses same AnimatedCounter and constants)
  - US3 (Phase 5): Can start after Phase 2 — independent of US1 and US2
- **Polish (Phase 6)**: Depends on all user stories being complete

### Within Each User Story

- Components (marked [P]) within a story can be built in parallel (different files)
- Page assembly task depends on all component tasks in that story
- Each story is independently testable at its checkpoint

### Parallel Opportunities

- T003, T004, T005 can all run in parallel (Phase 1)
- T010 can run in parallel with T006–T009 (Phase 2)
- T011, T012, T013 can all run in parallel (Phase 3 — different component files)
- US1, US2, US3 can run in parallel after Phase 2 (if team capacity allows)
- T020, T021, T022 can all run in parallel (Phase 6)

---

## Parallel Example: User Story 1

```bash
# Launch all US1 components in parallel (different files, no dependencies):
Task: "Create Header component in src/components/Header.tsx"        # T011
Task: "Create HeroSection component in src/components/HeroSection.tsx"  # T012
Task: "Create GrowthSection component in src/components/GrowthSection.tsx"  # T013

# Then assemble (depends on T011-T013):
Task: "Assemble page in src/app/page.tsx"  # T014
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001–T005)
2. Complete Phase 2: Foundational (T006–T010)
3. Complete Phase 3: User Story 1 (T011–T015)
4. **STOP and VALIDATE**: Load page, verify hero + growth narrative, test mobile + desktop
5. Deploy/demo if ready — site has core value proposition

### Incremental Delivery

1. Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy (MVP! Core narrative live)
3. Add User Story 2 → Test independently → Deploy (ai.com showcase added)
4. Add User Story 3 → Test independently → Deploy (Contact section added)
5. Polish phase → Performance + a11y hardened → Final deploy

### Single Developer Strategy (Recommended)

1. Phase 1 → Phase 2 sequentially (foundation)
2. Phase 3 (US1): Build T011, T012, T013 in parallel, then T014, T015
3. Phase 4 (US2): T016, T017 sequentially
4. Phase 5 (US3): T018, T019 sequentially
5. Phase 6: T020–T024 (polish)

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- All content is hardcoded — no backend setup or API tasks needed
- GSAP must only be initialized in `useEffect` within `'use client'` components
- All animations must use only `transform` and `opacity` for 60fps mobile performance
- CSS initial states must be set for all animated elements to prevent CLS
- Every component must work in both light and dark themes
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
