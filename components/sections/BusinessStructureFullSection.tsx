"use client";

import { AnimatedHeading, AnimatedParagraph } from "@/components/AnimatedContent";

export default function BusinessStructureFullSection() {
  return (
    <section className="min-h-full md:h-full flex items-start md:items-center justify-center px-6 md:px-10 py-8 md:py-0" aria-labelledby="structure-heading">
      <div className="max-w-4xl w-full mx-auto">
        <AnimatedParagraph delay={0.05} y={10}>
          <span className="text-xs tracking-[0.25em] uppercase text-primary font-semibold">
            Business Structure and Operating Approach
          </span>
        </AnimatedParagraph>

        <AnimatedHeading delay={0.12}>
          <h2 id="structure-heading" className="mt-4 text-3xl md:text-4xl font-bold text-foreground leading-tight">
            Clarity of structure, discipline of execution.
          </h2>
        </AnimatedHeading>

        <AnimatedParagraph delay={0.24}>
          <p className="mt-6 text-muted-foreground leading-relaxed max-w-2xl">
            Primexia operates as a holding structure with clearly defined business units. Each
            vertical functions with operational independence while benefiting from shared
            infrastructure, capital allocation, and strategic oversight at the group level.
          </p>
        </AnimatedParagraph>

        <div className="mt-10 space-y-4">
          {[
            {
              num: "01",
              title: "Operational Independence",
              text: "Each business unit operates with autonomy in day-to-day execution.",
            },
            {
              num: "02",
              title: "Capital Discipline",
              text: "Investment decisions are evaluated through consistent risk-adjusted return frameworks.",
            },
            {
              num: "03",
              title: "Shared Infrastructure",
              text: "Common capabilities in technology, legal, and finance reduce duplication and improve efficiency.",
            },
            {
              num: "04",
              title: "Transparent Reporting",
              text: "Standardized financial and operational reporting across all units.",
            },
          ].map((item, index) => (
            <AnimatedParagraph key={item.num} delay={0.32 + index * 0.08}>
              <div className="flex gap-4 items-start rounded-lg border border-border bg-card p-5">
                <span className="text-primary font-semibold text-sm shrink-0">{item.num}</span>
                <div>
                  <span className="font-semibold text-foreground">{item.title}</span>
                  <span className="text-muted-foreground"> - {item.text}</span>
                </div>
              </div>
            </AnimatedParagraph>
          ))}
        </div>
      </div>
    </section>
  );
}
