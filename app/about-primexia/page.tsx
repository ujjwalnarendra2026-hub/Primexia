import type { Metadata } from "next";
import PageLayout from "@/components/layout/PageLayout";

export const metadata: Metadata = {
  title: "About Primexia",
  description:
    "Overview of Primexia's institutional operating philosophy, leadership approach, and long-term strategic intent.",
  alternates: { canonical: "/about-primexia" },
};

export default function AboutPrimexiaPage() {
  return (
    <PageLayout>
      <section className="min-h-screen bg-background px-6 md:px-10 pt-24 pb-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">About Primexia</h1>
          <p className="mt-6 text-muted-foreground leading-relaxed max-w-3xl">
            Primexia is a diversified business group operating across media, advertising, venture
            investment, proprietary trading, and infrastructure. Our operating model is built for
            institutional clarity, disciplined execution, and long-term value creation.
          </p>

          <h2 className="mt-12 text-2xl font-semibold text-foreground">Operating Philosophy</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            We combine entrepreneurial speed with structured governance. Each business unit is
            expected to maintain robust reporting, operational accountability, and sustainable
            economics.
          </p>

          <h2 className="mt-10 text-2xl font-semibold text-foreground">Strategic Intent</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Primexia allocates capital and operating focus toward durable sectors where execution
            quality and patient decision-making compound into long-term advantage.
          </p>
        </div>
      </section>
    </PageLayout>
  );
}
