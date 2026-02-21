import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.primexia.co";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Primexia | Media, Capital, Infrastructure",
    template: "%s | Primexia",
  },
  description:
    "Primexia is a diversified group spanning media production, advertising, venture investment, proprietary trading, and infrastructure.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Primexia",
    description:
      "A diversified holding group operating across media, advertising, venture investment, proprietary trading, and infrastructure.",
    type: "website",
    url: "/",
    siteName: "Primexia",
  },
  twitter: {
    card: "summary_large_image",
    title: "Primexia",
    description:
      "A diversified holding group operating across media, advertising, venture investment, proprietary trading, and infrastructure.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.variable}>{children}</body>
    </html>
  );
}
