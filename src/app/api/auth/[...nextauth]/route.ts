import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "No authorization code provided" }, { status: 400 });
  }

  // Redirect to the dashboard after login
  return NextResponse.redirect(new URL("/dashboard?auth=success", req.url));
}

export async function POST(req: NextRequest) {
  return GET(req);
}
