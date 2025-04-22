import { NextResponse } from "next/server";

const siteUrl = "https://creatorlab.cc";

const pages = ["/waitlist"];

export async function GET() {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${pages
      .map(
        (page) => `
      <url>
        <loc>${siteUrl}${page}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
      </url>`
      )
      .join("")}
  </urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}

export async function POST() {
  return new NextResponse("POST method not required for sitemap", {
    status: 405,
  });
}
