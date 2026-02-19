import { ArrowRight, Mail } from "lucide-react";
import heroCamera from "@/assets/hero-camera.jpg";
import heroStudio from "@/assets/hero-studio.jpg";
import heroConcert from "@/assets/hero-concert.jpg";
import heroPortrait from "@/assets/hero-portrait.jpg";

const HeroSection = () => {
  return (
    <section className="pt-20 pb-16 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Top Left - Camera */}
          <div className="rounded-lg overflow-hidden h-64 md:h-72">
            <img
              src={heroCamera}
              alt="Cinema camera lens"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Top Center - Title Card */}
          <div className="rounded-lg border border-border bg-card flex flex-col items-center justify-center p-8 h-64 md:h-72">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground text-center leading-tight">
              We build what's next.
            </h1>
            <p className="mt-4 text-xs tracking-[0.2em] uppercase text-muted-foreground text-center">
              Media • Advertising • Funding • Trading • Infrastructure
            </p>
          </div>

          {/* Top Right - Studio */}
          <div className="rounded-lg overflow-hidden h-64 md:h-72">
            <img
              src={heroStudio}
              alt="Film production studio"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Bottom Left - Concert */}
          <div className="rounded-lg overflow-hidden h-64 md:h-80">
            <img
              src={heroConcert}
              alt="Live concert"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Bottom Center - Portrait */}
          <div className="rounded-lg overflow-hidden h-64 md:h-80">
            <img
              src={heroPortrait}
              alt="Creative portrait"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Bottom Right - CTA Card */}
          <div className="rounded-lg border border-border bg-card flex flex-col items-center justify-center gap-4 p-8 h-64 md:h-80">
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
