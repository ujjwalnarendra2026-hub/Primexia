import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Protect admin routes with server-side verification
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const adminCookie = request.cookies.get("admin_session")?.value;

    // For page loads, redirect to login if no session
    if (!adminCookie) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    // Verify the cookie is valid (basic check)
    // The full verification happens server-side in isAdminAuthenticated()
    if (!adminCookie || adminCookie.length < 32) {
      // Clear invalid cookie
      const response = NextResponse.redirect(new URL("/admin/login", request.url));
      response.cookies.delete("admin_session");
      return response;
    }
  }

  return NextResponse.next();
}

// Apply middleware to admin routes
export const config = {
  matcher: ["/admin/:path*"],
};
