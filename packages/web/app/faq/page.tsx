import Layout from "@/components/layout"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getSiteConfig } from "@/lib/site-config"

export default function FAQPage() {
  const config = getSiteConfig()
  const faqSections = [
    {
      category: "About Wishocracy",
      questions: [
        {
          q: "What is Wishocracy?",
          a: "Wishocracy is a pairwise comparison app for public priorities. You compare two areas of concern at a time, and the app turns those judgments into a budget allocation.",
        },
        {
          q: "Why not just rank a list?",
          a: "Pairwise comparisons are easier for people to answer consistently. They reveal tradeoffs more clearly than asking someone to order a long list all at once.",
        },
      ],
    },
    {
      category: "Accounts and Saving",
      questions: [
        {
          q: "Do I need an account?",
          a: "No. You can start comparing right away. If you sign in, your allocations and category selections will sync to your account.",
        },
        {
          q: "What happens if I stop halfway through?",
          a: "Your progress is stored locally in the browser, and if you sign in it can be synced to your account automatically.",
        },
      ],
    },
    {
      category: "Sharing",
      questions: [
        {
          q: "Can I share my results?",
          a: "Yes. Once you complete enough comparisons, Wishocracy gives you a referral link and social share options so other people can compare their priorities too.",
        },
        {
          q: "What does the community average mean?",
          a: "It shows the aggregate allocation across saved participant results, so you can compare your own budget against the broader crowd.",
        },
      ],
    },
  ]

  return (
    <Layout>
      <div className="min-h-screen bg-background px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10 text-center">
            <p className="mb-3 text-sm font-black uppercase tracking-[0.25em] text-brutal-pink">
              {config.name}
            </p>
            <h1 className="text-4xl font-black uppercase sm:text-6xl">Frequently Asked Questions</h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg font-medium">
              The essentials on how comparisons, saved allocations, and referral links work.
            </p>
          </div>

          <div className="space-y-10">
            {faqSections.map((section) => (
              <div key={section.category}>
                <h2 className="mb-6 border-b-4 border-primary pb-3 text-3xl font-black uppercase text-brutal-pink">
                  {section.category}
                </h2>
                <div className="space-y-6">
                  {section.questions.map((faq) => (
                    <Card key={faq.q} className="border-4 border-primary p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                      <h3 className="text-xl font-black uppercase">{faq.q}</h3>
                      <p className="mt-3 text-lg leading-relaxed">{faq.a}</p>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Link href="/">
              <Button className="h-14 px-8 text-lg font-black uppercase bg-brutal-cyan text-foreground border-4 border-primary shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
                Start Comparing
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}
