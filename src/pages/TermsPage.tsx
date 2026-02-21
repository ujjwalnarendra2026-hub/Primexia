import { AnimatedHeading, AnimatedParagraph } from "@/components/AnimatedContent";

const TermsPage = () => (
  <div className="min-h-screen bg-background">
    <div className="max-w-3xl mx-auto px-6 md:px-10 pt-24 pb-20">
      <AnimatedHeading>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
          Terms &amp; Conditions
        </h1>
      </AnimatedHeading>

      <AnimatedParagraph delay={0.15}>
        <div className="mt-10 space-y-8 text-muted-foreground leading-relaxed">
          <p className="text-sm uppercase tracking-widest text-muted-foreground/60">
            Last updated: February 2026
          </p>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing and using the Primexia Holdings website, you accept and agree to be
              bound by these Terms and Conditions. If you do not agree, please do not use this
              website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">2. Use of Website</h2>
            <p>
              This website is provided for informational purposes only. Content on this website
              does not constitute financial advice, investment recommendations, or an offer to
              buy or sell any securities.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">3. Intellectual Property</h2>
            <p>
              All content, design, graphics, logos, and other materials on this website are the
              property of Primexia Holdings and are protected by applicable intellectual property
              laws. You may not reproduce, distribute, or create derivative works without our
              prior written consent.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">4. Limitation of Liability</h2>
            <p>
              Primexia Holdings shall not be liable for any direct, indirect, incidental, or
              consequential damages arising from your use of or inability to use this website.
              Information is provided "as is" without warranties of any kind.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">5. External Links</h2>
            <p>
              This website may contain links to third-party websites. We are not responsible for
              the content, privacy practices, or terms of service of any external sites.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">6. Governing Law</h2>
            <p>
              These Terms and Conditions shall be governed by and construed in accordance with
              applicable laws. Any disputes arising from your use of this website shall be
              subject to the exclusive jurisdiction of the relevant courts.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">7. Changes</h2>
            <p>
              We reserve the right to modify these Terms at any time. Continued use of the
              website following any changes constitutes acceptance of the updated terms.
            </p>
          </section>
        </div>
      </AnimatedParagraph>
    </div>
  </div>
);

export default TermsPage;
