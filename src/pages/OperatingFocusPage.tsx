import { AnimatedHeading, AnimatedParagraph, AnimatedButton } from "@/components/AnimatedContent";
import { Film, Megaphone, TrendingUp, Building2, Briefcase } from "lucide-react";

const sectors = [
  {
    icon: Film,
    title: "Media Production",
    description:
      "Full-service production capabilities spanning commercials, documentaries, branded content, and digital media. From concept development to final delivery, we produce work that meets broadcast and institutional standards.",
  },
  {
    icon: Megaphone,
    title: "Advertising & Creative",
    description:
      "Strategic creative direction, campaign systems, and media planning. We work with brands that require clarity, consistency, and measurable performance from their communications.",
  },
  {
    icon: Briefcase,
    title: "Venture Investment",
    description:
      "Early-stage capital deployment with operational support. We invest in founders building durable companies and stay close through product, growth, and go-to-market phases.",
  },
  {
    icon: TrendingUp,
    title: "Proprietary Trading",
    description:
      "Quantitative research, systematic execution, and disciplined risk management across multiple asset classes. Built for consistency in volatile market conditions.",
  },
  {
    icon: Building2,
    title: "Infrastructure",
    description:
      "Physical and digital infrastructure development — logistics, facilities management, data centres, and technology platforms designed for reliability and long-term value.",
  },
];

const OperatingFocusPage = () => (
  <div className="min-h-screen bg-background">
    <div className="max-w-4xl mx-auto px-6 md:px-10 pt-24 pb-20">
      <AnimatedHeading>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
          Operating Focus
        </h1>
      </AnimatedHeading>

      <AnimatedParagraph delay={0.15}>
        <p className="mt-8 text-lg text-muted-foreground leading-relaxed">
          Primexia operates across five core sectors. Each represents a distinct competency
          area with independent operational mandates, connected by shared infrastructure
          and capital allocation at the group level.
        </p>
      </AnimatedParagraph>

      <div className="mt-14 space-y-6">
        {sectors.map((sector, i) => (
          <AnimatedButton key={sector.title} delay={0.2 + i * 0.08}>
            <div className="rounded-lg border border-border bg-card p-8 flex gap-6 items-start">
              <sector.icon className="w-7 h-7 text-primary shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-semibold text-foreground">{sector.title}</h2>
                <p className="mt-2 text-muted-foreground leading-relaxed">{sector.description}</p>
              </div>
            </div>
          </AnimatedButton>
        ))}
      </div>
    </div>
  </div>
);

export default OperatingFocusPage;
