import { NextRequest, NextResponse } from "next/server";

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

/**
 * Checks whether the incoming request has a Firebase session cookie.
 * Firebase sets `__session` when using Firebase Hosting + SSR,
 * or you can set a custom cookie from your own auth API route.
 * Adjust the cookie name to match your implementation.
 */
function getSessionToken(req: NextRequest): string | undefined {
  return (
    req.cookies.get("__session")?.value ??
    req.cookies.get("session")?.value ??
    req.cookies.get("auth-token")?.value
  );
}

function isProtected(pathname: string): boolean {
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
export function middleware(req: NextRequest): NextResponse {
  const { pathname } = req.nextUrl;
  const token        = getSessionToken(req);
  const isLoggedIn   = Boolean(token);

  /* 1. Authenticated user tries to visit /login → redirect to dashboard */
  if (isLoggedIn && isAuthRoute(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  /* 2. Unauthenticated user tries to visit a protected route → redirect to /login */
  if (!isLoggedIn && isProtected(pathname)) {
    const loginUrl = new URL("/login", req.url);
    /* Preserve the intended destination so we can redirect back after login */
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  /* 3. All other routes — pass through */
  return NextResponse.next();
}

/* ─── Matcher ────────────────────────────────────────────── */
export const config = {
  matcher: [
    /*
     * Match all paths EXCEPT:
     *   - _next/static  (Next.js build assets)
     *   - _next/image   (Next.js image optimisation)
     *   - favicon.ico
     *   - sw.js         (Service Worker — must be publicly accessible)
     *   - icons/*       (PWA icons)
     *   - /api/*        (API routes handle their own auth)
     */
    "/((?!_next/static|_next/image|favicon.ico|sw.js|icons|api).*)",
  ],
};