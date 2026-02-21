import { ArrowRight, Mail } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import heroCamera from "@/assets/hero-camera.jpg";
import heroStudio from "@/assets/hero-studio.jpg";
import heroConcert from "@/assets/hero-concert.jpg";
import heroPortrait from "@/assets/hero-portrait.jpg";

const HeroSection = () => {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section className="pt-20 pb-16 px-6 md:px-10" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div
            className={`rounded-lg overflow-hidden h-64 md:h-72 transition-all duration-700 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "0ms" }}
          >
            <img src={heroCamera} alt="Cinema camera lens" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          </div>

          <div
            className={`rounded-lg border border-border bg-card flex flex-col items-center justify-center p-8 h-64 md:h-72 transition-all duration-700 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "100ms" }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-foreground text-center leading-tight">
              We build what's next.
            </h1>
            <p className="mt-4 text-xs tracking-[0.2em] uppercase text-muted-foreground text-center">
              Media • Advertising • Funding • Trading • Infrastructure
            </p>
          </div>

          <div
            className={`rounded-lg overflow-hidden h-64 md:h-72 transition-all duration-700 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <img src={heroStudio} alt="Film production studio" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          </div>

          <div
            className={`rounded-lg overflow-hidden h-64 md:h-80 transition-all duration-700 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            <img src={heroConcert} alt="Live concert" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          </div>

          <div
            className={`rounded-lg overflow-hidden h-64 md:h-80 transition-all duration-700 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            <img src={heroPortrait} alt="Creative portrait" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          </div>

          <div
            className={`rounded-lg border border-border bg-card flex flex-col items-center justify-center gap-4 p-8 h-64 md:h-80 transition-all duration-700 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "500ms" }}
          >
            <a
              href="#media"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Explore our work
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-foreground text-sm font-medium hover:bg-secondary transition-colors"
            >
              <Mail className="w-4 h-4" />
              Get in touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
