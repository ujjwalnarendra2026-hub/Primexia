import { NextResponse } from "next/server";

export function proxy(request) {
  const pathname = request.nextUrl.pathname;

  // Login endpoint must stay public so admin can obtain session cookie.
  if (pathname === "/api/admin/login") {
    return NextResponse.next();
  }

  if (pathname.startsWith("/api/admin")) {
    const adminCookie = request.cookies.get("admin_session")?.value;
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
