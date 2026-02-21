import { Users, Clock, Layers } from "lucide-react";
import { AnimatedHeading, AnimatedParagraph, AnimatedButton } from "@/components/AnimatedContent";

const principles = [
  {
    icon: Users,
    title: "Operator-led",
    description: "We've run teams, shipped products, and managed P&L.",
  },
  {
    icon: Clock,
    title: "Long-term",
    description: "We measure outcomes in years, not quarters.",
  },
  {
    icon: Layers,
    title: "Modular",
    description: "Services connect—creative, capital, and infrastructure work as one system.",
  },
];

const PrinciplesFullSection = () => (
  <div className="h-full flex items-center justify-center px-6 md:px-10">
    <div className="max-w-7xl w-full mx-auto text-center">
      <AnimatedHeading delay={0.05}>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">
          Principles over promises.
        </h2>
      </AnimatedHeading>
      <AnimatedParagraph delay={0.18}>
        <p className="mt-4 text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          We operate across disciplines, but one thing stays constant: we build
          with operators, not just capital.
        </p>
      </AnimatedParagraph>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-14">
        {principles.map((p, i) => (
          <AnimatedButton key={p.title} delay={0.3 + i * 0.1}>
            <div className="rounded-lg border border-border bg-card p-8 text-left">
              <p.icon className="w-6 h-6 text-primary mb-4" />
              <h3 className="text-lg font-semibold text-foreground">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.description}</p>
            </div>
          </AnimatedButton>
        ))}
      </div>
    </div>
  </div>
);

export default PrinciplesFullSection;
