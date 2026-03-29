// proxy.ts (ROOT level)
import { NextRequest, NextResponse } from "next/server";
import { verifySessionCookie } from "./app/lib/firebase-admin";

const PROTECTED_ROUTES: string[] = [
  "/dashboard", "/patients", "/analytics", "/appointments", 
  "/records", "/prescriptions", "/lab-results", "/telehealth", "/settings"
];

const AUTH_ROUTES: string[] = ["/", "/login"];
const PUBLIC_ROUTES: string[] = ["/offline"];

function getSessionToken(req: NextRequest): string | undefined {
  return req.cookies.get("session")?.value ?? req.cookies.get("__session")?.value ?? req.cookies.get("auth-token")?.value;
}

function isProtected(pathname: string): boolean {
  if (PUBLIC_ROUTES.includes(pathname)) return false;
  return PROTECTED_ROUTES.some(route => pathname === route || pathname.startsWith(`${route}/`));
}

function isAuthRoute(pathname: string): boolean {
  return AUTH_ROUTES.some(route => pathname === route || pathname.startsWith(`${route}/`));
}

// ✅ FIXED: "proxy" function name for Next.js 16.2
export async function proxy(req: NextRequest): Promise<NextResponse> {
  const { pathname } = req.nextUrl;

  if (PUBLIC_ROUTES.includes(pathname)) return NextResponse.next();

  const token = getSessionToken(req);
  let isLoggedIn = false;

  if (token) {
    try {
      await verifySessionCookie(token, true);
      isLoggedIn = true;
    } catch {
      isLoggedIn = false;
    }
  }

  if (isLoggedIn && isAuthRoute(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (!isLoggedIn && isProtected(pathname)) {
    const loginUrl = new URL("/", req.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}