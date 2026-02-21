import type { Metadata } from "next";
import { AnimatedHeading, AnimatedParagraph } from "@/components/AnimatedContent";
import PageLayout from "@/components/layout/PageLayout";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Read the Primexia privacy policy for data collection, retention, and rights information.",
  alternates: {
    canonical: "/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <PageLayout>
      <div className="min-h-screen bg-background">
        <div className="max-w-3xl mx-auto px-6 md:px-10 pt-24 pb-20">
          <AnimatedHeading>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">Privacy Policy</h1>
          </AnimatedHeading>

          <AnimatedParagraph delay={0.15}>
            <div className="mt-10 space-y-8 text-muted-foreground leading-relaxed">
              <p className="text-sm uppercase tracking-widest text-muted-foreground/60">Last updated: February 21, 2026</p>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">1. Introduction</h2>
                <p>
                  Primexia Holdings ("we", "our", "us") is committed to protecting your personal
                  information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">2. Information We Collect</h2>
                <p>
                  We collect information you provide directly when using our contact form, including your name, email address, optional contact number, and message content. We may also collect technical data such as IP addresses, browser type, and usage patterns through standard web server logs.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">3. How We Use Your Information</h2>
                <p>
                  We use collected information to respond to your inquiries, maintain records of correspondence, improve our website and services, and comply with legal obligations. We do not sell, rent, or trade your personal information to third parties.
                </p>
              </section>
            </div>
          </AnimatedParagraph>
        </div>
      </div>
    </PageLayout>
  );
}
