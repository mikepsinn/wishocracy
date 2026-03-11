-- Remove duplicate allocations, keeping only the most recent one per (userId, categoryA, categoryB)
-- This handles both exact duplicates and reversed pairs (A,B) vs (B,A)

DELETE FROM "WishocraticAllocation"
WHERE id IN (
  SELECT wa1.id
  FROM "WishocraticAllocation" wa1
  INNER JOIN "WishocraticAllocation" wa2 ON (
    wa1."userId" = wa2."userId"
    AND (
      -- Exact duplicates
      (wa1."categoryA" = wa2."categoryA" AND wa1."categoryB" = wa2."categoryB")
      OR
      -- Reversed pairs (normalize alphabetically)
      (
        LEAST(wa1."categoryA", wa1."categoryB") = LEAST(wa2."categoryA", wa2."categoryB")
        AND
        GREATEST(wa1."categoryA", wa1."categoryB") = GREATEST(wa2."categoryA", wa2."categoryB")
      )
    )
    -- Keep only the most recent one
    AND (
      wa1."createdAt" < wa2."createdAt"
      OR (wa1."createdAt" = wa2."createdAt" AND wa1.id < wa2.id)
    )
  )
);

-- Normalize existing records: ensure categoryA < categoryB alphabetically
UPDATE "WishocraticAllocation"
SET
  "categoryA" = "categoryB",
  "categoryB" = "categoryA",
  "allocationA" = "allocationB",
  "allocationB" = "allocationA"
WHERE "categoryA" > "categoryB";

-- Add unique constraint to prevent future duplicates
CREATE UNIQUE INDEX "WishocraticAllocation_userId_categoryA_categoryB_key"
ON "WishocraticAllocation"("userId", "categoryA", "categoryB");
