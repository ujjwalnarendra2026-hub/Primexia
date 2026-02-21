import { ArrowRight } from "lucide-react";
import { AnimatedHeading, AnimatedParagraph, AnimatedButton } from "@/components/AnimatedContent";

const investments = [
  { name: "Aethon Studios", sector: "Media", stage: "Series A" },
  { name: "Meridian Logistics", sector: "Infrastructure", stage: "Growth" },
  { name: "Clearpoint Analytics", sector: "FinTech", stage: "Seed" },
  { name: "Forgewell Capital", sector: "Real Estate", stage: "Series B" },
  { name: "Tidewater Systems", sector: "Enterprise", stage: "Series A" },
];

interface Props {
  onContact: () => void;
}

const VenturesFullSection = ({ onContact }: Props) => (
  <div className="h-full flex items-center justify-center px-6 md:px-10">
    <div className="max-w-4xl w-full mx-auto">
      <AnimatedParagraph delay={0.05} y={10}>
        <span className="text-xs tracking-[0.25em] uppercase text-primary font-semibold">
          Ventures &amp; Investments
        </span>
      </AnimatedParagraph>

      <AnimatedHeading delay={0.12}>
        <h2 className="mt-4 text-3xl md:text-4xl font-bold text-foreground leading-tight">
          Capital with conviction.
        </h2>
      </AnimatedHeading>

      <AnimatedParagraph delay={0.22}>
        <p className="mt-4 text-muted-foreground leading-relaxed max-w-2xl">
          We deploy capital into durable businesses with clear unit economics, strong founding
          teams, and defensible market positions.
        </p>
      </AnimatedParagraph>

      <div className="mt-8 space-y-3">
        {investments.map((inv, i) => (
          <AnimatedButton key={inv.name} delay={0.3 + i * 0.06}>
            <div className="rounded-lg border border-border bg-card px-6 py-4 flex items-center justify-between">
              <span className="font-semibold text-foreground text-sm">{inv.name}</span>
              <div className="flex gap-3">
                <span className="text-xs tracking-wide uppercase text-primary font-medium px-2.5 py-0.5 rounded-full border border-primary/30">
                  {inv.sector}
                </span>
                <span className="text-xs tracking-wide uppercase text-muted-foreground font-medium px-2.5 py-0.5 rounded-full border border-border">
                  {inv.stage}
                </span>
              </div>
            </div>
          </AnimatedButton>
        ))}
      </div>

      <AnimatedButton delay={0.7}>
        <button
          onClick={onContact}
          className="mt-8 inline-flex items-center gap-2 text-sm text-primary font-medium hover:opacity-80 transition-opacity"
        >
          Discuss investment opportunities
          <ArrowRight className="w-4 h-4" />
        </button>
      </AnimatedButton>
    </div>
  </div>
);

export default VenturesFullSection;
