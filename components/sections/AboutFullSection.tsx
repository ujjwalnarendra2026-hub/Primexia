"use client";

import { AnimatedHeading, AnimatedParagraph } from "@/components/AnimatedContent";

export default function AboutFullSection() {
  return (
    <section className="min-h-full md:h-full flex items-start md:items-center justify-center px-6 md:px-10 py-8 md:py-0" aria-labelledby="about-heading">
      <div className="max-w-4xl w-full mx-auto">
        <AnimatedParagraph delay={0.05} y={10}>
          <span className="text-xs tracking-[0.25em] uppercase text-primary font-semibold">About Primexia</span>
        </AnimatedParagraph>

        <AnimatedHeading delay={0.12}>
          <h2 id="about-heading" className="mt-4 text-3xl md:text-4xl font-bold text-foreground leading-tight">
            Built for resilience, consistency, and compounding value.
          </h2>
        </AnimatedHeading>

        <AnimatedParagraph delay={0.24}>
          <p className="mt-6 text-muted-foreground leading-relaxed max-w-2xl">
            Primexia is a diversified holding group with operations spanning media production,
            advertising, venture investment, proprietary trading, and infrastructure development.
            Established with a long-term institutional outlook, we build and operate businesses
            designed for enduring performance.
          </p>
        </AnimatedParagraph>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {[
            {
              title: "Our Philosophy",
              text: "We operate at the intersection of creative enterprise and institutional discipline. Every business is expected to demonstrate operational clarity and sustainable economics.",
            },
            {
              title: "Leadership",
              text: "Our team brings experience from finance, technology, creative industries, and infrastructure. We are operators first and capital allocation is informed by execution reality.",
            },
            {
              title: "Long-Term Outlook",
              text: "We measure outcomes in years, not quarters. Patience in investment and operations is our competitive advantage in short-term-driven markets.",
            },
          ].map((item, index) => (
            <AnimatedParagraph key={item.title} delay={0.35 + index * 0.1}>
              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
              </div>
            </AnimatedParagraph>
          ))}
        </div>
      </div>
    </section>
  );
}
