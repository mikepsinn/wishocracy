import { NextResponse } from "next/server"
import { getBaseUrl } from "@/lib/site-config"

export async function GET(): Promise<NextResponse> {
  const baseUrl = getBaseUrl()
  const urls = [
    "/",
    "/wishocracy",
    "/about",
    "/faq",
    "/contact",
    "/privacy",
    "/terms",
    "/auth/signin",
  ]

  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (path) => `  <url>
    <loc>${baseUrl}${path}</loc>
  </url>`
  )
  .join("\n")}
</urlset>`

  return new NextResponse(sitemapContent, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  })
}
