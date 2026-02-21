import { AnimatedHeading, AnimatedParagraph } from "@/components/AnimatedContent";

const AboutPage = () => (
  <div className="min-h-screen bg-background">
    <div className="max-w-4xl mx-auto px-6 md:px-10 pt-24 pb-20">
      <AnimatedHeading>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
          About Primexia
        </h1>
      </AnimatedHeading>

      <AnimatedParagraph delay={0.15}>
        <p className="mt-8 text-lg text-muted-foreground leading-relaxed">
          Primexia is a diversified holding group with operations spanning media production,
          advertising, venture investment, proprietary trading, and infrastructure development.
          Established with a long-term institutional outlook, we build and operate businesses
          designed for resilience, consistency, and compounding value.
        </p>
      </AnimatedParagraph>

      <AnimatedParagraph delay={0.25}>
        <div className="mt-12 space-y-8">
          <div>
            <h2 className="text-2xl font-semibold text-foreground">Our Philosophy</h2>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              We operate at the intersection of creative enterprise and institutional discipline.
              Every business under our portfolio is expected to demonstrate operational clarity,
              sustainable economics, and measurable contribution to the broader group. We do not
              pursue short-term trends — we build structures that endure.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground">Leadership</h2>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              Our leadership team brings together experience from finance, technology, creative
              industries, and infrastructure. We are operators first — with direct experience
              managing P&L, building products, and scaling organizations. This operator-led
              approach ensures that capital allocation decisions are informed by execution reality,
              not abstract projections.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground">Long-Term Outlook</h2>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              We measure outcomes in years, not quarters. Our commitment to long-term value
              creation means we are willing to invest in capabilities and infrastructure today
              that will generate returns over extended time horizons. This patience is a
              competitive advantage in environments driven by short-term incentives.
            </p>
          </div>
        </div>
      </AnimatedParagraph>
    </div>
  </div>
);

export default AboutPage;
