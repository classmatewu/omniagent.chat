import type { NavItem, Statistic, DomainData, ContactInfo, HeroContent } from '@/types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'Growth', href: '#growth' },
  { label: 'Domain', href: '#domain' },
  { label: 'Contact', href: '#contact' },
];

export const HERO_CONTENT: HeroContent = {
  headline: 'AI Agents Are Growing Exponentially. And Irreversibly.',
  subheadline:
    'The OpenClaw & Skills ecosystem is at the center of the most transformative shift in computing history.',
};

export const STATISTICS: Statistic[] = [
  {
    label: 'AI Agent Market Size by 2028',
    value: 285,
    prefix: '$',
    suffix: 'B',
    context: 'Projected to grow at a compound annual growth rate of over 45%',
  },
  {
    label: 'OpenClaw Skills Published',
    value: 12000,
    suffix: '+',
    context: 'Community-driven skills growing 300% year over year',
  },
  {
    label: 'Enterprise Adoption Rate',
    value: 80,
    suffix: '%',
    context: 'Of Fortune 500 companies now deploying AI agents in production',
  },
  {
    label: 'Developer Community',
    value: 150000,
    suffix: '+',
    context: 'Active developers building on the OpenClaw platform',
  },
];

export const DOMAIN_DATA: DomainData = {
  domainName: 'ai.com',
  salePrice: '$70,000,000',
  salePriceNumeric: 70000000,
  context:
    'The highest publicly disclosed domain transaction in history — a testament to the extraordinary value the market places on artificial intelligence. This single sale reflects the seismic shift AI represents across every industry.',
};

export const CONTACT_INFO: ContactInfo = {
  email: 'omniagent.chat@gmail.com',
  displayLabel: 'omniagent.chat@gmail.com',
};

export const BRAND_NAME = 'omniagent.chat';
