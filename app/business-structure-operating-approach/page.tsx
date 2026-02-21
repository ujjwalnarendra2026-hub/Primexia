import type { Metadata } from "next";
import PageLayout from "@/components/layout/PageLayout";

export const metadata: Metadata = {
  title: "Business Structure and Operating Approach",
  description:
    "Understand Primexia's holding structure, governance model, reporting standards, and capital discipline framework.",
  alternates: { canonical: "/business-structure-operating-approach" },
};

export default function StructurePage() {
  return (
    <PageLayout>
      <section className="min-h-screen bg-background px-6 md:px-10 pt-24 pb-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">Business Structure and Operating Approach</h1>
          <p className="mt-6 text-muted-foreground leading-relaxed max-w-3xl">
            Primexia operates as a structured holding group with clearly defined business units.
            This model enables operating independence while centralizing governance, risk,
            compliance, and capital allocation standards.
          </p>

          <h2 className="mt-12 text-2xl font-semibold text-foreground">Core Principles</h2>
          <ul className="mt-4 space-y-3 text-muted-foreground leading-relaxed list-disc pl-5">
            <li>Operational independence at business-unit level.</li>
            <li>Disciplined capital allocation with risk-adjusted return criteria.</li>
            <li>Shared infrastructure for legal, finance, and technology efficiency.</li>
            <li>Standardized reporting for stakeholder clarity.</li>
          </ul>
        </div>
      </section>
    </PageLayout>
  );
}
