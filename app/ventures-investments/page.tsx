import type { Metadata } from "next";
import PageLayout from "@/components/layout/PageLayout";

export const metadata: Metadata = {
  title: "Ventures and Investments",
  description:
    "Overview of Primexia's venture and investment approach focused on durable businesses and long-term value.",
  alternates: { canonical: "/ventures-investments" },
};

export default function VenturesInvestmentsPage() {
  return (
    <PageLayout>
      <section className="min-h-screen bg-background px-6 md:px-10 pt-24 pb-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">Ventures and Investments</h1>
          <p className="mt-6 text-muted-foreground leading-relaxed max-w-3xl">
            Primexia deploys capital into resilient businesses with strong leadership, defensible
            positioning, and disciplined operating models.
          </p>

          <h2 className="mt-12 text-2xl font-semibold text-foreground">Investment Approach</h2>
          <ul className="mt-4 space-y-3 text-muted-foreground leading-relaxed list-disc pl-5">
            <li>Long-term orientation and governance discipline.</li>
            <li>Operational support where execution can be strengthened.</li>
            <li>Risk-aware decision frameworks across stages and sectors.</li>
          </ul>
        </div>
      </section>
    </PageLayout>
  );
}
