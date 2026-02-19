import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServiceSection from "@/components/ServiceSection";
import InfrastructureSection from "@/components/InfrastructureSection";
import PrinciplesSection from "@/components/PrinciplesSection";
import TrustedBySection from "@/components/TrustedBySection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

import mediaCamera from "@/assets/media-camera.jpg";
import adCampaign from "@/assets/ad-campaign.jpg";
import teamMeeting from "@/assets/team-meeting.jpg";
import fundingOffice from "@/assets/funding-office.jpg";
import tradingDesk from "@/assets/trading-desk.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />

      <ServiceSection
        id="media"
        label="Media"
        title="Captured with intent."
        description="From concept to final cut—commercials, documentaries, and digital content produced for brands that need clarity and impact."
        cta="View production capabilities"
        image={mediaCamera}
        imageAlt="Media production"
      />

      <ServiceSection
        id="advertising"
        label="Advertising"
        title="Stories that convert."
        description="Creative direction, campaign systems, and media buying—built to move audiences and measurable outcomes."
        cta="See campaign work"
        image={adCampaign}
        imageAlt="Advertising campaigns"
        reverse
      />

      <ServiceSection
        id="funding"
        label="Funding"
        title="Capital with counsel."
        description="We invest early and stay close—product, growth, and go-to-market support for founders building durable companies."
        cta="Meet the portfolio"
        image={teamMeeting}
        imageAlt="Creative team"
        secondaryImage={fundingOffice}
        secondaryImageAlt="Startup funding office"
      />

      <ServiceSection
        id="trading"
        label="Trading"
        title="Decisions at speed."
        description="Quantitative research, risk controls, and execution across asset classes—built for consistency in volatile markets."
        cta="Explore our approach"
        image={tradingDesk}
        imageAlt="Trading desk"
        reverse
      />

      <InfrastructureSection />
      <PrinciplesSection />
      <TrustedBySection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
