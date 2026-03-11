import { NextResponse } from "next/server"
import { requireAuth } from "@/lib/auth-utils"
import { prisma } from "@/lib/prisma"
import { findUserByUsernameOrReferralCode } from "@/lib/referral.server"
import { VoteAnswer, EmailType } from "@prisma/client"
import { sendWelcomeImpactEmail } from "@/lib/email"
import { buildUserReferralUrl } from "@/lib/url"

// Force dynamic rendering (uses headers for auth)
export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    const { userId } = await requireAuth()

    const { name, referralCode, newsletterSubscribed } = await req.json()

    // Get user data for email
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        name: true,
        email: true,
        username: true,
        referralCode: true,
        emailNotifications: true,
      },
    })

    // Update user name and newsletter preference
    const updateData: Record<string, unknown> = {}
    if (name && !user?.name) {
      updateData.name = name
    }
    if (typeof newsletterSubscribed === "boolean") {
      updateData.newsletterSubscribed = newsletterSubscribed
    }
    if (Object.keys(updateData).length > 0) {
      await prisma.user.update({
        where: { id: userId },
        data: updateData,
      })
    }

    // Handle referral vote if referral code provided
    if (referralCode) {
      const referringUser = await findUserByUsernameOrReferralCode(referralCode)

      if (referringUser?.id && referringUser.id !== userId) {
        // Check if vote with this referral already exists
        const existingVote = await prisma.vote.findFirst({
          where: {
            userId,
            referredByUserId: referringUser.id,
          },
        })

        // Create vote with referral if it doesn't exist
        if (!existingVote) {
          await prisma.vote.create({
            data: {
              userId,
              answer: VoteAnswer.YES,
              referredByUserId: referringUser.id,
            },
          })
        }
      }
    }

    // Send welcome + impact email (Email 1) if user has email notifications enabled
    if (user?.email && user?.emailNotifications !== false) {
      const userName = name || user.name || "Participant"
      const referralLink = buildUserReferralUrl({
        username: user.username,
        referralCode: user.referralCode
      })
      // Send email asynchronously (don't block response)
      sendWelcomeImpactEmail({
        to: user.email,
        userName,
        referralLink,
      }).then((result) => {
        // Log to EmailLog for tracking and preventing duplicates
        if (result.success && result.data) {
          prisma.emailLog.create({
            data: {
              userId: userId,
              to: user.email,
              type: EmailType.WELCOME_IMPACT,
              subject: "Your Wishocracy account is ready",
              template: "welcome-impact",
              status: "SENT",
              resendEmailId: (result.data as any).id || null,
            },
          }).catch((err) => {
            console.error("[COMPLETE_SIGNUP] Failed to log email:", err)
          })
        }
      }).catch((error) => {
        console.error("[COMPLETE_SIGNUP] Failed to send welcome email:", error)
      })
    }

    return NextResponse.json({ message: "Signup completed successfully" }, { status: 200 })
  } catch (error) {
    console.error("[COMPLETE_SIGNUP] Error:", error)
    return NextResponse.json({ error: "Failed to complete signup" }, { status: 500 })
  }
}

