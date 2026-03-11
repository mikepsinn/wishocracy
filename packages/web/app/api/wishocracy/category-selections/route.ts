import { NextRequest, NextResponse } from "next/server"
import { requireAuth } from "@/lib/auth-utils"
import { prisma } from "@/lib/prisma"
import { BudgetCategoryId, BUDGET_CATEGORIES } from "@/lib/wishocracy-data"

export const runtime = "nodejs"

/**
 * POST /api/wishocracy/category-selections
 * Save user's category selections (which categories they want to fund vs skip)
 */
export async function POST(req: NextRequest) {
  try {
    const { userId } = await requireAuth()

    const body = await req.json()
    const { selections } = body as {
      selections: Array<{
        categoryId: BudgetCategoryId
        selected: boolean
      }>
    }

    if (!selections || !Array.isArray(selections)) {
      return NextResponse.json(
        { error: "Invalid selections format" },
        { status: 400 }
      )
    }

    // Validate all categoryIds are valid
    const invalidCategories = selections.filter(
      (s) => !BUDGET_CATEGORIES[s.categoryId as BudgetCategoryId]
    )

    if (invalidCategories.length > 0) {
      return NextResponse.json(
        { error: "Invalid category IDs" },
        { status: 400 }
      )
    }

    // Upsert each selection
    await Promise.all(
      selections.map((selection) =>
        prisma.wishocraticCategorySelection.upsert({
          where: {
            userId_categoryId: {
              userId,
              categoryId: selection.categoryId,
            },
          },
          create: {
            userId,
            categoryId: selection.categoryId,
            selected: selection.selected,
          },
          update: {
            selected: selection.selected,
          },
        })
      )
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Failed to save category selections:", error)
    return NextResponse.json(
      { error: "Failed to save category selections" },
      { status: 500 }
    )
  }
}

/**
 * GET /api/wishocracy/category-selections
 * Fetch user's category selections
 */
export async function GET(req: NextRequest) {
  try {
    const { userId } = await requireAuth()

    const selections = await prisma.wishocraticCategorySelection.findMany({
      where: { userId },
      orderBy: { createdAt: "asc" },
    })

    return NextResponse.json({ selections })
  } catch (error) {
    console.error("Failed to fetch category selections:", error)
    return NextResponse.json(
      { error: "Failed to fetch category selections" },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/wishocracy/category-selections
 * Delete all user's category selections (used on reset)
 */
export async function DELETE(req: NextRequest) {
  try {
    const { userId } = await requireAuth()

    await prisma.wishocraticCategorySelection.deleteMany({
      where: { userId },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Failed to delete category selections:", error)
    return NextResponse.json(
      { error: "Failed to delete category selections" },
      { status: 500 }
    )
  }
}
