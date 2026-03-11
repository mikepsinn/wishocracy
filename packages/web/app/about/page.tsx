import Link from "next/link"
import Layout from "../../components/layout"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { getSiteConfig } from "@/lib/site-config"

export default function AboutPage() {
  const config = getSiteConfig()
  return (
    <Layout>
      <div className="min-h-screen bg-background px-4 py-12">
        <div className="mx-auto max-w-5xl space-y-8">
          <div className="bg-foreground px-8 py-12 text-background border-4 border-primary">
            <p className="mb-3 text-sm font-black uppercase tracking-[0.25em] text-brutal-yellow">
              About {config.name}
            </p>
            <h1 className="max-w-3xl text-4xl font-black uppercase leading-none sm:text-6xl">
              A simpler way to see what you would actually fund.
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-bold">
              Wishocracy turns hard tradeoffs into fast pairwise comparisons, then converts those choices into a budget allocation you can save and share.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Compare",
                body: "You choose between two public priorities at a time instead of wrestling with one giant ranking problem.",
              },
              {
                title: "Quantify",
                body: "Your comparisons are converted into a percentage allocation so you can see your values as an actual budget.",
              },
              {
                title: "Share",
                body: "Create an account, keep your allocations, and send referral links so more people can compare their priorities too.",
              },
            ].map((item) => (
              <Card key={item.title} className="border-4 border-primary p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <h2 className="text-2xl font-black uppercase">{item.title}</h2>
                <p className="mt-4 text-base font-medium leading-relaxed">{item.body}</p>
              </Card>
            ))}
          </div>

          <Card className="border-4 border-primary p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-3xl font-black uppercase">Why Pairwise Comparisons</h2>
            <p className="mt-4 text-lg leading-relaxed">
              Asking people to rank a long list usually produces noisy answers. Comparing two priorities at a time is easier, faster, and exposes the real tradeoffs people make when resources are limited.
            </p>
            <p className="mt-4 text-lg leading-relaxed">
              That makes Wishocracy useful both as a personal reflection tool and as a way to build a shared picture of collective priorities over time.
            </p>
          </Card>

          <div className="flex justify-center">
            <Link href="/">
              <Button className="h-14 px-8 text-lg font-black uppercase bg-brutal-pink text-foreground border-4 border-primary shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
                Start Comparing
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}
