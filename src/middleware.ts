// middleware.ts
import { NextResponse } from "next/server";
// import { getToken } from "next-auth/jwt";

export async function middleware(req: Request) {
  // const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // const { pathname } = new URL(req.url);

  // // If user is not authenticated, allow access only to landing page
  // if (!token && pathname !== "/") {
  //   return NextResponse.redirect(new URL("/", req.url));
  // }

  // // If user is authenticated and tries to access the landing page, redirect to dashboard
  // if (token && pathname === "/") {
  //   return NextResponse.redirect(new URL("/dashboard", req.url));
  // }

  return NextResponse.next();
}

// Apply middleware to all routes except API routes and static files
export const config = {
  matcher: ["/((?!api|_next|favicon.ico).*)"],
};
