import Link from "next/link"
import { Layout } from "@/components/layout"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-brutal-beige">
        <div className="w-full max-w-2xl">
          <div className="bg-white border-4 border-black p-8 md:p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h1 className="text-6xl md:text-8xl font-black mb-4">404</h1>
            <h2 className="text-3xl md:text-4xl font-black uppercase mb-4">
              PAGE NOT <span className="text-brutal-pink">FOUND</span>
            </h2>

            <div className="bg-brutal-cyan border-4 border-black p-6 mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <p className="text-xl font-black mb-2">LOOKING FOR A COMPARISON?</p>
              <p className="font-bold">
                That route does not exist in the trimmed Wishocracy app.
              </p>
            </div>

            <p className="text-lg mb-6 leading-relaxed">
              Use the main app to compare priorities, save allocations, and share referral links.
            </p>

            <div className="bg-brutal-yellow border-4 border-black p-4 mb-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <p className="font-black text-sm">TIP</p>
              <p className="text-sm font-bold">
                Start from the homepage if you want the active Wishocracy flow.
              </p>
            </div>

            <Link href="/">
              <Button className="h-14 text-lg font-black uppercase bg-brutal-pink text-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all w-full md:w-auto">
                TAKE ME HOME
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}
