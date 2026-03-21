import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const session = request.cookies.get("session");
  const { pathname } = request.nextUrl;

  const isLogin = pathname === "/portal/login";
  const isProtected = pathname.startsWith("/portal/arc-request") || pathname.startsWith("/portal/admin");

  if (isProtected && !session) {
    return NextResponse.redirect(new URL("/portal/login", request.url));
  }

  if (isLogin && session) {
    return NextResponse.redirect(new URL("/portal/arc-request", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/portal/login", "/portal/arc-request/:path*", "/portal/admin/:path*"],
};
