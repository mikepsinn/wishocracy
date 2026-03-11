import { NextRequest, NextResponse } from "next/server"
import { requireAuth } from "@/lib/auth-utils"
import { prisma } from "@/lib/prisma"

function isValidAllocationPair(allocationA: number, allocationB: number): boolean {
  const sum = allocationA + allocationB
  const allocationsInRange =
    allocationA >= 0 &&
    allocationA <= 100 &&
    allocationB >= 0 &&
    allocationB <= 100

  return allocationsInRange && (sum === 100 || sum === 0)
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = await requireAuth()

    const body = await req.json()
    let { categoryA, categoryB, allocationA, allocationB } = body

    // Validate input
    if (!categoryA || !categoryB || allocationA === undefined || allocationB === undefined) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    if (!isValidAllocationPair(allocationA, allocationB)) {
      return NextResponse.json(
        { error: "Allocations must stay between 0 and 100 and sum to either 100 or 0." },
        { status: 400 }
      )
    }

    // Normalize pair order alphabetically to prevent A vs B and B vs A duplicates
    if (categoryA > categoryB) {
      // Swap categories and allocations
      ;[categoryA, categoryB] = [categoryB, categoryA]
      ;[allocationA, allocationB] = [allocationB, allocationA]
    }

    // Check if this pair already exists for this user
    const existing = await prisma.wishocraticAllocation.findFirst({
      where: {
        userId,
        categoryA,
        categoryB,
      },
    })

    if (existing) {
      // Update existing allocation instead of creating duplicate
      await prisma.wishocraticAllocation.update({
        where: { id: existing.id },
        data: {
          allocationA,
          allocationB,
        },
      })
    } else {
      // Create new allocation record
      await prisma.wishocraticAllocation.create({
        data: {
          userId,
          categoryA,
          categoryB,
          allocationA,
          allocationB,
        },
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Failed to save allocation:", error)
    return NextResponse.json(
      { error: "Failed to save allocation" },
      { status: 500 }
    )
  }
}
