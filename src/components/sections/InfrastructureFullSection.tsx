import { ArrowRight, Mail } from "lucide-react";
import { AnimatedHeading, AnimatedParagraph, AnimatedButton, AnimatedImage } from "@/components/AnimatedContent";
import infraCity from "@/assets/infra-city.jpg";
import infraServers from "@/assets/infra-servers.jpg";
import infraConstruction from "@/assets/infra-construction.jpg";
import infraLogistics from "@/assets/infra-logistics.jpg";

interface Props {
  onContact: () => void;
}

const InfrastructureFullSection = ({ onContact }: Props) => (
  <div className="h-full flex items-center justify-center px-6 md:px-10">
    <div className="max-w-7xl w-full mx-auto">
      <AnimatedImage delay={0}>
        <div className="relative rounded-lg overflow-hidden mb-8 group">
          <img
            src={infraCity}
            alt="City infrastructure aerial view"
            className="w-full h-40 md:h-56 object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-colors duration-500" />
        </div>
      </AnimatedImage>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        <div>
          <AnimatedParagraph delay={0.1} y={10}>
            <span className="text-xs tracking-[0.25em] uppercase text-primary font-semibold">
              Infrastructure
            </span>
          </AnimatedParagraph>
          <AnimatedHeading delay={0.18}>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold text-foreground leading-tight">
              Systems that scale.
            </h2>
          </AnimatedHeading>
          <AnimatedParagraph delay={0.28}>
            <p className="mt-4 text-muted-foreground leading-relaxed max-w-lg">
              Logistics, facilities, and digital infrastructure—designed for reliability and long-term value.
            </p>
          </AnimatedParagraph>

          <AnimatedImage delay={0.35}>
            <div className="grid grid-cols-3 gap-4 mt-8">
              {[
                { src: infraServers, alt: "Server room" },
                { src: infraConstruction, alt: "Construction" },
                { src: infraLogistics, alt: "Logistics" },
              ].map((img) => (
                <div key={img.alt} className="relative rounded-lg overflow-hidden group">
                  <img src={img.src} alt={img.alt} className="w-full h-24 md:h-32 object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-colors duration-500" />
                </div>
              ))}
            </div>
          </AnimatedImage>
        </div>

        <div className="flex flex-col items-start gap-4 md:pt-16">
          <AnimatedButton delay={0.4}>
            <button
              onClick={onContact}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Request a capability deck
              <ArrowRight className="w-4 h-4" />
            </button>
          </AnimatedButton>
          <AnimatedButton delay={0.5}>
            <a
              href="mailto:careers@primexia.co"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-foreground text-sm font-medium hover:bg-secondary transition-colors"
            >
              <Mail className="w-4 h-4" />
              Email us
            </a>
          </AnimatedButton>
        </div>
      </div>
    </div>
  </div>
);

export default InfrastructureFullSection;
