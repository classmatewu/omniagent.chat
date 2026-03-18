# UI Contracts: Landing Page

**Date**: 2026-03-18 | **Branch**: `001-landing-page`

> This project is a static landing page with no backend API. The "contracts" describe the component interfaces and the implicit contract between the page and the visitor's browser.

## Component Prop Interfaces

### Header

```typescript
interface HeaderProps {
  brandName: string;       // "omniagent.chat"
  navItems: NavItem[];     // Anchor links to page sections
}
```

**Behavior Contract**:
- Desktop (≥768px): Horizontal nav links visible inline.
- Mobile (<768px): Hamburger icon → full-screen overlay with nav links.
- Overlay closes on: link click, Escape key, overlay backdrop click.
- Focus trap active when overlay is open.

### HeroSection

```typescript
interface HeroSectionProps {
  headline: string;        // Primary message about AI/Agent growth
  subheadline?: string;    // Supporting tagline
}
```

**Animation Contract**: Fade-in on page load. Respects `prefers-reduced-motion` (no animation if set).

### GrowthSection

```typescript
interface GrowthSectionProps {
  heading: string;
  description: string;
  statistics: Statistic[]; // Minimum 3 items
}
```

**Animation Contract**: Each statistic animates with a counter roll-up when scrolled into viewport. Staggered reveal via `ScrollTrigger.batch()`.

### DomainSection

```typescript
interface DomainSectionProps {
  domainName: string;      // "ai.com"
  salePrice: string;       // Display string (e.g., "$30,000,000")
  salePriceNumeric: number; // For counter animation (e.g., 30000000)
  context: string;         // Significance description
}
```

**Animation Contract**: Dollar amount counter roll-up or spotlight reveal on viewport entry. Single most eye-catching animation on the page.

### ContactSection

```typescript
interface ContactSectionProps {
  heading: string;         // "Get in Touch"
  email: string;           // mailto address
  displayLabel: string;    // Display text for the email link
}
```

**Behavior Contract**: Email link opens default mail client via `mailto:`.

## Browser Contract

| Feature | Requirement |
|---------|-------------|
| JavaScript disabled | All text content visible, static layout, no animations |
| `prefers-reduced-motion: reduce` | All animations disabled, content in final state |
| `prefers-color-scheme: dark` | Dark theme applied via CSS custom properties |
| `prefers-color-scheme: light` | Light theme applied (default) |
| Viewport 320px–2560px | Fully responsive, no horizontal scroll |
| Keyboard navigation | All sections reachable via Tab, correct focus order |

## SEO / Metadata Contract

```typescript
interface PageMetadata {
  title: string;           // "omniagent.chat — AI Agents Are Inevitable"
  description: string;     // Meta description for search engines
  ogImage?: string;        // Open Graph image URL
  canonical: string;       // "https://omniagent.chat"
}
```
