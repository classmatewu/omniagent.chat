# Quickstart: Landing Page

**Branch**: `001-landing-page`

## Prerequisites

- Node.js 18+
- pnpm (preferred) or npm

## Setup

```bash
# Clone and switch to feature branch
git clone <repo-url> omniagent.chat
cd omniagent.chat
git checkout 001-landing-page

# Install dependencies
pnpm install

# Start dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the landing page.

## Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Framework | Next.js 14+ (App Router, static export) | SSG, routing, font optimization |
| Language | TypeScript 5.x (strict) | Type safety |
| Styling | Tailwind CSS 3.x (`darkMode: 'media'`) | Utility-first CSS, auto dark mode |
| Animation | GSAP 3.x + ScrollTrigger | Scroll-triggered animations, counter effects |
| Linting | ESLint + Prettier | Code quality |

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout (fonts, metadata, global styles)
│   ├── page.tsx            # Landing page (assembles sections)
│   └── globals.css         # Design tokens, Tailwind imports, base styles
├── components/
│   ├── ui/                 # Shared UI components
│   │   └── AnimatedCounter.tsx
│   ├── Header.tsx          # Nav header + mobile hamburger menu
│   ├── HeroSection.tsx     # Hero section with entrance animation
│   ├── GrowthSection.tsx   # AI/Agent growth narrative + statistics
│   ├── DomainSection.tsx   # ai.com domain value showcase
│   ├── ContactSection.tsx  # Email contact section
│   └── Footer.tsx          # Page footer
├── hooks/
│   └── useScrollAnimation.ts  # GSAP ScrollTrigger hook
├── lib/
│   └── constants.ts        # Hardcoded content data (statistics, copy)
└── types/
    └── index.ts            # Shared TypeScript interfaces

next.config.js              # output: 'export', static export config
tailwind.config.ts          # Theme extension, dark mode: 'media'
```

## Key Commands

```bash
pnpm dev          # Development server with HMR
pnpm build        # Static export to /out
pnpm lint         # ESLint + type check
pnpm preview      # Preview production build locally
```

## Build Output

Static export generates `/out` directory — deploy to any static hosting (Vercel, Netlify, Cloudflare Pages, etc.).

## Performance Budget

| Metric | Target |
|--------|--------|
| LCP (mobile 4G) | < 2.5s |
| CLS | < 0.1 |
| INP | < 200ms |
| Lighthouse Mobile | 90+ |
| Total transfer | < 500KB |
| JS bundle (gzip) | < 150KB |
