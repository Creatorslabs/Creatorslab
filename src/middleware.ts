import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // Allow everything in development mode
  // if (process.env.NODE_ENV === "development") {
  //   return NextResponse.next();
  // }

  // // Allow access to the waitlist page
  // if (req.nextUrl.pathname === "/waitlist") {
  //   return NextResponse.next();
  // }

  // if (req.nextUrl.pathname === "/sitemap.xml") {
  //   return NextResponse.next();
  // }

  // // Allow static files, images, and metadata files
  // const exemptPaths = ["/favicon.ico", "/sitemap.xml", "/robots.txt", "/creatorslab-token-metadata.json"];
  // const fileExtensionRegex =
  //   /\.(png|jpg|jpeg|gif|webp|svg|ico|css|js|woff2|woff|ttf)$/;

  // if (
  //   exemptPaths.includes(req.nextUrl.pathname) ||
  //   fileExtensionRegex.test(req.nextUrl.pathname)
  // ) {
  //   return NextResponse.next();
  // }

  // // Redirect everything else to /waitlist
  // return NextResponse.redirect(new URL("/waitlist", req.url));

    return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - Static assets (images, fonts, scripts)
     * - Metadata files (favicon, sitemap, robots.txt)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
