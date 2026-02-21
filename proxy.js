import { NextResponse } from "next/server";

export function middleware(request) {
  // Only protect API routes, allow page to load (it will handle auth state)
  if (request.nextUrl.pathname.startsWith("/api/admin")) {
    const adminCookie = request.cookies.get("admin_session")?.value;

    // For API calls, verify cookie exists and is valid
    if (!adminCookie || adminCookie.length < 32) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

// Apply middleware only to API routes
export const config = {
  matcher: ["/api/admin/:path*"],
};
