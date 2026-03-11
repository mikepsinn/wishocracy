-- CreateEnum
CREATE TYPE "OrgCategory" AS ENUM ('UNIVERSITY', 'RESEARCH_CENTER', 'CLINICAL_NETWORK', 'HOSPITAL', 'NONPROFIT', 'DAO', 'ADVOCACY', 'REGISTRY', 'GOVERNMENT', 'BIOTECH', 'LAB', 'OTHER');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "EmailType" ADD VALUE 'WELCOME_IMPACT';
ALTER TYPE "EmailType" ADD VALUE 'SOCIAL_PROOF';
ALTER TYPE "EmailType" ADD VALUE 'REFERRAL_MOTIVATION';
ALTER TYPE "EmailType" ADD VALUE 'ACTIVATION_NUDGE';
ALTER TYPE "EmailType" ADD VALUE 'CAMPAIGN_PLEDGE_CONFIRMATION';
ALTER TYPE "EmailType" ADD VALUE 'CAMPAIGN_PLEDGE_RECEIVED';
ALTER TYPE "EmailType" ADD VALUE 'CAMPAIGN_UPDATE_POSTED';
ALTER TYPE "EmailType" ADD VALUE 'CAMPAIGN_FUNDED';
ALTER TYPE "EmailType" ADD VALUE 'CAMPAIGN_ENDING_SOON';
ALTER TYPE "EmailType" ADD VALUE 'CAMPAIGN_COMPLETED';
ALTER TYPE "EmailType" ADD VALUE 'REWARD_SHIPPED';
ALTER TYPE "EmailType" ADD VALUE 'PARTNER_APPROVAL';
ALTER TYPE "EmailType" ADD VALUE 'PARTNER_REJECTION';

-- AlterTable
ALTER TABLE "Organization" DROP COLUMN "category",
ADD COLUMN     "category" "OrgCategory" NOT NULL;

-- CreateIndex
CREATE INDEX "Organization_category_idx" ON "Organization"("category");
