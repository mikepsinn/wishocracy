import { NextRequest, NextResponse } from "next/server"
import { requireAuth } from "@/lib/auth-utils"
import { prisma } from "@/lib/prisma"
import { calculateAllocationsFromPairwise } from "@/lib/wishocracy-calculations"
import { BUDGET_CATEGORIES, BudgetCategoryId } from "@/lib/wishocracy-data"

interface ComparisonData {
  categoryA: string
  categoryB: string
  allocationA: number
  allocationB: number
  timestamp: string
}

function isValidAllocationPair(allocationA: number, allocationB: number): boolean {
  const sum = allocationA + allocationB
  const allocationsInRange =
    allocationA >= 0 &&
    allocationA <= 100 &&
    allocationB >= 0 &&
    allocationB <= 100

  return allocationsInRange && (sum === 100 || sum === 0)
}

function normalizeComparison(comp: ComparisonData): ComparisonData {
  if (comp.categoryA <= comp.categoryB) {
    return comp
  }

  return {
    ...comp,
    categoryA: comp.categoryB,
    categoryB: comp.categoryA,
    allocationA: comp.allocationB,
    allocationB: comp.allocationA,
  }
}

export async function POST(req: NextRequest) {
  try {
    // Require authentication
    const { userId } = await requireAuth()

    // Parse request body
    const body = await req.json()
    const { comparisons, selectedCategories } = body as {
      comparisons: ComparisonData[]
      selectedCategories?: string[]
    }

    // Validate we have at least comparisons or selected categories
    if ((!comparisons || comparisons.length === 0) &&
        (!selectedCategories || selectedCategories.length === 0)) {
      return NextResponse.json(
        { error: "At least one comparison or category selection required" },
        { status: 400 }
      )
    }

    // Sync category selections if provided
    if (selectedCategories && selectedCategories.length > 0) {
      const allCategories = Object.keys(BUDGET_CATEGORIES) as BudgetCategoryId[]
      const selections = allCategories.map(categoryId => ({
        userId,
        categoryId,
        selected: selectedCategories.includes(categoryId)
      }))

      // Delete existing selections and create new ones
      await prisma.wishocraticCategorySelection.deleteMany({ where: { userId } })
      await prisma.wishocraticCategorySelection.createMany({ data: selections })
    }

    // Sync comparisons if provided
    let finalAllocations = {}
    let createResult = { count: 0 }

    if (comparisons && comparisons.length > 0) {
      const normalizedComparisons = comparisons.map(normalizeComparison)

      // Validate allocations for each pair.
      for (const comp of comparisons) {
        if (!isValidAllocationPair(comp.allocationA, comp.allocationB)) {
          return NextResponse.json(
            { error: `Invalid allocation: ${comp.allocationA} + ${comp.allocationB}` },
            { status: 400 }
          )
        }
      }

      // Calculate final allocations
      finalAllocations = calculateAllocationsFromPairwise(normalizedComparisons)

      // Create new allocation records (skip duplicates in case of re-sync)
      createResult = await prisma.wishocraticAllocation.createMany({
        data: normalizedComparisons.map((comp) => ({
          userId,
          categoryA: comp.categoryA,
          categoryB: comp.categoryB,
          allocationA: comp.allocationA,
          allocationB: comp.allocationB,
        })),
        skipDuplicates: true, // Skip records that already exist
      })

      // Only create activity record if we actually inserted new records
      if (createResult.count > 0) {
        await prisma.activity.create({
          data: {
            userId,
            type: "COMPLETED_WISHOCRATIC_ALLOCATION",
            description: `Completed ${createResult.count} Wishocracy budget allocation${createResult.count === 1 ? '' : 's'}`,
            metadata: JSON.stringify({ finalAllocations, comparisonCount: createResult.count }),
          },
        })
      }
    }

    return NextResponse.json({
      success: true,
      finalAllocations,
      syncedSelections: selectedCategories?.length || 0,
      syncedComparisons: createResult.count,
    })
  } catch (error) {
    console.error("Wishocracy sync error:", error)
    return NextResponse.json(
      { error: "Sync failed. Please try again." },
      { status: 500 }
    )
  }
}
