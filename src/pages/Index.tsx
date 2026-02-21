import Navbar from "@/components/Navbar";
import SectionTransition from "@/components/SectionTransition";
import { useSectionTransition } from "@/hooks/useSectionTransition";

import HeroFullSection from "@/components/sections/HeroFullSection";
import ServiceFullSection from "@/components/sections/ServiceFullSection";
import InfrastructureFullSection from "@/components/sections/InfrastructureFullSection";
import PrinciplesFullSection from "@/components/sections/PrinciplesFullSection";
import ContactFullSection from "@/components/sections/ContactFullSection";

import mediaCamera from "@/assets/media-camera.jpg";
import adCampaign from "@/assets/ad-campaign.jpg";
import teamMeeting from "@/assets/team-meeting.jpg";
import fundingOffice from "@/assets/funding-office.jpg";
import tradingDesk from "@/assets/trading-desk.jpg";

const sectionMap: Record<string, number> = {
  home: 0,
  media: 1,
  advertising: 2,
  funding: 3,
  trading: 4,
  infrastructure: 5,
  principles: 6,
  contact: 7,
};

const SECTION_COUNT = 8;

const Index = () => {
  const { activeSection, direction, navigateTo } = useSectionTransition({
    sectionCount: SECTION_COUNT,
    transitionDuration: 800,
  });

  const goContact = () => navigateTo(sectionMap.contact);

  return (
    <div className="h-screen overflow-hidden bg-background">
      <Navbar />
      <SectionTransition activeSection={activeSection} direction={direction}>
        <HeroFullSection onNavigate={navigateTo} sectionMap={sectionMap} />

        <ServiceFullSection
          label="Media"
          title="Captured with intent."
          description="From concept to final cut—commercials, documentaries, and digital content produced for brands that need clarity and impact."
          cta="View production capabilities"
          image={mediaCamera}
          imageAlt="Media production"
          onContact={goContact}
        />

        <ServiceFullSection
          label="Advertising"
          title="Stories that convert."
          description="Creative direction, campaign systems, and media buying—built to move audiences and measurable outcomes."
          cta="See campaign work"
          image={adCampaign}
          imageAlt="Advertising campaigns"
          reverse
          onContact={goContact}
        />

        <ServiceFullSection
          label="Funding"
          title="Capital with counsel."
          description="We invest early and stay close—product, growth, and go-to-market support for founders building durable companies."
          cta="Meet the portfolio"
          image={teamMeeting}
          imageAlt="Creative team"
          secondaryImage={fundingOffice}
          secondaryImageAlt="Startup funding office"
          onContact={goContact}
        />

        <ServiceFullSection
          label="Trading"
          title="Decisions at speed."
          description="Quantitative research, risk controls, and execution across asset classes—built for consistency in volatile markets."
          cta="Explore our approach"
          image={tradingDesk}
          imageAlt="Trading desk"
          reverse
          onContact={goContact}
        />

        <InfrastructureFullSection onContact={goContact} />
        <PrinciplesFullSection />
        <ContactFullSection />
      </SectionTransition>
    </div>
  );
};

export default Index;
