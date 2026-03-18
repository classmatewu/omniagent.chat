<!--
  Sync Impact Report
  Version change: 0.0.0 → 1.0.0
  Added principles:
    - I. Component-First
    - II. Performance-First
    - III. Accessibility (a11y)
    - IV. Type Safety
    - V. Visual Consistency
    - VI. Simplicity
  Added sections:
    - Technology Constraints
    - Development Workflow
  Templates requiring updates: ✅ all reviewed, no updates needed at initial version
  Follow-up TODOs: none
-->

# omniagent.chat Constitution

## Core Principles

### I. Component-First

All UI MUST be built as isolated, reusable React components with clear props interfaces.

- Each component MUST be self-contained: own styles, own types, own default props.
- Components MUST follow single-responsibility — one component does one thing well.
- Shared components MUST live in a dedicated `components/ui/` directory; page-specific components MUST live alongside their page.
- Every shared component MUST export its TypeScript prop types for consumers.
- Composition over inheritance — use children, render props, or hooks to extend behavior; never deep component hierarchies.

### II. Performance-First

Core Web Vitals MUST be the primary measure of frontend quality.

- LCP (Largest Contentful Paint) MUST be under 2.5 seconds on mobile 4G.
- CLS (Cumulative Layout Shift) MUST be under 0.1.
- INP (Interaction to Next Paint) MUST be under 200ms.
- Images MUST use next-gen formats (WebP/AVIF) with explicit width/height to prevent layout shift.
- Code splitting MUST be applied at the route level; heavy third-party libraries MUST be lazy-loaded.
- Fonts MUST be preloaded and use `font-display: swap` to avoid render blocking.
- No JavaScript bundle delivered to the client SHOULD exceed 150 KB gzipped without documented justification.

### III. Accessibility (a11y)

The site MUST conform to WCAG 2.1 Level AA at minimum.

- All interactive elements MUST be keyboard-navigable with visible focus indicators.
- All images MUST have meaningful `alt` text; decorative images MUST use `alt=""` with `aria-hidden="true"`.
- Color contrast MUST meet a minimum ratio of 4.5:1 for body text, 3:1 for large text.
- Page structure MUST use semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`).
- Dynamic content changes MUST be announced to screen readers via ARIA live regions.
- Forms MUST have associated `<label>` elements; error messages MUST be programmatically linked to their inputs.

### IV. Type Safety

TypeScript strict mode MUST be enabled; `any` type is prohibited in production code.

- All component props MUST have explicit TypeScript interfaces or types.
- API response data MUST be validated against typed schemas (e.g., Zod) at the boundary.
- Shared types MUST be centralized in a `types/` directory to avoid duplication.
- Union types and discriminated unions SHOULD be preferred over optional fields when modeling variant data.

### V. Visual Consistency

A unified design token system MUST govern all visual properties.

- Colors, spacing, typography, shadows, and border radii MUST be defined as CSS custom properties or a theme object — never hardcoded magic values.
- Responsive design MUST follow a mobile-first approach with defined breakpoints (e.g., sm/md/lg/xl).
- Motion and animation MUST respect `prefers-reduced-motion` user preference.
- Dark mode support SHOULD be considered from initial implementation via CSS custom properties.

### VI. Simplicity

Start with the minimal viable implementation; extend only when there is a proven need.

- YAGNI: Do not add features, abstractions, or dependencies "just in case."
- Prefer native browser APIs and platform primitives over third-party libraries when capability is equivalent.
- File count per feature SHOULD stay below 7; exceeding this requires documented justification.
- No global state management library is needed unless multiple unrelated components share the same data — start with React Context and local state.

## Technology Constraints

- **Language**: TypeScript 5.x (strict mode enabled)
- **Framework**: React 18+ with a modern build tool (Vite or Next.js)
- **Styling**: CSS Modules, Tailwind CSS, or CSS-in-JS — MUST be consistent across the project; mixing approaches is prohibited
- **Package Manager**: pnpm or npm — MUST be consistent; lockfile MUST be committed
- **Linting**: ESLint + Prettier MUST be configured and enforced via pre-commit hooks
- **Browser Support**: Latest 2 versions of Chrome, Firefox, Safari, Edge; no IE support
- **Deployment Target**: Static site or SSR/SSG — production build MUST generate optimized assets

## Development Workflow

- All changes MUST go through pull requests; direct pushes to `main` are prohibited.
- Each PR MUST pass lint, type-check, and build before merge.
- Commit messages MUST follow Conventional Commits format (e.g., `feat:`, `fix:`, `chore:`).
- New shared components MUST include at minimum: TypeScript types, a usage example in comments or documentation, and visual review in the PR.
- Performance-impacting changes (new dependencies, large assets, layout changes) MUST include a Lighthouse score or Web Vitals measurement in the PR description.
- Dependency additions MUST be justified — bundle size impact MUST be documented.

## Governance

This constitution is the authoritative source of project standards for omniagent.chat. All code reviews and pull requests MUST verify compliance with these principles.

- Amendments require: (1) a written proposal describing the change and its rationale, (2) documented approval, and (3) a migration plan if existing code is affected.
- Version increments follow semantic versioning: MAJOR for principle removal or redefinition, MINOR for new principles or sections, PATCH for clarifications and wording improvements.
- Violations discovered in review MUST be resolved before merge unless an exception is explicitly documented in the PR with justification.

**Version**: 1.0.0 | **Ratified**: 2026-03-18 | **Last Amended**: 2026-03-18
