import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth-utils"
import { prisma } from "@/lib/prisma"
import { createLogger } from "@/lib/logger"

const logger = createLogger('api/wishocracy/allocations')

export async function GET() {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ allocations: [] })
    }

    // Fetch all allocations for this user
    const dbAllocations = await prisma.wishocraticAllocation.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'asc' },
      select: {
        categoryA: true,
        categoryB: true,
        allocationA: true,
        allocationB: true,
        createdAt: true,
      },
    })

    // Deduplicate pairs (in case of historical data with both A vs B and B vs A)
    const seen = new Map<string, typeof dbAllocations[0]>()
    for (const alloc of dbAllocations) {
      // Normalize pair key alphabetically
      const [catA, catB] = [alloc.categoryA, alloc.categoryB].sort()
      const key = `${catA}_${catB}`

      // Keep the most recent allocation for this pair
      if (!seen.has(key)) {
        seen.set(key, alloc)
      } else {
        const existing = seen.get(key)!
        if (alloc.createdAt > existing.createdAt) {
          seen.set(key, alloc)
        }
      }
    }

    // Transform to client format with normalized category order
    const allocations = Array.from(seen.values()).map(alloc => {
      // Ensure categories are in alphabetical order
      const [catA, catB] = [alloc.categoryA, alloc.categoryB].sort()
      const needsSwap = catA !== alloc.categoryA

      return {
        categoryA: catA,
        categoryB: catB,
        allocationA: needsSwap ? alloc.allocationB : alloc.allocationA,
        allocationB: needsSwap ? alloc.allocationA : alloc.allocationB,
        timestamp: alloc.createdAt.toISOString(),
      }
    })

    return NextResponse.json({ allocations })
  } catch (error) {
    logger.error("Failed to fetch allocations:", error)
    return NextResponse.json({ allocations: [] })
  }
}

export async function PATCH(req: Request) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { updatedComparisons, deletedCategories } = body as {
      updatedComparisons: Array<{
        categoryA: string
        categoryB: string
        allocationA: number
        allocationB: number
      }>
      deletedCategories: string[]
    }

    // Delete allocations involving deleted categories
    if (deletedCategories && deletedCategories.length > 0) {
      await prisma.wishocraticAllocation.deleteMany({
        where: {
          userId: user.id,
          OR: [
            { categoryA: { in: deletedCategories } },
            { categoryB: { in: deletedCategories } }
          ]
        }
      })
    }

    // Update allocations
    if (updatedComparisons && updatedComparisons.length > 0) {
      // Delete existing allocations and recreate with new values
      // This is simpler than trying to match and update each one
      const categoriesToUpdate = new Set<string>()
      updatedComparisons.forEach(comp => {
        categoriesToUpdate.add(comp.categoryA)
        categoriesToUpdate.add(comp.categoryB)
      })

      // Delete existing allocations for pairs being updated
      for (const comp of updatedComparisons) {
        await prisma.wishocraticAllocation.deleteMany({
          where: {
            userId: user.id,
            OR: [
              {
                categoryA: comp.categoryA,
                categoryB: comp.categoryB
              },
              {
                categoryA: comp.categoryB,
                categoryB: comp.categoryA
              }
            ]
          }
        })
      }

      // Create new allocations with updated values
      await prisma.wishocraticAllocation.createMany({
        data: updatedComparisons.map(comp => ({
          userId: user.id,
          categoryA: comp.categoryA,
          categoryB: comp.categoryB,
          allocationA: comp.allocationA,
          allocationB: comp.allocationB
        }))
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    logger.error("Failed to update allocations:", error)
    return NextResponse.json({ error: "Failed to update allocations" }, { status: 500 })
  }
}

export async function DELETE() {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Delete all allocations for this user
    await prisma.wishocraticAllocation.deleteMany({
      where: { userId: user.id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    logger.error("Failed to delete allocations:", error)
    return NextResponse.json({ error: "Failed to delete allocations" }, { status: 500 })
  }
}
