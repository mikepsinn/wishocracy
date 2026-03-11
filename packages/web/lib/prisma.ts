import { PrismaClient } from "@prisma/client"
import { PrismaNeon } from "@prisma/adapter-neon"
import { env } from "@/lib/env"

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
// Learn more: https://pris.ly/d/help/next-js-best-practices

const globalForPrisma = global as unknown as { prisma: PrismaClient }

// Use Neon serverless adapter for Prisma 7 compatibility with Vercel
const adapter = new PrismaNeon({
  connectionString: env.DATABASE_URL,
})

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
    log: env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  })

if (env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

export default prisma
