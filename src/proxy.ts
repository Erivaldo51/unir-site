import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { hasValidSession } from "@/lib/admin/session";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isLoginRoute = pathname === "/admin/login";
  const isProtectedRoute = pathname.startsWith("/admin") && !isLoginRoute;

  const authenticated = await hasValidSession();

  if (isProtectedRoute && !authenticated) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  if (isLoginRoute && authenticated) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
