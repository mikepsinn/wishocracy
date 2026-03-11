"use client"

import type React from "react"
import { useState } from "react"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { storage } from "@/lib/storage"
import { FaGoogle } from "react-icons/fa6"
import { createLogger } from "@/lib/logger"
import { trackSignUp } from "@/lib/analytics"
import { AlertCard } from "@/components/ui/alert-card"

const logger = createLogger('auth-form')

interface AuthFormProps {
  callbackUrl?: string
  referralCode?: string | null
  onSuccess?: () => void
  compact?: boolean
  // Configurable success messaging
  emailSuccessTitle?: string
  emailSuccessMessage?: string
  emailSuccessFooter?: string
}

export function AuthForm({
  callbackUrl = "/",
  referralCode,
  onSuccess,
  compact = false,
  emailSuccessTitle = "Check your email!",
  emailSuccessMessage = "We've sent you a magic link to continue.",
  emailSuccessFooter
}: AuthFormProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [subscribe, setSubscribe] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const [showEmailForm, setShowEmailForm] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    if (!email) {
      setError("Email is required")
      setIsLoading(false)
      return
    }

    try {
      // Store name, referral, and subscribe preference in localStorage for post-verification processing
      if (name) {
        storage.setSignupName(name)
      }
      if (referralCode) {
        storage.setSignupReferral(referralCode)
      }
      storage.setSignupSubscribe(subscribe)

      // Redirect to completion page after email verification
      const completionUrl = `/auth/complete-signup?callbackUrl=${encodeURIComponent(callbackUrl)}`

      // Send magic link via email
      const result = await signIn("email", {
        email,
        redirect: false,
        callbackUrl: completionUrl,
      })

      if (result?.error) {
        setError("Failed to send email. Please try again.")
        // Clear localStorage on error
        storage.clearSignupData()
      } else {
        setEmailSent(true)
        // Track signup/login via email
        trackSignUp({ method: "email" })
        onSuccess?.()
      }
    } catch (error) {
      logger.error("Auth error", { error })
      setError("An error occurred. Please try again.")
      // Clear localStorage on error
      storage.clearSignupData()
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialSignIn = async (provider: string) => {
    setIsLoading(true)
    storage.setSignupSubscribe(subscribe)
    // Track signup/login via social provider
    trackSignUp({ method: provider })
    const url = referralCode ? `${callbackUrl}?ref=${referralCode}` : callbackUrl
    await signIn(provider, { callbackUrl: url })
  }

  const formClasses = compact ? "space-y-3" : "space-y-4"
  const buttonHeight = compact ? "h-12" : "h-14"
  const textSize = compact ? "text-base" : "text-lg"

  // Detect if running in iframe
  const isInIframe = typeof window !== 'undefined' && window.self !== window.top

  return (
    <div className="w-full">

      {/* Iframe-specific tip */}
      {isInIframe && compact && (
        <div className="bg-brutal-cyan/20 border-2 border-brutal-cyan p-3 mb-4">
          <p className="text-xs font-bold text-center text-foreground">
            Magic links work best when they open in your main browser.
          </p>
        </div>
      )}

      {error && (
        <AlertCard type="error" message={error} className="mb-6" />
      )}

      {emailSent ? (
        <div className="bg-brutal-yellow border-4 border-black p-4 mb-6">
          <p className="font-bold text-lg">{emailSuccessTitle}</p>
          <p className="text-sm mt-2">{emailSuccessMessage}</p>
          {emailSuccessFooter && (
            <p className="text-xs mt-2 text-muted-foreground">
              {emailSuccessFooter}
            </p>
          )}
        </div>
      ) : (
        <>
          {/* Dev Mode Login */}
          {process.env.NODE_ENV === "development" && (
            <div className="mb-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsLoading(true)
                  signIn("credentials", {
                    email: "test@example.com",
                    password: "dev",
                    callbackUrl: callbackUrl
                  })
                }}
                disabled={isLoading}
                className={`w-full border-4 border-dashed border-red-500 text-red-700 bg-red-100 font-bold ${buttonHeight} ${textSize}`}
              >
                🛠️ DEV LOGIN (Test User)
              </Button>
            </div>
          )}

          {/* Google Login */}
          <div className="mb-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleSocialSignIn("google")}
              disabled={isLoading}
              className={`w-full border-4 border-black font-bold ${buttonHeight} ${textSize}`}
            >
              {FaGoogle({ className: "w-5 h-5 mr-2" })}
              Continue with Google
            </Button>
          </div>

          {!showEmailForm ? (
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowEmailForm(true)}
              className={`w-full border-4 border-black font-bold ${buttonHeight} ${textSize}`}
            >
              Continue with Email
            </Button>
          ) : (
            <>
              <div className="relative mb-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t-4 border-black"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white font-bold">OR USE EMAIL</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className={formClasses}>
                <div>
                  <Label htmlFor="auth-name" className={`${textSize} font-bold`}>
                    Name
                  </Label>
                  <Input
                    id="auth-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`border-4 border-black ${buttonHeight} ${textSize}`}
                    disabled={isLoading}
                    placeholder="Enter your name (optional)"
                  />
                </div>

                <div>
                  <Label htmlFor="auth-email" className={`${textSize} font-bold`}>
                    Email
                  </Label>
                  <Input
                    id="auth-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={`border-4 border-black ${buttonHeight} ${textSize}`}
                    disabled={isLoading}
                    placeholder="Enter your email"
                  />
                </div>

                <div className="flex items-start gap-3">
                  <input
                    id="auth-subscribe"
                    type="checkbox"
                    checked={subscribe}
                    onChange={(e) => setSubscribe(e.target.checked)}
                    disabled={isLoading}
                    className="mt-1 h-5 w-5 border-4 border-black accent-brutal-pink cursor-pointer"
                  />
                  <Label htmlFor="auth-subscribe" className="text-sm font-bold cursor-pointer select-none">
                    Subscribe for updates on our progress
                  </Label>
                </div>

                <Button
                  type="submit"
                  className={`w-full ${buttonHeight} ${textSize} font-black bg-brutal-pink hover:bg-brutal-pink/90 text-brutal-pink-foreground border-4 border-primary shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all`}
                  disabled={isLoading}
                >
                  {isLoading ? "Sending magic link..." : "Send magic link"}
                </Button>
              </form>
            </>
          )}
        </>
      )}
    </div>
  )
}
