// Section: A full-width content block on the page
export interface Section {
  id: string;
  heading: string;
  subheading?: string;
  body?: string;
  animationType: 'fade-in' | 'fade-up' | 'counter' | 'spotlight' | 'none';
}

// Statistic: A key data point in the growth narrative section
export interface Statistic {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  context?: string;
}

// NavItem: A navigation link in the header
export interface NavItem {
  label: string;
  href: string;
}

// ContactInfo: Contact details for the contact section
export interface ContactInfo {
  email: string;
  displayLabel: string;
}

// HeroContent: Content for the hero section
export interface HeroContent {
  headline: string;
  subheadline: string;
}

// DomainData: Content for the domain value section
export interface DomainData {
  domainName: string;
  salePrice: string;
  salePriceNumeric: number;
  context: string;
}

// Component Props
export interface HeaderProps {
  brandName: string;
  navItems: NavItem[];
}

export interface HeroSectionProps {
  headline: string;
  subheadline?: string;
}

export interface GrowthSectionProps {
  heading: string;
  description: string;
  statistics: Statistic[];
}

export interface DomainSectionProps {
  domainName: string;
  salePrice: string;
  salePriceNumeric: number;
  context: string;
}

export interface ContactSectionProps {
  heading: string;
  email: string;
  displayLabel: string;
}

export interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}
