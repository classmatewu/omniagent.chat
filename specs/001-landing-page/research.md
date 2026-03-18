# Research: Landing Page

**Date**: 2026-03-18 | **Branch**: `001-landing-page`

## 1. GSAP + Next.js SSG Integration

**Decision**: Use `'use client'` components with `useEffect` + `gsap.context()` for all animations. Register ScrollTrigger inside `useEffect` only.

**Rationale**: Next.js App Router is SSR-first; GSAP requires the DOM. Static export (`output: 'export'`) pre-renders HTML then hydrates — GSAP must only run post-hydration.

**Alternatives Considered**:
- Framer Motion: Heavier bundle (~40KB), less control over scroll-driven effects.
- CSS-only + Intersection Observer: Zero bundle cost but limited animation quality (no counter roll-up, no scrub).
- `useLayoutEffect`: Preferred to avoid FOUC but falls back to `useEffect` during SSR — acceptable tradeoff.

**Key Implementation Notes**:
- Mark animation components with `'use client'` directive.
- Register plugins in `useEffect`: `gsap.registerPlugin(ScrollTrigger)`.
- Use `gsap.context()` scoped to a ref for automatic cleanup.
- Bundle: GSAP core ~24KB gzip + ScrollTrigger ~10KB gzip = ~34KB total.
- Avoid importing `gsap/all` to keep bundle lean.

## 2. Tailwind CSS Dark Mode (prefers-color-scheme)

**Decision**: Set `darkMode: 'media'` in Tailwind config. Define semantic design tokens as CSS custom properties in `@layer base`.

**Rationale**: `media` strategy uses `@media (prefers-color-scheme: dark)` automatically — zero JS, instant on first paint, no hydration flash.

**Alternatives Considered**:
- Class-based toggle (`darkMode: 'class'`): Requires JS and a toggle button — spec says auto-toggle only.
- CSS-in-JS theme provider: Unnecessary complexity for a static page.

**Key Implementation Notes**:
- Define CSS custom properties for semantic tokens in `globals.css` under `@layer base`.
- Extend Tailwind theme to reference custom properties: `colors: { surface: 'rgb(var(--color-surface) / <alpha-value>)' }`.
- This allows both Tailwind utility classes and direct CSS property references for GSAP-animated elements.

## 3. GSAP ScrollTrigger Mobile Performance

**Decision**: Animate only `transform` and `opacity` (compositor-only properties). Apply mobile-specific ScrollTrigger config.

**Rationale**: Compositor-only properties skip layout and paint, enabling 60fps on mid-range mobile devices.

**Alternatives Considered**:
- Animating `box-shadow`, `filter`, `width/height`: Triggers expensive reflows — rejected.
- Disabling all animations on mobile: Violates spec requirement for mobile animation at 60fps.

**Key Implementation Notes**:
- Use GSAP shorthand (`x`, `y`, `scale`, `rotation`, `opacity`) — maps to transforms.
- `ScrollTrigger.config({ limitCallbacks: true, ignoreMobileResize: true })` — prevents re-triggering on mobile URL bar show/hide.
- Use `ScrollTrigger.batch()` for staggered reveal of multiple elements.
- Use `scrub: 0.5` for smooth scrubbed animations.
- Set initial animation states in CSS (`opacity: 0; transform: translateY(20px)`) to prevent CLS.

## 4. Next.js Static Export + Lighthouse 90+ Mobile

**Decision**: Self-host fonts via `next/font`, pre-optimize images at build time, strict JS budget.

**Rationale**: `next/image` optimization server is unavailable in static export. Font and image strategy are the two biggest LCP levers.

**Alternatives Considered**:
- CDN-hosted Google Fonts: Extra DNS lookup, render-blocking risk — rejected.
- Client-side image lazy-loading library: Unnecessary — native `loading="lazy"` sufficient.

**Key Implementation Notes**:
- Use `next/font/google` or `next/font/local` — auto-generates `@font-face` with `font-display: swap` and preload.
- Pre-optimize images with `sharp` at build time. Serve WebP/AVIF. Use native `<img>` with `srcset`/`sizes`.
- Hero/LCP image: `loading="eager"` + `fetchpriority="high"`.
- Total JS budget: GSAP (~34KB) + Next.js runtime (~80KB) + app code (~20KB) ≈ ~134KB gzip — well under 500KB.
- Tailwind CSS purged: typically < 10KB gzip.

## 5. Accessible Hamburger Menu Pattern

**Decision**: WAI-ARIA Disclosure pattern — `<button>` with `aria-expanded`, `aria-controls`, focus trap, Escape to close, return focus on close.

**Rationale**: Most widely supported and tested pattern for mobile navigation overlays.

**Alternatives Considered**:
- Dialog/modal pattern (`role="dialog"`): Heavier ARIA semantics than needed for navigation.
- No hamburger (scrolling only): Violates FR-009 requirement for navigation header with anchor links.

**Key Implementation Notes**:
- Toggle: `<button aria-expanded="false" aria-controls="nav-menu" aria-label="Menu">`.
- On open: `aria-expanded="true"`, focus first item, activate focus trap.
- On close: `aria-expanded="false"`, return focus to toggle button.
- Escape key listener to close.
- Use `hidden` attribute (or `inert`) when menu is closed.
- Remove `hidden` before GSAP animate-in; add `hidden` after GSAP animate-out completes.
