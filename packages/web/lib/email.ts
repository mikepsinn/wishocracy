import { render } from "@react-email/render"
import { SignupConfirmationEmail } from "@/emails/signup-confirmation"
import { WelcomeImpactEmail } from "@/emails/welcome-impact"
import { getResendClient } from "@/lib/email-utils"
import { getSiteConfig, getEmail } from "@/lib/site-config"
import { env } from "@/lib/env"

export async function sendSignupConfirmationEmail({
  to,
  url,
  userName,
  orgName,
}: {
  to: string
  url: string
  userName?: string
  orgName?: string
}) {
  const resend = getResendClient()
  if (!resend) {
    console.warn("RESEND_API_KEY not configured, skipping email send")
    return { success: false, error: "Email service not configured" }
  }

  const config = getSiteConfig()
  const { fromName } = config.emailBranding

  try {
    const emailHtml = await render(
      SignupConfirmationEmail({
        userName,
        url,
        orgName,
      })
    )

    const fromAddress = env.EMAIL_FROM_ADDRESS || getEmail()
    const from = `${fromName} <${fromAddress}>`

    const result = await resend.emails.send({
      from,
      to,
      subject: "Confirm your Wishocracy sign-in",
      html: emailHtml,
    })

    return { success: true, data: result }
  } catch (error) {
    console.error("Failed to send signup confirmation email:", error)
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
  }
}

export async function sendWelcomeImpactEmail({
  to,
  userName,
  referralLink,
}: {
  to: string
  userName: string
  referralLink: string
}) {
  const resend = getResendClient()
  if (!resend) {
    console.warn("RESEND_API_KEY not configured, skipping email send")
    return { success: false, error: "Email service not configured" }
  }

  const config = getSiteConfig()
  const { fromName, orgName, primaryColor } = config.emailBranding

  try {
    const emailHtml = await render(
      WelcomeImpactEmail({
        userName,
        referralLink,
        orgName,
        primaryColor,
      })
    )

    const fromAddress = env.EMAIL_FROM_ADDRESS || getEmail()
    const from = `${fromName} <${fromAddress}>`

    const result = await resend.emails.send({
      from,
      to,
      subject: "Your Wishocracy account is ready",
      html: emailHtml,
    })

    return { success: true, data: result }
  } catch (error) {
    console.error("Failed to send welcome email:", error)
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
  }
}
