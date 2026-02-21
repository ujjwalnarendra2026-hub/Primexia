import { siteUrl } from "@/lib/env";

export function GET() {
  const body = `# Primexia\n\nPrimexia is a diversified business group operating across media, advertising, venture investment, proprietary trading, and infrastructure.\n\n## Audience\n- Institutional stakeholders\n- Regulatory and compliance reviewers\n- Banking and strategic partners\n\n## Key Pages\n- Home: ${siteUrl}/\n- About Primexia: ${siteUrl}/about-primexia\n- Business Structure & Operating Approach: ${siteUrl}/business-structure-operating-approach\n- Operating Focus: ${siteUrl}/operating-focus\n- Ventures & Investments: ${siteUrl}/ventures-investments\n- Contact: ${siteUrl}/contact\n- Legal: ${siteUrl}/legal\n- Privacy Policy: ${siteUrl}/privacy-policy\n- Terms & Conditions: ${siteUrl}/terms\n\n## Contact\n- careers@primexia.co\n`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
