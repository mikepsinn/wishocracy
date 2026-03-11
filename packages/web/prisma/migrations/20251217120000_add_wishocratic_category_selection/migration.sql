-- CreateTable
CREATE TABLE "WishocraticCategorySelection" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "selected" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WishocraticCategorySelection_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "WishocraticCategorySelection_userId_idx" ON "WishocraticCategorySelection"("userId");

-- CreateIndex
CREATE INDEX "WishocraticCategorySelection_categoryId_idx" ON "WishocraticCategorySelection"("categoryId");

-- CreateIndex
CREATE INDEX "WishocraticCategorySelection_selected_idx" ON "WishocraticCategorySelection"("selected");

-- CreateIndex
CREATE UNIQUE INDEX "WishocraticCategorySelection_userId_categoryId_key" ON "WishocraticCategorySelection"("userId", "categoryId");

-- AddForeignKey
ALTER TABLE "WishocraticCategorySelection" ADD CONSTRAINT "WishocraticCategorySelection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
