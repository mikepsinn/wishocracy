import { getServerSession } from "next-auth"
import { authOptions } from "./auth"
import { prisma } from "./prisma"

export async function getCurrentUser() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return null
  }

  return prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      socialAccounts: true,
      badges: true,
    },
  })
}

export async function requireAuth() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    throw new Error("Unauthorized")
  }

  return {
    userId: session.user.id,
    userEmail: session.user.email,
  }
}
