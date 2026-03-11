import Link from "next/link"
import Layout from "../../components/layout"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Mail, Link2, UserPlus } from "lucide-react"
import { getEmail } from "@/lib/site-config"

export default function ContactPage() {
  return (
    <Layout>
      <div className="min-h-screen bg-background px-4 py-12">
        <div className="mx-auto max-w-4xl space-y-8">
          <div className="bg-foreground px-8 py-12 text-background border-4 border-primary">
            <h1 className="text-4xl font-black uppercase sm:text-6xl">Contact Wishocracy</h1>
            <p className="mt-6 max-w-2xl text-lg font-bold">
              Use email for questions about the app, bugs, partnerships, or research conversations.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card className="border-4 border-primary p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <Mail className="h-8 w-8" />
              <h2 className="mt-4 text-2xl font-black uppercase">Email</h2>
              <p className="mt-3 font-medium">For support, feedback, or questions about the project.</p>
              <a href={`mailto:${getEmail()}`} className="mt-4 block font-black underline">
                {getEmail()}
              </a>
            </Card>

            <Card className="border-4 border-primary p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <UserPlus className="h-8 w-8" />
              <h2 className="mt-4 text-2xl font-black uppercase">Accounts</h2>
              <p className="mt-3 font-medium">
                Sign in to save your allocations, sync progress, and generate referral links.
              </p>
              <Link href="/auth/signin" className="mt-4 block font-black underline">
                Go to sign in
              </Link>
            </Card>

            <Card className="border-4 border-primary p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <Link2 className="h-8 w-8" />
              <h2 className="mt-4 text-2xl font-black uppercase">Sharing</h2>
              <p className="mt-3 font-medium">
                Finish a comparison run and Wishocracy will generate a referral link you can share anywhere.
              </p>
              <Link href="/" className="mt-4 block font-black underline">
                Start comparing
              </Link>
            </Card>
          </div>

          <div className="flex justify-center">
            <a href={`mailto:${getEmail()}`}>
              <Button className="h-14 px-8 text-lg font-black uppercase bg-brutal-pink text-foreground border-4 border-primary shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
                Email the Team
              </Button>
            </a>
          </div>
        </div>
      </div>
    </Layout>
  )
}
