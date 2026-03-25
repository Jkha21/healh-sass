// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { verifySessionCookie } from "./lib/firebase-admin";

/* ─── Route definitions ──────────────────────────────────── */

/** Pages that require a valid session to access */
const PROTECTED_ROUTES: string[] = [
  "/dashboard",
  "/patients",
  "/analytics",
  "/appointments",
  "/records",
  "/prescriptions",
  "/lab-results",
  "/telehealth",
  "/settings",
];

/** Pages only accessible when NOT logged in */
const AUTH_ROUTES: string[] = ["/login"];

/** Public routes — always accessible regardless of session */
const PUBLIC_ROUTES: string[] = ["/", "/offline"];

/* ─── Helpers ────────────────────────────────────────────── */

function getSessionToken(req: NextRequest): string | undefined {
  // Your app uses "session" cookie; keep fallbacks if you want
  return (
    req.cookies.get("session")?.value ??
    req.cookies.get("__session")?.value ??
    req.cookies.get("auth-token")?.value
  );
}

function isProtected(pathname: string): boolean {
  if (PUBLIC_ROUTES.includes(pathname)) return false;
  return PROTECTED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
}

function isAuthRoute(pathname: string): boolean {
  return AUTH_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
}

/* ─── Middleware ─────────────────────────────────────────── */
export async function middleware(req: NextRequest): Promise<NextResponse> {
  const { pathname } = req.nextUrl;

  // Skip public routes early
  if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }

  const token = getSessionToken(req);
  let isLoggedIn = false;

  if (token) {
    try {
      // This will throw if cookie is invalid/expired/revoked
      await verifySessionCookie(token);
      isLoggedIn = true;
    } catch {
      isLoggedIn = false;
    }
  }

  /* 1. Authenticated user tries to visit /login → redirect to dashboard */
  if (isLoggedIn && isAuthRoute(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  /* 2. Unauthenticated user tries to visit a protected route → redirect to /login */
  if (!isLoggedIn && isProtected(pathname)) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  /* 3. All other routes — pass through */
  return NextResponse.next();
}

/* ─── Matcher ────────────────────────────────────────────── */
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sw.js|icons|api).*)",
  ],
};
