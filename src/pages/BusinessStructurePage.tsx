import { AnimatedHeading, AnimatedParagraph } from "@/components/AnimatedContent";

const BusinessStructurePage = () => (
  <div className="min-h-screen bg-background">
    <div className="max-w-4xl mx-auto px-6 md:px-10 pt-24 pb-20">
      <AnimatedHeading>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
          Business Structure &amp; Operating Approach
        </h1>
      </AnimatedHeading>

      <AnimatedParagraph delay={0.15}>
        <p className="mt-8 text-lg text-muted-foreground leading-relaxed">
          Primexia operates as a holding structure with clearly defined business units. Each
          vertical functions with operational independence while benefiting from shared
          infrastructure, capital allocation, and strategic oversight at the group level.
        </p>
      </AnimatedParagraph>

      <AnimatedParagraph delay={0.25}>
        <div className="mt-12 space-y-10">
          <div className="rounded-lg border border-border bg-card p-8">
            <h2 className="text-xl font-semibold text-foreground">Group Holding Structure</h2>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              Primexia Holdings serves as the parent entity with oversight of all subsidiary
              operations. Strategic direction, capital allocation, risk management, and
              governance are centralized at the holding level. Each operating company maintains
              its own management team, financial reporting, and operational mandate.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-8">
            <h2 className="text-xl font-semibold text-foreground">Operating Principles</h2>
            <ul className="mt-3 text-muted-foreground leading-relaxed space-y-3">
              <li className="flex gap-3">
                <span className="text-primary font-semibold shrink-0">01.</span>
                <span><strong className="text-foreground">Operational Independence</strong> — Each business unit operates with full autonomy in day-to-day execution.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-semibold shrink-0">02.</span>
                <span><strong className="text-foreground">Capital Discipline</strong> — Investment decisions are evaluated through consistent risk-adjusted return frameworks.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-semibold shrink-0">03.</span>
                <span><strong className="text-foreground">Shared Infrastructure</strong> — Common capabilities in technology, legal, and finance reduce duplication and improve efficiency.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-semibold shrink-0">04.</span>
                <span><strong className="text-foreground">Transparent Reporting</strong> — Standardized financial and operational reporting across all units.</span>
              </li>
            </ul>
          </div>

          <div className="rounded-lg border border-border bg-card p-8">
            <h2 className="text-xl font-semibold text-foreground">Governance</h2>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              Primexia maintains institutional-grade governance practices suitable for regulatory
              review, banking relationships, and strategic partnerships. Board-level oversight,
              compliance protocols, and audit-ready financial practices are standard across all
              operating entities.
            </p>
          </div>
        </div>
      </AnimatedParagraph>
    </div>
  </div>
);

export default BusinessStructurePage;
