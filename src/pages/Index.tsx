import { useMemo } from "react";
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

  const goContact = useMemo(() => () => navigateTo(sectionMap.contact), [navigateTo]);

  return (
    <div className="h-screen overflow-hidden bg-background">
      <Navbar activeSection={activeSection} sectionMap={sectionMap} onNavigate={navigateTo} />
      <SectionTransition activeSection={activeSection} direction={direction}>
        {/* 0 - Home */}
        <HeroFullSection onNavigate={navigateTo} sectionMap={sectionMap} />

        {/* 1 - Media */}
        <ServiceFullSection
          label="Media"
          title="Captured with intent."
          description="From concept to final cut—commercials, documentaries, and digital content produced for brands that need clarity and impact."
          cta="View production capabilities"
          image={mediaCamera}
          imageAlt="Media production"
          onContact={goContact}
        />

        {/* 2 - Advertising */}
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

        {/* 3 - Funding */}
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

        {/* 4 - Trading */}
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

        {/* 5 - Infrastructure */}
        <InfrastructureFullSection onContact={goContact} />

        {/* 6 - Principles */}
        <PrinciplesFullSection />

        {/* 7 - Contact */}
        <ContactFullSection />
      </SectionTransition>
    </div>
  );
};

export default Index;
