// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

export function middleware() {
  // console.log("Waitlist middleware");
  // console.log(process.env.NODE_ENV);
  // if (
  //   process.env.NODE_ENV !== "development" &&
  //   req.nextUrl.pathname !== "/waitlist"
  // ) {
  //   return NextResponse.redirect(new URL("/waitlist", req.url));
  // }
  // return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - public (public assets)
     * - images (custom images directory)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|public|images|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
