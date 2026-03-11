"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { User } from "lucide-react"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { getSiteConfig } from "@/lib/site-config"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const { data: session } = useSession()
  const siteConfig = getSiteConfig()

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b-4 border-primary bg-brutal-yellow p-4 sticky top-0 z-50">
        <div className="mx-auto max-w-6xl flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <Link
            href="/"
            className="text-xl md:text-2xl font-black uppercase tracking-tight hover:underline decoration-4"
          >
            {siteConfig.title.toUpperCase()}
          </Link>

          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <nav className="flex flex-wrap items-center gap-2 md:justify-end">
              {[
                { href: "/", label: "Compare" },
                { href: "/wishocracy", label: "Results" },
                { href: "/about", label: "About" },
                { href: "/faq", label: "FAQ" },
                { href: "/contact", label: "Contact" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-3 py-2 font-black uppercase text-sm hover:bg-background border-2 border-primary"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <Link href="/auth/signin" className="w-full md:w-auto">
              <Button
                variant="outline"
                className="w-full md:w-auto bg-background border-4 border-primary hover:bg-primary hover:text-primary-foreground font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all"
                title={session?.user?.email || "Sign in"}
              >
                {session?.user?.name ? (
                  <span className="text-sm font-black uppercase">
                    {session.user.name}
                  </span>
                ) : session?.user?.email ? (
                  <span className="text-sm font-black uppercase">
                    {session.user.email}
                  </span>
                ) : (
                  <>
                    <User className="mr-2 h-4 w-4 stroke-[3px]" />
                    Sign In
                  </>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {children}

      <footer className="bg-primary text-primary-foreground border-t-4 border-background py-12">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <div className="text-3xl font-black uppercase mb-4">{siteConfig.title}</div>
              <p className="font-bold">Compare tradeoffs, save allocations, and share referral links.</p>
            </div>
            <div>
              <h3 className="text-xl font-black uppercase mb-4">Navigate</h3>
              <div className="space-y-2 font-bold">
                <Link href="/" className="block hover:text-brutal-yellow">Compare</Link>
                <Link href="/about" className="block hover:text-brutal-yellow">About</Link>
                <Link href="/faq" className="block hover:text-brutal-yellow">FAQ</Link>
                <Link href="/contact" className="block hover:text-brutal-yellow">Contact</Link>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-black uppercase mb-4">Contact</h3>
              <div className="space-y-2 font-bold">
                <a href={`mailto:${siteConfig.email}`} className="block hover:text-brutal-yellow">
                  {siteConfig.email}
                </a>
                <a href={siteConfig.baseUrl} className="block hover:text-brutal-yellow">
                  {siteConfig.domain}
                </a>
              </div>
            </div>
          </div>

          <div className="border-t-4 border-background mt-8 pt-8">
            <div className="flex flex-wrap justify-center gap-6 font-bold text-sm mb-4">
              {[
                { href: "/privacy", label: "Privacy" },
                { href: "/terms", label: "Terms" },
              ].map((item, index, array) => (
                <React.Fragment key={item.href}>
                  <Link href={item.href} className="hover:text-brutal-yellow">
                    {item.label.toUpperCase()}
                  </Link>
                  {index < array.length - 1 && <span>•</span>}
                </React.Fragment>
              ))}
            </div>
            <div className="text-center font-bold uppercase">© {new Date().getFullYear()} {siteConfig.title}</div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout
