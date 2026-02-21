import { Film, Megaphone, TrendingUp, Building2, Briefcase } from "lucide-react";
import { AnimatedHeading, AnimatedParagraph, AnimatedButton } from "@/components/AnimatedContent";

const sectors = [
  { icon: Film, title: "Media Production", text: "Commercials, documentaries, branded content, and digital media — broadcast and institutional standard." },
  { icon: Megaphone, title: "Advertising & Creative", text: "Strategic direction, campaign systems, and media planning for brands that demand clarity." },
  { icon: Briefcase, title: "Venture Investment", text: "Early-stage capital with operational support through product, growth, and go-to-market." },
  { icon: TrendingUp, title: "Proprietary Trading", text: "Quantitative research, systematic execution, and disciplined risk management across asset classes." },
  { icon: Building2, title: "Infrastructure", text: "Logistics, facilities, data centres, and technology platforms designed for long-term value." },
];

const OperatingFocusFullSection = () => (
  <div className="h-full flex items-center justify-center px-6 md:px-10">
    <div className="max-w-5xl w-full mx-auto">
      <AnimatedParagraph delay={0.05} y={10}>
        <span className="text-xs tracking-[0.25em] uppercase text-primary font-semibold">
          Operating Focus
        </span>
      </AnimatedParagraph>

      <AnimatedHeading delay={0.12}>
        <h2 className="mt-4 text-3xl md:text-4xl font-bold text-foreground leading-tight">
          Five sectors. One operating standard.
        </h2>
      </AnimatedHeading>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
        {sectors.map((s, i) => (
          <AnimatedButton key={s.title} delay={0.22 + i * 0.07}>
            <div className="rounded-lg border border-border bg-card p-6 flex gap-4 items-start h-full">
              <s.icon className="w-5 h-5 text-primary shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground text-sm">{s.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{s.text}</p>
              </div>
            </div>
          </AnimatedButton>
        ))}
      </div>
    </div>
  </div>
);

export default OperatingFocusFullSection;
