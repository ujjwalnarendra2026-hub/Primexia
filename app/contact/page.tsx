import type { Metadata } from "next";
import Link from "next/link";
import PageLayout from "@/components/layout/PageLayout";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Primexia for institutional, strategic, banking, and partnership inquiries.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <PageLayout>
      <section className="min-h-screen bg-background px-6 md:px-10 pt-24 pb-20">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">Contact</h1>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            For institutional, regulatory, banking, strategic, or partnership inquiries, email us
            at <a className="text-primary hover:opacity-80" href="mailto:careers@primexia.co"> careers@primexia.co</a>.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            You can also use the interactive contact form from the homepage.
          </p>
          <Link href="/" className="mt-8 inline-flex items-center px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium">
            Open Home Contact Section
          </Link>
        </div>
      </section>
    </PageLayout>
  );
}
