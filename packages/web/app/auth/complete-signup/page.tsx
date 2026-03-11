"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useSession } from "next-auth/react"
import { Layout } from "@/components/layout"
import { storage } from "@/lib/storage"

export default function CompleteSignupPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { data: session, status } = useSession()
  const [isProcessing, setIsProcessing] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const processSignup = async () => {
      // Wait for session to be available
      if (status === "loading") return
      if (status === "unauthenticated") {
        router.push("/auth/signin")
        return
      }

      if (!session?.user?.id) return

      try {
        // Get stored signup data from localStorage
        const name = storage.getSignupName()
        const referralCode = storage.getSignupReferral()
        const newsletterSubscribed = storage.getSignupSubscribe()

        if (name || referralCode || newsletterSubscribed !== null) {
          // Call API to complete signup
          const response = await fetch("/api/auth/complete-signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: name || null,
              referralCode: referralCode || null,
              newsletterSubscribed: newsletterSubscribed ?? true,
            }),
          })

          if (!response.ok) {
            const data = await response.json()
            setError(data.error || "Failed to complete signup")
          } else {
            // Clear localStorage
            storage.clearSignupData()
          }
        }

        // Redirect to callback URL or homepage
        const callbackUrl = searchParams?.get("callbackUrl") || "/"
        router.push(callbackUrl)
      } catch (error) {
        console.error("Complete signup error:", error)
        setError("An error occurred. Redirecting to Wishocracy...")
        setTimeout(() => {
          router.push("/")
        }, 2000)
      } finally {
        setIsProcessing(false)
      }
    }

    processSignup()
  }, [session, status, router, searchParams])

  if (isProcessing || status === "loading") {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-brutal-beige">
          <div className="w-full max-w-md">
            <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h1 className="text-4xl font-black mb-2">Completing signup...</h1>
              <p className="text-lg">Please wait while we finish setting up your Wishocracy account.</p>
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  if (error) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-brutal-beige">
          <div className="w-full max-w-md">
            <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="bg-red-100 border-4 border-red-500 p-4 mb-6">
                <p className="font-bold text-red-700">{error}</p>
              </div>
              <p className="text-sm">Redirecting you back now...</p>
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  return null
}

