import type { NextConfig } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://primexia.indianautoservice.com";

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    const isProd = process.env.NODE_ENV === "production";
    const securityHeaders = [
      { key: "X-Frame-Options", value: "DENY" },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    ];

    // In development, use relaxed CSP to allow hot reload and preview domains
    if (!isProd) {
      return [
        {
          source: "/:path*",
          headers: [
            {
              key: "Content-Security-Policy",
              value: [
                "default-src 'self' https://*.vercel.app localhost:* 127.0.0.1:*",
                "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.vercel.app localhost:* 127.0.0.1:*",
                "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://*.vercel.app localhost:* 127.0.0.1:*",
                "img-src 'self' data: blob: https: https://*.vercel.app localhost:* 127.0.0.1:*",
                "font-src 'self' https://fonts.gstatic.com https://*.vercel.app localhost:* 127.0.0.1:*",
                "connect-src 'self' https://*.supabase.co https://*.vercel.app ws://localhost:* wss://localhost:* http://localhost:* localhost:* 127.0.0.1:*",
                "frame-ancestors 'self' https://*.vercel.app localhost:* 127.0.0.1:*",
                "base-uri 'self'",
                "form-action 'self'"
              ].join('; '),
            },
            ...securityHeaders,
          ],
        },
      ];
    }

    // Production CSP
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "img-src 'self' data: blob: https:",
              "font-src 'self' https://fonts.gstatic.com",
              "connect-src 'self' https://*.supabase.co",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'"
            ].join('; '),
          },
          ...securityHeaders,
        ],
      },
    ];
  },
  env: {
    NEXT_PUBLIC_SITE_URL: SITE_URL,
  },
};

export default nextConfig;
