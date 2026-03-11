-- AlterTable
ALTER TABLE "Organization" ADD COLUMN     "creatorId" TEXT;

-- AlterTable
ALTER TABLE "Vote" ADD COLUMN     "organizationId" TEXT;

-- CreateIndex
CREATE INDEX "Organization_creatorId_idx" ON "Organization"("creatorId");

-- CreateIndex
CREATE INDEX "Vote_organizationId_idx" ON "Vote"("organizationId");

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
