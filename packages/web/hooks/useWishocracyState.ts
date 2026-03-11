import { useState, useEffect, useRef, useMemo } from "react"
import { useSession } from "next-auth/react"
import { useSearchParams } from "next/navigation"
import confetti from "canvas-confetti"
import { WishocraticAllocation } from "@prisma/client"
import { storage } from "@/lib/storage"
import { BudgetCategoryId, BUDGET_CATEGORIES } from "@/lib/wishocracy-data"
import {
  syncPendingWishocracy,
  generateAllPairsFromCategories,
  generateRandomPairs,
  filterRejectedPairs,
  filterValidComparisons,
  filterCompletedPairs,
  filterValidPairs,
  calculateTotalPairs,
  shufflePairs
} from "@/lib/wishocracy-utils"
import { createLogger } from "@/lib/logger"

const logger = createLogger('useWishocracyState')

// Pending allocation type - partial of Prisma type for both DB and client-side usage
// Can represent allocations from DB or localStorage (with optional timestamp)
type PendingWishocraticAllocation = Partial<WishocraticAllocation> & {
  categoryA: string
  categoryB: string
  allocationA: number
  allocationB: number
  timestamp?: string // For localStorage
}

export function useWishocracyState() {
  const [currentPairIndex, setCurrentPairIndex] = useState(0)
  const [comparisons, setComparisons] = useState<PendingWishocraticAllocation[]>([])
  const [shuffledPairs, setShuffledPairs] = useState<Array<[BudgetCategoryId, BudgetCategoryId]>>([])
  const [showIntro, setShowIntro] = useState(false)
  const [showCategorySelection, setShowCategorySelection] = useState(false)
  const [showAuthPrompt, setShowAuthPrompt] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCategories, setSelectedCategories] = useState<Set<BudgetCategoryId>>(new Set())
  const [rejectedCategories, setRejectedCategories] = useState<Set<BudgetCategoryId>>(new Set())
  const [initialized, setInitialized] = useState(false)
  const { data: session, status } = useSession()
  const searchParams = useSearchParams()
  const authCardRef = useRef<HTMLDivElement>(null)

  // Calculate total possible unique pairs (accounting for selected categories)
  const totalPossiblePairs = useMemo(() => {
    const activeCategories = selectedCategories.size > 0
      ? selectedCategories.size
      : Object.keys(BUDGET_CATEGORIES).length
    return calculateTotalPairs(activeCategories)
  }, [selectedCategories])

  // Initialize pairs on mount - only runs once per auth status change
  const initializedRef = useRef(false)
  useEffect(() => {
    // Skip if already initialized or still loading auth
    if (initialized || status === "loading" || initializedRef.current) {
      return
    }

    initializedRef.current = true

    const initializeData = async () => {
      setIsLoading(true)

      // If authenticated, sync localStorage first, then fetch from database
      if (status === "authenticated" && session) {
        try {
          // Sync any pending localStorage data to DB first
          await syncPendingWishocracy(session)

          // Now fetch current state from database
          const [allocationsRes, selectionsRes] = await Promise.all([
            fetch("/api/wishocracy/allocations"),
            fetch("/api/wishocracy/category-selections")
          ])

          const allocationsData = await allocationsRes.json()
          const selectionsData = await selectionsRes.json()

          const savedSelections = selectionsData.selections || []
          const allocations = (allocationsData.allocations || []) as PendingWishocraticAllocation[]

          // Extract selected category IDs (filter to only selected: true)
          const selectedCategoryIds = new Set<BudgetCategoryId>(
            savedSelections.filter((s: any) => s.selected).map((s: any) => s.categoryId as BudgetCategoryId)
          )

          // If user has selected specific categories, use them
          if (selectedCategoryIds.size > 0) {
            setSelectedCategories(selectedCategoryIds)

            // Filter allocations to only selected categories
            const validComparisons = filterValidComparisons<PendingWishocraticAllocation>(
              allocations,
              selectedCategoryIds
            )

            // Generate pairs only from selected categories
            const allPossiblePairs = generateAllPairsFromCategories(selectedCategoryIds)

            // Filter out already-completed pairs
            const uncompletedPairs = filterCompletedPairs(allPossiblePairs, validComparisons)

            setComparisons(validComparisons)
            setShuffledPairs(uncompletedPairs)
            setCurrentPairIndex(0)
            setShowIntro(false)
          } else if (allocations.length > 0) {
            // User has allocations but no selected categories (completed random pairs)
            const validComparisons = filterValidComparisons<PendingWishocraticAllocation>(allocations)

            // No need to generate more pairs - just show results
            setComparisons(validComparisons)
            setShuffledPairs([]) // No more pairs to complete
            setCurrentPairIndex(0)
            setShowIntro(false) // Show results, not intro
          } else {
            // No data in database - show intro
            setShowIntro(true)
          }
        } catch (error) {
          logger.error("Failed to fetch data from database:", error)
          setShowIntro(true)
        } finally {
          setIsLoading(false)
          setInitialized(true)
        }
        return
      }

      // Not authenticated - check localStorage
      const pending = storage.getPendingWishocracy()
      if (pending && ((pending.shuffledPairs?.length ?? 0) > 0 || (pending.selectedCategories?.length ?? 0) > 0)) {
        try {
          // Restore selected categories if available
          if (pending.selectedCategories && pending.selectedCategories.length > 0) {
            const selectedCategoryIds = new Set<BudgetCategoryId>(
              pending.selectedCategories as BudgetCategoryId[]
            )
            setSelectedCategories(selectedCategoryIds)

            // Filter comparisons to only selected categories
            const validComparisons = filterValidComparisons<PendingWishocraticAllocation>(
              (pending.comparisons || []) as PendingWishocraticAllocation[],
              selectedCategoryIds
            )

            // If user has selected categories but no pairs yet, they just completed category selection
            if (!pending.shuffledPairs || pending.shuffledPairs.length === 0) {
              // Generate pairs from selected categories
              const allPossiblePairs = generateAllPairsFromCategories(selectedCategoryIds)
              const uncompletedPairs = filterCompletedPairs(allPossiblePairs, validComparisons)

              setComparisons(validComparisons)
              setShuffledPairs(uncompletedPairs)
              setCurrentPairIndex(0)
              setShowIntro(false)
            } else {
              // Filter pairs to only selected categories
              const validPairs = filterValidPairs(pending.shuffledPairs as Array<[string, string]>)

              setComparisons(validComparisons)
              setCurrentPairIndex(Math.min(pending.currentPairIndex || 0, validPairs.length))
              setShuffledPairs(validPairs)
              setShowIntro(false)
            }
          } else {
            // No category selection - using random pairs
            const validComparisons = filterValidComparisons<PendingWishocraticAllocation>(
              (pending.comparisons || []) as PendingWishocraticAllocation[]
            )
            const validPairs = filterValidPairs(pending.shuffledPairs as Array<[string, string]>)

            // Resume from localStorage with filtered data
            setComparisons(validComparisons)
            setCurrentPairIndex(Math.min(pending.currentPairIndex || 0, validPairs.length))
            setShuffledPairs(validPairs)
            setShowIntro(false)
          }
        } catch (error) {
          logger.error("Failed to restore wishocracy data, starting fresh:", error)
          storage.removePendingWishocracy()
          const randomPairs = generateRandomPairs(25)
          setShuffledPairs(randomPairs)
          setShowIntro(true)
        }
      } else {
        // No localStorage data - generate random pairs and show intro
        const randomPairs = generateRandomPairs(25)
        setShuffledPairs(randomPairs)
        setShowIntro(true)
      }

      setIsLoading(false)
      setInitialized(true)
    }

    initializeData()
  }, [status, session, initialized])


  const triggerConfetti = () => {
    const colors = ["#FF6B9D", "#00D9FF", "#FFE66D"]
    const count = 200
    const defaults = {
      origin: { y: 0.7 },
      colors: colors,
    }

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      })
    }

    fire(0.25, { spread: 26, startVelocity: 55 })
    fire(0.2, { spread: 60 })
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 })
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 })
    fire(0.1, { spread: 120, startVelocity: 45 })
  }

  const handlePairSubmit = async (allocationA: number, allocationB: number) => {
    if (!shuffledPairs[currentPairIndex]) return

    const currentPair = shuffledPairs[currentPairIndex]
    const newComparison = {
      categoryA: currentPair[0],
      categoryB: currentPair[1],
      allocationA,
      allocationB,
      timestamp: new Date().toISOString(),
    }

    const newComparisons = [...comparisons, newComparison]
    let newIndex = currentPairIndex + 1

    // If both allocations are 0, mark both categories as rejected
    let updatedRejectedCategories = rejectedCategories
    if (allocationA === 0 && allocationB === 0) {
      updatedRejectedCategories = new Set(rejectedCategories)
      updatedRejectedCategories.add(currentPair[0])
      updatedRejectedCategories.add(currentPair[1])
      setRejectedCategories(updatedRejectedCategories)
    }

    // Filter out remaining pairs that include rejected categories
    const filteredPairs = filterRejectedPairs(
      shuffledPairs.slice(newIndex),
      updatedRejectedCategories
    )

    // If authenticated, save to database immediately
    if (status === "authenticated" && session) {
      try {
        await fetch("/api/wishocracy/allocation", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            categoryA: newComparison.categoryA,
            categoryB: newComparison.categoryB,
            allocationA: newComparison.allocationA,
            allocationB: newComparison.allocationB,
          }),
        })
      } catch (error) {
        logger.error("Failed to save allocation:", error)
        // Continue anyway - we can retry later
      }
    } else {
      // Save to localStorage for unauthenticated users
      // All comparisons for unauthenticated users have timestamp field
      storage.setPendingWishocracy({
        comparisons: newComparisons as Array<{
          categoryA: string
          categoryB: string
          allocationA: number
          allocationB: number
          timestamp: string
        }>,
        currentPairIndex: 0, // Reset to 0 since we're using filteredPairs
        shuffledPairs: filteredPairs,
        selectedCategories: selectedCategories.size > 0 ? Array.from(selectedCategories) : undefined,
        startedAt: comparisons.length === 0 ? new Date().toISOString() : undefined,
      })
    }

    setComparisons(newComparisons)

    // Update shuffled pairs to filtered list and reset index
    if (filteredPairs.length > 0) {
      setShuffledPairs(filteredPairs)
      setCurrentPairIndex(0)
    } else {
      // If no more pairs
      if (selectedCategories.size > 0) {
        // User selected specific categories - don't generate new random pairs
        // They've completed all possible pairs for their selection
        setShuffledPairs([])
        setCurrentPairIndex(0)
      } else {
        // No category selection - generate random pairs from all categories
        const newRandomPairs = filterRejectedPairs(
          generateRandomPairs(25),
          updatedRejectedCategories
        )
        setShuffledPairs(newRandomPairs)
        setCurrentPairIndex(0)
      }
    }

    // Show auth prompt at milestones for unauthenticated users
    if (status !== "authenticated" && (newComparisons.length === 5 || newComparisons.length === 10 || newComparisons.length === 15)) {
      setShowAuthPrompt(true)
      // Scroll to auth card after animation
      setTimeout(() => {
        authCardRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
      }, 600)
    }
  }

  const handleReset = async () => {
    // Clear localStorage
    storage.removePendingWishocracy()

    // Clear database data for authenticated users
    if (status === "authenticated" && session) {
      try {
        // Delete category selections and allocations in parallel
        await Promise.all([
          fetch("/api/wishocracy/category-selections", {
            method: "DELETE"
          }),
          fetch("/api/wishocracy/allocations", {
            method: "DELETE"
          })
        ])
      } catch (error) {
        logger.error("Failed to clear wishocracy data:", error)
        // Continue anyway - data is cleared in state
      }
    }

    // Reset all state
    setComparisons([])
    setRejectedCategories(new Set())
    setSelectedCategories(new Set())
    setCurrentPairIndex(0)
    setShowIntro(true)
    setShowCategorySelection(false)
    setShowAuthPrompt(false)
    setInitialized(false) // Allow re-initialization

    // Generate fresh pairs
    const randomPairs = generateRandomPairs(25)
    setShuffledPairs(randomPairs)

    // Scroll to top of page
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCategorySelectionComplete = async (selected: Set<BudgetCategoryId>) => {
    setSelectedCategories(selected)
    setComparisons([]) // Clear previous comparisons when starting fresh

    // Generate pairs only from selected categories FIRST
    const pairs = generateAllPairsFromCategories(selected)

    // Shuffle the pairs using Fisher-Yates algorithm
    const shuffled = shufflePairs(pairs)
    setShuffledPairs(shuffled)
    setCurrentPairIndex(0)

    // THEN hide category selection (so pairs render with correct data)
    setShowCategorySelection(false)

    // Save selections to database if authenticated (can happen async in background)
    if (status === "authenticated" && session) {
      try {
        const allCategories = Object.keys(BUDGET_CATEGORIES) as BudgetCategoryId[]
        const selections = allCategories.map(categoryId => ({
          categoryId,
          selected: selected.has(categoryId)
        }))

        await fetch("/api/wishocracy/category-selections", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ selections })
        })
      } catch (error) {
        logger.error("Failed to save category selections:", error)
        // Continue anyway - selections are saved in state
      }
    } else {
      // Save to localStorage for unauthenticated users
      storage.setPendingWishocracy({
        comparisons: [],
        currentPairIndex: 0,
        shuffledPairs: shuffled,
        selectedCategories: Array.from(selected),
        startedAt: new Date().toISOString()
      })
    }
  }

  const handleEditSave = async (
    updatedComparisons: Array<{
      categoryA: string
      categoryB: string
      allocationA: number
      allocationB: number
    }>,
    updatedCategories: Set<BudgetCategoryId>,
    deletedCategories: Set<BudgetCategoryId>
  ) => {
    if (status !== "authenticated" || !session) {
      logger.warn("Cannot save edits: user not authenticated")
      return
    }

    try {
      // Update allocations and delete those involving deleted categories
      await fetch("/api/wishocracy/allocations", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          updatedComparisons,
          deletedCategories: Array.from(deletedCategories)
        })
      })

      // Update category selections
      const allCategories = Object.keys(BUDGET_CATEGORIES) as BudgetCategoryId[]
      const selections = allCategories.map(categoryId => ({
        categoryId,
        selected: updatedCategories.has(categoryId)
      }))

      await fetch("/api/wishocracy/category-selections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ selections })
      })

      // Update local state
      setComparisons(updatedComparisons as PendingWishocraticAllocation[])
      setSelectedCategories(updatedCategories)

      // If user selected specific categories, regenerate pairs from updated selections
      if (updatedCategories.size > 0) {
        const allPossiblePairs = generateAllPairsFromCategories(updatedCategories)
        const uncompletedPairs = filterCompletedPairs(allPossiblePairs, updatedComparisons as PendingWishocraticAllocation[])
        setShuffledPairs(uncompletedPairs)
        setCurrentPairIndex(0)
      }
    } catch (error) {
      logger.error("Failed to save edits:", error)
      throw error // Re-throw so component can show error
    }
  }

  return {
    state: {
      currentPairIndex,
      comparisons,
      shuffledPairs,
      showIntro,
      showCategorySelection,
      showAuthPrompt,
      isLoading,
      selectedCategories,
      rejectedCategories,
      totalPossiblePairs,
      session,
      status,
      searchParams,
      authCardRef,
    },
    handlers: {
      handlePairSubmit,
      handleReset,
      handleCategorySelectionComplete,
      handleEditSave,
      setShowIntro,
      setShowCategorySelection,
      setShowAuthPrompt,
    },
  }
}
