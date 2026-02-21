"use client";

import { Film, Megaphone, TrendingUp, Building2, Briefcase } from "lucide-react";
import { AnimatedHeading, AnimatedParagraph, AnimatedButton } from "@/components/AnimatedContent";

const sectors = [
  {
    icon: Film,
    title: "Media Production",
    text: "Commercials, documentaries, branded content, and digital media built to institutional standards.",
  },
  {
    icon: Megaphone,
    title: "Advertising and Creative",
    text: "Strategic direction, campaign systems, and media planning for brands that demand clarity.",
  },
  {
    icon: Briefcase,
    title: "Venture Investment",
    text: "Early-stage capital with operational support through product, growth, and go-to-market.",
  },
  {
    icon: TrendingUp,
    title: "Proprietary Trading",
    text: "Quantitative research, systematic execution, and disciplined risk management across asset classes.",
  },
  {
    icon: Building2,
    title: "Infrastructure",
    text: "Logistics, facilities, data centers, and technology platforms designed for long-term value.",
  },
];

export default function OperatingFocusFullSection() {
  return (
    <section className="min-h-full md:h-full flex items-start md:items-center justify-center px-6 md:px-10 py-8 md:py-0" aria-labelledby="focus-heading">
      <div className="max-w-5xl w-full mx-auto">
        <AnimatedParagraph delay={0.05} y={10}>
          <span className="text-xs tracking-[0.25em] uppercase text-primary font-semibold">Operating Focus</span>
        </AnimatedParagraph>

        <AnimatedHeading delay={0.12}>
          <h2 id="focus-heading" className="mt-4 text-3xl md:text-4xl font-bold text-foreground leading-tight">
            Five sectors. One operating standard.
          </h2>
        </AnimatedHeading>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
          {sectors.map((sector, index) => (
            <AnimatedButton key={sector.title} delay={0.22 + index * 0.07}>
              <div className="rounded-lg border border-border bg-card p-6 flex gap-4 items-start h-full">
                <sector.icon className="w-5 h-5 text-primary shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground text-sm">{sector.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{sector.text}</p>
                </div>
              </div>
            </AnimatedButton>
          ))}
        </div>
      </div>
    </section>
  );
}
