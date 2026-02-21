"use client";

import { ChevronDown } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
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

export default function HomePageClient() {
  const { activeSection, direction, navigateTo } = useSectionTransition({
    sectionCount: SECTION_COUNT,
    transitionDuration: 800,
  });

  const goContact = () => navigateTo(sectionMap.contact);
  const hasNextSection = activeSection < SECTION_COUNT - 1;
  const goNextSection = () => {
    if (!hasNextSection) return;
    navigateTo(activeSection + 1);
  };

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

      {hasNextSection && (
        <button
          onClick={goNextSection}
          aria-label="Go to next section"
          className="md:hidden fixed left-1/2 -translate-x-1/2 z-40 inline-flex items-center justify-center w-11 h-11 rounded-full border border-border bg-background/90 backdrop-blur text-muted-foreground hover:text-foreground transition-colors"
          style={{ bottom: "max(1rem, env(safe-area-inset-bottom))" }}
        >
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </button>
      )}
    </div>
  );
}
