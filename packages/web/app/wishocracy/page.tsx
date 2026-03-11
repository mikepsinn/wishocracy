import { Metadata } from "next"
import Layout from "@/components/layout"
import WishocracySection from "@/components/wishocracy/wishocracy-section"

export const metadata: Metadata = {
  title: "Wishocracy",
  description:
    "Compare different areas of human concern and discover what matters most to you through pairwise comparisons.",
  openGraph: {
    title: "Wishocracy",
    description:
      "Compare different areas of human concern and discover what matters most to you through pairwise comparisons.",
    type: "website",
  },
}

export default function WishocracyPage() {
  return (
    <Layout>
      <WishocracySection />
    </Layout>
  )
}
