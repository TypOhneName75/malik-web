import { NextRequest, NextResponse } from "next/server";
import { verifySession, SESSION_COOKIE_NAME } from "./lib/auth";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const res = NextResponse.next();

  // Sicherheits-Header für alle Responses
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  res.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");

  const token = req.cookies.get(SESSION_COOKIE_NAME)?.value;
  const payload = token ? verifySession(token) : null;

  // Admin-Bereich: nur für eingeloggte Admins
  if (pathname.startsWith("/admin")) {
    if (!payload || payload.role !== "ADMIN") {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Dashboard-Bereich: nur für eingeloggte User
  if (pathname.startsWith("/dashboard")) {
    if (!payload) {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return res;
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
};
