import { AnimatedHeading, AnimatedParagraph } from "@/components/AnimatedContent";

const PrivacyPolicyPage = () => (
  <div className="min-h-screen bg-background">
    <div className="max-w-3xl mx-auto px-6 md:px-10 pt-24 pb-20">
      <AnimatedHeading>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
          Privacy Policy
        </h1>
      </AnimatedHeading>

      <AnimatedParagraph delay={0.15}>
        <div className="mt-10 space-y-8 text-muted-foreground leading-relaxed">
          <p className="text-sm uppercase tracking-widest text-muted-foreground/60">
            Last updated: February 2026
          </p>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">1. Introduction</h2>
            <p>
              Primexia Holdings ("we", "our", "us") is committed to protecting your personal
              information. This Privacy Policy explains how we collect, use, disclose, and
              safeguard your information when you visit our website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">2. Information We Collect</h2>
            <p>
              We collect information you provide directly when using our contact form, including
              your name, email address, company name, and message content. We may also collect
              technical data such as IP addresses, browser type, and usage patterns through
              standard web server logs.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">3. How We Use Your Information</h2>
            <p>
              We use collected information to respond to your enquiries, maintain records of
              correspondence, improve our website and services, and comply with legal obligations.
              We do not sell, rent, or trade your personal information to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">4. Data Retention</h2>
            <p>
              We retain personal information only for as long as necessary to fulfil the purposes
              for which it was collected, or as required by applicable laws and regulations.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">5. Security</h2>
            <p>
              We implement appropriate technical and organisational measures to protect your
              personal information against unauthorised access, alteration, disclosure, or
              destruction. All data is transmitted over encrypted connections (HTTPS/SSL).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">6. Your Rights</h2>
            <p>
              You have the right to access, correct, or delete your personal information held by
              us. To exercise these rights, please contact us at careers@primexia.co.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">7. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Changes will be posted on this
              page with an updated effective date.
            </p>
          </section>
        </div>
      </AnimatedParagraph>
    </div>
  </div>
);

export default PrivacyPolicyPage;
