import type { Metadata } from "next";
import { AnimatedHeading, AnimatedParagraph } from "@/components/AnimatedContent";
import PageLayout from "@/components/layout/PageLayout";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "Read the Primexia website terms and conditions.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return (
    <PageLayout>
      <div className="min-h-screen bg-background">
        <div className="max-w-3xl mx-auto px-6 md:px-10 pt-24 pb-20">
          <AnimatedHeading>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">Terms and Conditions</h1>
          </AnimatedHeading>

          <AnimatedParagraph delay={0.15}>
            <div className="mt-10 space-y-8 text-muted-foreground leading-relaxed">
              <p className="text-sm uppercase tracking-widest text-muted-foreground/60">Last updated: February 21, 2026</p>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">1. Acceptance of Terms</h2>
                <p>
                  By accessing and using the Primexia Holdings website, you accept and agree to be bound by these Terms and Conditions. If you do not agree, please do not use this website.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">2. Use of Website</h2>
                <p>
                  This website is provided for informational purposes only. Content on this website does not constitute financial advice, investment recommendations, or an offer to buy or sell any securities.
                </p>
              </section>
            </div>
          </AnimatedParagraph>
        </div>
      </div>
    </PageLayout>
  );
}
