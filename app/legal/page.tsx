import type { Metadata } from "next";
import { AnimatedHeading, AnimatedParagraph } from "@/components/AnimatedContent";
import PageLayout from "@/components/layout/PageLayout";

export const metadata: Metadata = {
  title: "Legal",
  description: "Legal information and notices for Primexia.",
  alternates: {
    canonical: "/legal",
  },
};

export default function LegalPage() {
  return (
    <PageLayout>
      <div className="min-h-screen bg-background">
        <div className="max-w-3xl mx-auto px-6 md:px-10 pt-24 pb-20">
          <AnimatedHeading>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">Legal</h1>
          </AnimatedHeading>

          <AnimatedParagraph delay={0.15}>
            <div className="mt-10 space-y-8 text-muted-foreground leading-relaxed">
              <p className="text-sm uppercase tracking-widest text-muted-foreground/60">Last updated: February 21, 2026</p>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">1. Legal Notice</h2>
                <p>
                  Primexia Holdings provides this website for informational purposes only. Nothing on this site should be treated as legal, financial, tax, or investment advice.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">2. No Offer or Solicitation</h2>
                <p>
                  Content on this website does not constitute an offer to sell, or solicitation of an offer to buy, any security, product, or service in any jurisdiction where such activity would be unlawful.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">3. Contact</h2>
                <p>
                  For legal inquiries, contact us at{" "}
                  <a href="mailto:careers@primexia.co" className="text-primary hover:opacity-80 transition-opacity">
                    careers@primexia.co
                  </a>
                  .
                </p>
              </section>
            </div>
          </AnimatedParagraph>
        </div>
      </div>
    </PageLayout>
  );
}
