import type { Metadata } from "next"
import { getBaseUrl } from "@/lib/url"

export interface EmailBranding {
  fromName: string
  primaryColor: string
  secondaryColor: string
  orgName: string
}

export interface OgMetadata {
  image: string
  width: number
  height: number
  alt?: string
  title?: string
  description?: string
  twitterImage?: {
    url: string
    width: number
    height: number
  }
}

export interface SiteConfig {
  name: string
  title: string
  description: string
  baseUrl: string
  domain: string
  canonicalUrl: string
  email: string
  icons: Metadata["icons"]
  emailBranding: EmailBranding
  ogMetadata: OgMetadata
}

export const ALLOWED_HOSTNAMES = [
  "wishocracy.org",
  "www.wishocracy.org",
  "localhost",
] as const

const WISHOCRACY_CONFIG: SiteConfig = {
  name: "Wishocracy",
  title: "Wishocracy",
  description:
    "Compare public priorities two at a time, turn those tradeoffs into an allocation, and share the result.",
  baseUrl: "https://wishocracy.org",
  domain: "wishocracy.org",
  canonicalUrl: "https://wishocracy.org",
  email: "hello@wishocracy.org",
  icons: {
    icon: [
      { url: "/assets/wishocracy/favicon.ico", sizes: "any" },
      { url: "/assets/wishocracy/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/assets/wishocracy/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/assets/wishocracy/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: {
      url: "/assets/wishocracy/apple-touch-icon.png",
      sizes: "180x180",
      type: "image/png",
    },
  },
  emailBranding: {
    fromName: "Wishocracy",
    primaryColor: "#EC4699",
    secondaryColor: "#7BDDEA",
    orgName: "Wishocracy",
  },
  ogMetadata: {
    image: "/assets/wishocracy/wishocracy-og-1200x630.png",
    width: 1200,
    height: 630,
    alt: "Wishocracy",
    title: "Wishocracy",
    description:
      "Compare public priorities two at a time, save your allocation, and share what matters most to you.",
    twitterImage: {
      url: "/assets/wishocracy/wishocracy-og-1200x630.png",
      width: 1200,
      height: 630,
    },
  },
}

export function getSiteConfig(): SiteConfig {
  return WISHOCRACY_CONFIG
}

export function getEmail(prefix: string = "hello"): string {
  return `${prefix}@${WISHOCRACY_CONFIG.domain}`
}

export { getBaseUrl }
