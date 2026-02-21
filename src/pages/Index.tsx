import Navbar from "@/components/Navbar";
import SectionTransition from "@/components/SectionTransition";
import { useSectionTransition } from "@/hooks/useSectionTransition";

import HeroFullSection from "@/components/sections/HeroFullSection";
import AboutFullSection from "@/components/sections/AboutFullSection";
import BusinessStructureFullSection from "@/components/sections/BusinessStructureFullSection";
import OperatingFocusFullSection from "@/components/sections/OperatingFocusFullSection";
import VenturesFullSection from "@/components/sections/VenturesFullSection";
import ContactFormFullSection from "@/components/sections/ContactFormFullSection";

const sectionMap: Record<string, number> = {
  home: 0,
  about: 1,
  structure: 2,
  focus: 3,
  ventures: 4,
  contact: 5,
};

const SECTION_COUNT = 6;

const Index = () => {
  const { activeSection, direction, navigateTo } = useSectionTransition({
    sectionCount: SECTION_COUNT,
    transitionDuration: 800,
  });

  const goContact = () => navigateTo(sectionMap.contact);

  return (
    <div className="h-screen overflow-hidden bg-background">
      <Navbar activeSection={activeSection} sectionMap={sectionMap} onNavigate={navigateTo} />
      <SectionTransition activeSection={activeSection} direction={direction}>
        <HeroFullSection onNavigate={navigateTo} sectionMap={sectionMap} />
        <AboutFullSection />
        <BusinessStructureFullSection />
        <OperatingFocusFullSection />
        <VenturesFullSection onContact={goContact} />
        <ContactFormFullSection />
      </SectionTransition>
    </div>
  );
};

export default Index;
