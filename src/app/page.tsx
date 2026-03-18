import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import GrowthSection from '@/components/GrowthSection';
import DomainSection from '@/components/DomainSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import {
  NAV_ITEMS,
  HERO_CONTENT,
  STATISTICS,
  DOMAIN_DATA,
  CONTACT_INFO,
  BRAND_NAME,
} from '@/lib/constants';

export default function Home() {
  return (
    <>
      <Header brandName={BRAND_NAME} navItems={NAV_ITEMS} />
      <main>
        <HeroSection headline={HERO_CONTENT.headline} subheadline={HERO_CONTENT.subheadline} />
        <GrowthSection
          heading="The Numbers Speak for Themselves"
          description="The AI Agent revolution is not coming — it's already here. The data tells an unmistakable story of exponential, irreversible growth."
          statistics={STATISTICS}
        />
        <DomainSection
          domainName={DOMAIN_DATA.domainName}
          salePrice={DOMAIN_DATA.salePrice}
          salePriceNumeric={DOMAIN_DATA.salePriceNumeric}
          context={DOMAIN_DATA.context}
        />
        <ContactSection
          heading="Get in Touch"
          email={CONTACT_INFO.email}
          displayLabel={CONTACT_INFO.displayLabel}
        />
      </main>
      <Footer />
    </>
  );
}
