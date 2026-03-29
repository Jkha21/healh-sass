import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { adminAuth } from "@/app/lib/firebase-admin";

export async function GET(_req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session")?.value || "";

    if (!sessionCookie) {
      return NextResponse.json({ error: "No session cookie" }, { status: 401 });
    }

    // ✅ Use checkRevoked: true
    const decoded = await adminAuth.verifySessionCookie(sessionCookie, true);

    return NextResponse.json({
      email: decoded.email,
      name: decoded.name,
      picture: decoded.picture,
      sub: decoded.sub,
    }, { status: 200 });
  } catch (error) {
    console.error("Session check error:", error);
    return NextResponse.json({ error: "Invalid or expired session" }, { status: 401 });
  }
}
