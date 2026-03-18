# Data Model: Landing Page

**Date**: 2026-03-18 | **Branch**: `001-landing-page`

> This is a static landing page with hardcoded content. There is no database, no API, and no runtime data fetching. The "data model" describes the TypeScript types used to structure content in the source code.

## Entities

### Section

Represents a full-width content block on the page.

```typescript
interface Section {
  id: string;            // Unique anchor ID (e.g., "hero", "growth", "domain", "contact")
  heading: string;       // Section headline text
  subheading?: string;   // Optional subtitle or tagline
  body?: string;         // Descriptive paragraph content
  animationType: 'fade-in' | 'fade-up' | 'counter' | 'spotlight' | 'none';
}
```

**Identity**: `id` field — used for anchor navigation links.
**Lifecycle**: Static — no state transitions. Content is hardcoded at build time.

### Statistic

A key data point displayed in the growth narrative section.

```typescript
interface Statistic {
  label: string;         // Human-readable label (e.g., "AI Agent Market Size")
  value: number;         // Numeric value for counter animation
  prefix?: string;       // Display prefix (e.g., "$")
  suffix?: string;       // Display suffix (e.g., "B", "%", "+")
  context?: string;      // Source or explanatory note
}
```

**Identity**: Positional — ordered array, displayed in sequence.
**Validation**: `value` must be a positive number. `label` must be non-empty.

### NavItem

A navigation link in the header.

```typescript
interface NavItem {
  label: string;         // Display text (e.g., "Growth", "Domain", "Contact")
  href: string;          // Anchor href (e.g., "#growth")
}
```

**Identity**: `href` must be unique and correspond to a Section `id`.

### ContactInfo

Contact details for the contact section.

```typescript
interface ContactInfo {
  email: string;         // mailto: address
  displayLabel: string;  // Text shown to users (e.g., "hello@omniagent.chat")
}
```

**Validation**: `email` must be a valid email format.

## Relationships

```
NavItem.href → Section.id       (1:1, each nav item links to exactly one section)
Section "growth" → Statistic[]  (1:many, growth section contains multiple statistics)
Section "contact" → ContactInfo (1:1, contact section has one contact method)
```

## Design Tokens (Theme)

```typescript
interface ThemeTokens {
  colors: {
    surface: string;      // Page background
    surfaceAlt: string;   // Alternate surface (cards, overlays)
    text: string;         // Primary text
    textMuted: string;    // Secondary/subtitle text
    accent: string;       // Call-to-action, highlights
    border: string;       // Subtle borders/dividers
  };
  spacing: {
    sectionPadding: string;  // Vertical padding between sections
    contentMaxWidth: string; // Max content width (e.g., "1200px")
  };
  breakpoints: {
    mobile: string;       // 320px
    tablet: string;       // 768px
    desktop: string;      // 1024px
    wide: string;         // 2560px
  };
}
```

**Lifecycle**: Two variants (light and dark) defined as CSS custom properties. Auto-toggled via `prefers-color-scheme` media query. No runtime state management.
