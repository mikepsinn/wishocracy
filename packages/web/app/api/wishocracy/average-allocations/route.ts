import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { calculateAllocationsFromPairwise } from "@/lib/wishocracy-calculations"
import { BudgetCategoryId, BUDGET_CATEGORIES } from "@/lib/wishocracy-data"

/**
 * GET /api/wishocracy/average-allocations
 * Returns the community average allocation percentages across all users
 */
export async function GET() {
  try {
    // Get all users who have completed allocations
    const allAllocations = await prisma.wishocraticAllocation.findMany({
      select: {
        userId: true,
        categoryA: true,
        categoryB: true,
        allocationA: true,
        allocationB: true,
      },
    })

    if (allAllocations.length === 0) {
      // No data yet - return empty allocations
      const emptyAllocations: Record<BudgetCategoryId, number> = {} as Record<BudgetCategoryId, number>
      Object.keys(BUDGET_CATEGORIES).forEach(categoryId => {
        emptyAllocations[categoryId as BudgetCategoryId] = 0
      })

      return NextResponse.json({
        averageAllocations: emptyAllocations,
        totalUsers: 0,
      })
    }

    // Group allocations by user
    const allocationsByUser = new Map<string, typeof allAllocations>()
    for (const allocation of allAllocations) {
      if (!allocationsByUser.has(allocation.userId)) {
        allocationsByUser.set(allocation.userId, [])
      }
      allocationsByUser.get(allocation.userId)!.push(allocation)
    }

    // Calculate each user's final allocations
    const userAllocations: Array<Record<string, number>> = []
    for (const [userId, comparisons] of allocationsByUser.entries()) {
      const userAllocation = calculateAllocationsFromPairwise(comparisons)
      userAllocations.push(userAllocation)
    }

    // Calculate average across all users
    const categoryTotals: Record<string, number> = {}
    const categoryCounts: Record<string, number> = {}

    for (const userAllocation of userAllocations) {
      for (const [categoryId, percentage] of Object.entries(userAllocation)) {
        if (!categoryTotals[categoryId]) {
          categoryTotals[categoryId] = 0
          categoryCounts[categoryId] = 0
        }
        categoryTotals[categoryId] += percentage
        categoryCounts[categoryId] += 1
      }
    }

    // Calculate averages
    const averageAllocations: Record<BudgetCategoryId, number> = {} as Record<BudgetCategoryId, number>
    for (const categoryId of Object.keys(BUDGET_CATEGORIES)) {
      const total = categoryTotals[categoryId] || 0
      const count = categoryCounts[categoryId] || 1 // Avoid division by zero
      averageAllocations[categoryId as BudgetCategoryId] = total / count
    }

    return NextResponse.json({
      averageAllocations,
      totalUsers: allocationsByUser.size,
    })
  } catch (error) {
    console.error("Failed to calculate average allocations:", error)
    return NextResponse.json(
      { error: "Failed to fetch average allocations" },
      { status: 500 }
    )
  }
}
