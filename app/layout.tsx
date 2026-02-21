import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://primexia.indianautoservice.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Primexia | Diversified Business Group",
    template: "%s | Primexia",
  },
  description:
    "Primexia is a diversified business group across media, advertising, venture investment, proprietary trading, and infrastructure with institutional operating discipline.",
  keywords: [
    "Primexia",
    "diversified business group",
    "media production",
    "advertising",
    "venture investment",
    "proprietary trading",
    "infrastructure",
    "institutional operations",
  ],
  authors: [{ name: "Primexia" }],
  creator: "Primexia",
  publisher: "Primexia",
  category: "Business",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Primexia",
    description:
      "A diversified business group operating across media, advertising, venture investment, proprietary trading, and infrastructure.",
    type: "website",
    url: "/",
    siteName: "Primexia",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Primexia",
    description:
      "A diversified business group operating across media, advertising, venture investment, proprietary trading, and infrastructure.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Primexia",
    url: siteUrl,
    email: "careers@primexia.co",
    description:
      "Primexia is a diversified business group with operations in media, advertising, venture investment, proprietary trading, and infrastructure.",
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Primexia",
    url: siteUrl,
    description:
      "Institutional-grade overview of Primexia's structure, operating approach, and strategic sectors.",
    inLanguage: "en-US",
  };

  return (
    <html lang="en">
      <body className={inter.variable}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
