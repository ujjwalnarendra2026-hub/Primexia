import { ArrowRight, Mail } from "lucide-react";
import { AnimatedHeading, AnimatedParagraph, AnimatedButton, AnimatedImage } from "@/components/AnimatedContent";
import heroCamera from "@/assets/hero-camera.jpg";
import heroStudio from "@/assets/hero-studio.jpg";
import heroConcert from "@/assets/hero-concert.jpg";
import heroPortrait from "@/assets/hero-portrait.jpg";

interface Props {
  onNavigate: (index: number) => void;
  sectionMap: Record<string, number>;
}

const HeroFullSection = ({ onNavigate, sectionMap }: Props) => (
  <div className="h-full flex items-center justify-center px-6 md:px-10">
    <div className="max-w-7xl w-full mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <AnimatedImage delay={0}>
          <div className="relative rounded-lg overflow-hidden h-48 md:h-64 group">
            <img src={heroCamera} alt="Cinema camera lens" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-colors duration-500" />
          </div>
        </AnimatedImage>

        <div className="flex flex-col items-center justify-center p-6 h-48 md:h-64">
          <AnimatedHeading delay={0.1}>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground text-center leading-tight">
              We build what's next.
            </h1>
          </AnimatedHeading>
          <AnimatedParagraph delay={0.25}>
            <p className="mt-4 text-xs tracking-[0.2em] uppercase text-muted-foreground text-center">
              Media • Advertising • Funding • Trading • Infrastructure
            </p>
          </AnimatedParagraph>
        </div>

        <AnimatedImage delay={0.15}>
          <div className="relative rounded-lg overflow-hidden h-48 md:h-64 group">
            <img src={heroStudio} alt="Film production studio" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-colors duration-500" />
          </div>
        </AnimatedImage>

        <AnimatedImage delay={0.2}>
          <div className="relative rounded-lg overflow-hidden h-48 md:h-72 group">
            <img src={heroConcert} alt="Live concert" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-colors duration-500" />
          </div>
        </AnimatedImage>

        <AnimatedImage delay={0.3}>
          <div className="relative rounded-lg overflow-hidden h-48 md:h-72 group">
            <img src={heroPortrait} alt="Creative portrait" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-colors duration-500" />
          </div>
        </AnimatedImage>

        <div className="flex flex-col items-center justify-center gap-4 p-6 h-48 md:h-72">
          <AnimatedButton delay={0.4}>
            <button
              onClick={() => onNavigate(sectionMap.about)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Explore our work
              <ArrowRight className="w-4 h-4" />
            </button>
          </AnimatedButton>
          <AnimatedButton delay={0.5}>
            <button
              onClick={() => onNavigate(sectionMap.contact)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-foreground text-sm font-medium hover:bg-secondary transition-colors"
            >
              <Mail className="w-4 h-4" />
              Get in touch
            </button>
          </AnimatedButton>
        </div>
      </div>
    </div>
  </div>
);

export default HeroFullSection;
