-- CreateTable
CREATE TABLE "WishocraticAllocation" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "categoryA" TEXT NOT NULL,
    "categoryB" TEXT NOT NULL,
    "allocationA" INTEGER NOT NULL,
    "allocationB" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WishocraticAllocation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "WishocraticAllocation_userId_idx" ON "WishocraticAllocation"("userId");

-- CreateIndex
CREATE INDEX "WishocraticAllocation_categoryA_idx" ON "WishocraticAllocation"("categoryA");

-- CreateIndex
CREATE INDEX "WishocraticAllocation_categoryB_idx" ON "WishocraticAllocation"("categoryB");

-- CreateIndex
CREATE INDEX "WishocraticAllocation_createdAt_idx" ON "WishocraticAllocation"("createdAt");

-- AddForeignKey
ALTER TABLE "WishocraticAllocation" ADD CONSTRAINT "WishocraticAllocation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AlterEnum
ALTER TYPE "ActivityType" ADD VALUE 'COMPLETED_WISHOCRATIC_ALLOCATION';
