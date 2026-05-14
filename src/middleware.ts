import { NextRequest, NextResponse } from "next/server";

// Cheap presence check only: if a session cookie exists, let the request
// through and let the server-side `auth()` in AdminLayout do the real
// validation. Edge-runtime JWT decoding was flaky and was kicking signed-in
// users back to /admin/login even when the server saw a valid session.
const SESSION_COOKIE_NAMES = [
  "__Secure-authjs.session-token",
  "authjs.session-token",
];

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (!pathname.startsWith("/admin") || pathname === "/admin/login") {
    return NextResponse.next();
  }
  const hasSession = SESSION_COOKIE_NAMES.some(
    (name) => req.cookies.get(name)?.value,
  );
  if (hasSession) {
    // Forward the path on the REQUEST headers so AdminLayout (RSC) can read
    // it via next/headers and redirect if the JWT turns out to be invalid.
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-pathname", pathname);
    return NextResponse.next({ request: { headers: requestHeaders } });
  }
  const url = req.nextUrl.clone();
  url.pathname = "/admin/login";
  url.searchParams.set("from", pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
