import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
const SITE_VARIANT = "wishocracy.org"

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (pathname.startsWith("/vote/")) {
    const identifier = pathname.replace("/vote/", "")
    if (identifier) {
      const url = req.nextUrl.clone()
      url.pathname = "/"
      url.search = `?ref=${encodeURIComponent(identifier)}`

      const response = NextResponse.redirect(url)
      response.cookies.set("site-variant", SITE_VARIANT, {
        sameSite: "lax",
        path: "/",
        httpOnly: false,
      })
      response.headers.set("x-site-variant", SITE_VARIANT)
      return response
    }
  }

  const response = NextResponse.next()
  response.cookies.set("site-variant", SITE_VARIANT, {
    sameSite: "lax",
    path: "/",
    httpOnly: false,
  })
  response.headers.set("x-site-variant", SITE_VARIANT)
  return response
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api/auth).*)",
  ],
}
