import type { Metadata } from "next";
import HomePageClient from "@/components/HomePageClient";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Explore Primexia's diversified operating model, business structure, sector focus, and long-term strategic intent.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Primexia | Diversified Business Group",
    description:
      "Institutional overview of Primexia's structure, operating approach, and sector coverage.",
    url: "/",
    type: "website",
  },
};

export default function HomePage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://primexia.indianautoservice.com";
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Primexia Home",
    url: `${siteUrl}/`,
    description:
      "Primexia's institutional homepage covering business structure, operating focus, ventures, and contact details.",
    inLanguage: "en-US",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <HomePageClient />
    </>
  );
}
