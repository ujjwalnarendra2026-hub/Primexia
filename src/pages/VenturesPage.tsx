import { AnimatedHeading, AnimatedParagraph, AnimatedButton } from "@/components/AnimatedContent";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const investments = [
  {
    name: "Aethon Studios",
    sector: "Media & Entertainment",
    stage: "Series A",
    description:
      "Next-generation content studio combining AI-assisted production workflows with traditional filmmaking expertise. Serving enterprise clients across broadcast, streaming, and corporate communications.",
  },
  {
    name: "Meridian Logistics",
    sector: "Supply Chain & Infrastructure",
    stage: "Growth",
    description:
      "Technology-enabled logistics platform optimising last-mile delivery and warehouse management for mid-market retailers across three continents.",
  },
  {
    name: "Clearpoint Analytics",
    sector: "Financial Technology",
    stage: "Seed",
    description:
      "Quantitative analytics platform providing institutional-grade market intelligence to emerging fund managers and family offices.",
  },
  {
    name: "Forgewell Capital",
    sector: "Real Estate",
    stage: "Series B",
    description:
      "Digital infrastructure for commercial real estate transactions — streamlining due diligence, valuation, and portfolio management for institutional investors.",
  },
  {
    name: "Tidewater Systems",
    sector: "Enterprise Software",
    stage: "Series A",
    description:
      "Compliance and regulatory technology for financial services firms. Automated reporting, risk monitoring, and audit preparation tools built for regulated environments.",
  },
];

const VenturesPage = () => (
  <div className="min-h-screen bg-background">
    <div className="max-w-4xl mx-auto px-6 md:px-10 pt-24 pb-20">
      <AnimatedHeading>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
          Ventures &amp; Investments
        </h1>
      </AnimatedHeading>

      <AnimatedParagraph delay={0.15}>
        <p className="mt-8 text-lg text-muted-foreground leading-relaxed">
          Primexia deploys capital into companies that align with our operating thesis:
          durable businesses with clear unit economics, strong founding teams, and defensible
          market positions. We participate actively in portfolio operations and bring
          infrastructure, distribution, and strategic support alongside our capital.
        </p>
      </AnimatedParagraph>

      <div className="mt-14 space-y-6">
        {investments.map((inv, i) => (
          <AnimatedButton key={inv.name} delay={0.2 + i * 0.08}>
            <div className="rounded-lg border border-border bg-card p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
                <h2 className="text-xl font-semibold text-foreground">{inv.name}</h2>
                <div className="flex gap-3">
                  <span className="text-xs tracking-wide uppercase text-primary font-medium px-3 py-1 rounded-full border border-primary/30">
                    {inv.sector}
                  </span>
                  <span className="text-xs tracking-wide uppercase text-muted-foreground font-medium px-3 py-1 rounded-full border border-border">
                    {inv.stage}
                  </span>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">{inv.description}</p>
            </div>
          </AnimatedButton>
        ))}
      </div>

      <AnimatedButton delay={0.7}>
        <div className="mt-14 text-center">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Discuss investment opportunities
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </AnimatedButton>
    </div>
  </div>
);

export default VenturesPage;
