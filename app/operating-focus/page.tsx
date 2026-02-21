import type { Metadata } from "next";
import PageLayout from "@/components/layout/PageLayout";

export const metadata: Metadata = {
  title: "Operating Focus",
  description:
    "Primexia's operating focus across media, advertising, venture investment, proprietary trading, and infrastructure.",
  alternates: { canonical: "/operating-focus" },
};

export default function OperatingFocusPage() {
  return (
    <PageLayout>
      <section className="min-h-screen bg-background px-6 md:px-10 pt-24 pb-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">Operating Focus</h1>
          <p className="mt-6 text-muted-foreground leading-relaxed max-w-3xl">
            Primexia focuses on sectors where disciplined operations and structured execution create
            durable long-term value.
          </p>

          <h2 className="mt-12 text-2xl font-semibold text-foreground">Core Sectors</h2>
          <ul className="mt-4 space-y-3 text-muted-foreground leading-relaxed list-disc pl-5">
            <li>Media Production</li>
            <li>Advertising and Creative Services</li>
            <li>Venture Investment</li>
            <li>Proprietary Trading</li>
            <li>Infrastructure</li>
          </ul>
        </div>
      </section>
    </PageLayout>
  );
}
