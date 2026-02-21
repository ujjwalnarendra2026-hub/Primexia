import { ArrowRight } from "lucide-react";
import { AnimatedHeading, AnimatedParagraph, AnimatedButton } from "@/components/AnimatedContent";

const logos = ["Sony Pictures", "WPP Group", "Sequoia Capital", "BlackRock", "Bechtel"];

const ContactFullSection = () => (
  <div className="h-full flex flex-col items-center justify-center px-6 md:px-10">
    <div className="max-w-7xl w-full mx-auto text-center">
      <AnimatedHeading delay={0.05}>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">
          Let's build together.
        </h2>
      </AnimatedHeading>
      <AnimatedParagraph delay={0.18}>
        <p className="mt-4 text-muted-foreground max-w-lg mx-auto">
          Tell us what you're making. We'll respond within two business days.
        </p>
      </AnimatedParagraph>
      <AnimatedButton delay={0.32}>
        <a
          href="mailto:careers@primexia.co"
          className="mt-8 inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Start a conversation
          <ArrowRight className="w-4 h-4" />
        </a>
      </AnimatedButton>

      {/* Trusted by */}
      <AnimatedParagraph delay={0.45} y={8}>
        <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground mt-20 mb-8">
          Trusted by industry leaders
        </p>
      </AnimatedParagraph>
      <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
        {logos.map((name, i) => (
          <AnimatedButton key={name} delay={0.55 + i * 0.06}>
            <span className="text-lg md:text-xl font-semibold text-muted-foreground/50">
              {name}
            </span>
          </AnimatedButton>
        ))}
      </div>

      {/* Footer */}
      <AnimatedParagraph delay={0.9} y={6}>
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 w-full">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Primexia Private Limited
          </p>
          <div className="flex items-center gap-6">
            <span className="text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors">Privacy</span>
            <span className="text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors">Terms</span>
          </div>
        </div>
      </AnimatedParagraph>
    </div>
  </div>
);

export default ContactFullSection;
