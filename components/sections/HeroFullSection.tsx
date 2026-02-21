"use client";

import Image from "next/image";
import { ArrowRight, Mail } from "lucide-react";
import { AnimatedHeading, AnimatedParagraph, AnimatedButton, AnimatedImage } from "@/components/AnimatedContent";

import heroCamera from "@/public/images/hero-camera.jpg";
import heroStudio from "@/public/images/hero-studio.jpg";
import heroConcert from "@/public/images/hero-concert.jpg";
import heroPortrait from "@/public/images/hero-portrait.jpg";

interface Props {
  onNavigate: (index: number) => void;
  sectionMap: Record<string, number>;
}

export default function HeroFullSection({ onNavigate, sectionMap }: Props) {
  return (
    <section className="min-h-full md:h-full flex items-start md:items-center justify-center px-6 md:px-10 py-8 md:py-0" aria-labelledby="hero-heading">
      <div className="max-w-7xl w-full mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          <AnimatedImage delay={0}>
            <div className="relative rounded-lg overflow-hidden h-48 md:h-64 group">
              <Image src={heroCamera} alt="Cinema camera lens" fill priority sizes="(max-width: 768px) 100vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-colors duration-500" />
            </div>
          </AnimatedImage>

          <div className="flex flex-col items-center justify-center p-3 md:p-6 h-auto min-h-[12rem] md:h-64">
            <AnimatedHeading delay={0.1}>
              <h1 id="hero-heading" className="text-3xl md:text-4xl font-bold text-foreground text-center leading-tight">
                Diversified operations. Institutional discipline.
              </h1>
            </AnimatedHeading>
            <AnimatedParagraph delay={0.25}>
              <p className="mt-4 text-sm text-muted-foreground text-center leading-relaxed max-w-md">
                Primexia is structured for long-term value creation across media, advertising, ventures, proprietary trading, and infrastructure.
              </p>
            </AnimatedParagraph>
          </div>

          <AnimatedImage delay={0.15}>
            <div className="relative rounded-lg overflow-hidden h-48 md:h-64 group">
              <Image src={heroStudio} alt="Film production studio" fill priority sizes="(max-width: 768px) 100vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-colors duration-500" />
            </div>
          </AnimatedImage>

          <AnimatedImage delay={0.2}>
            <div className="relative rounded-lg overflow-hidden h-48 md:h-72 group">
              <Image src={heroConcert} alt="Live concert" fill priority sizes="(max-width: 768px) 100vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-colors duration-500" />
            </div>
          </AnimatedImage>

          <AnimatedImage delay={0.3}>
            <div className="relative rounded-lg overflow-hidden h-48 md:h-72 group">
              <Image src={heroPortrait} alt="Creative portrait" fill priority sizes="(max-width: 768px) 100vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-colors duration-500" />
            </div>
          </AnimatedImage>

          <div className="flex flex-col items-center justify-center gap-4 p-4 md:p-6 h-auto min-h-[10rem] md:h-72">
            <AnimatedButton delay={0.4}>
              <button
                onClick={() => onNavigate(sectionMap.focus)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
              >
                View operating focus
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
    </section>
  );
}
