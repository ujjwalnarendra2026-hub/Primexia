import { NextResponse } from "next/server";

export function proxy(request) {
  const pathname = request.nextUrl.pathname;
  const isGetRequest = request.method === "GET";
  const upcache = request.nextUrl.searchParams.get("upcache");

  // Manual cache purge trigger from any public page URL:
  // /?upcache=2, /terms?upcache=2, etc.
  if (isGetRequest && upcache === "2" && !pathname.startsWith("/api/")) {
    const cleanUrl = request.nextUrl.clone();
    cleanUrl.searchParams.delete("upcache");
    const returnTo = `${cleanUrl.pathname}${cleanUrl.search || ""}`;

    const flushUrl = request.nextUrl.clone();
    flushUrl.pathname = "/api/cache/flush";
    flushUrl.search = "";
    flushUrl.searchParams.set("returnTo", returnTo || "/");

    return NextResponse.redirect(flushUrl);
  }

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
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
