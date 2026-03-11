-- CreateEnum
CREATE TYPE "CampaignType" AS ENUM ('DONATION', 'REWARD', 'EQUITY', 'PRE_ORDER');

-- CreateEnum
CREATE TYPE "CampaignStatus" AS ENUM ('DRAFT', 'ACTIVE', 'FUNDED', 'CANCELLED', 'FAILED', 'COMPLETED');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "FulfillmentStatus" AS ENUM ('PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'DELAYED');

-- CreateEnum
CREATE TYPE "ShippingStatus" AS ENUM ('PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'RETURNED', 'LOST');

-- CreateEnum
CREATE TYPE "TeamMemberRole" AS ENUM ('CREATOR', 'CO_CREATOR', 'MANAGER', 'VIEWER');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "ActivityType" ADD VALUE 'CAMPAIGN_CREATED';
ALTER TYPE "ActivityType" ADD VALUE 'CAMPAIGN_PLEDGED';
ALTER TYPE "ActivityType" ADD VALUE 'CAMPAIGN_UPDATED';
ALTER TYPE "ActivityType" ADD VALUE 'CAMPAIGN_COMPLETED';

-- AlterEnum
ALTER TYPE "CommentableType" ADD VALUE 'CAMPAIGN';

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "NotificationType" ADD VALUE 'CAMPAIGN_PLEDGE_RECEIVED';
ALTER TYPE "NotificationType" ADD VALUE 'CAMPAIGN_FUNDED';
ALTER TYPE "NotificationType" ADD VALUE 'CAMPAIGN_UPDATE_POSTED';
ALTER TYPE "NotificationType" ADD VALUE 'CAMPAIGN_REWARD_SHIPPED';
ALTER TYPE "NotificationType" ADD VALUE 'CAMPAIGN_ENDING_SOON';
ALTER TYPE "NotificationType" ADD VALUE 'PLEDGE_REFUNDED';

-- CreateTable
CREATE TABLE "Campaign" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "story" TEXT NOT NULL,
    "type" "CampaignType" NOT NULL,
    "creatorId" TEXT NOT NULL,
    "organizationId" TEXT,
    "goalAmount" INTEGER NOT NULL,
    "currentAmount" INTEGER NOT NULL DEFAULT 0,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3),
    "status" "CampaignStatus" NOT NULL DEFAULT 'DRAFT',
    "videoUrl" TEXT,
    "coverImageUrl" TEXT,
    "images" TEXT,
    "category" TEXT NOT NULL,
    "tags" TEXT,
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "backerCount" INTEGER NOT NULL DEFAULT 0,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "trending" BOOLEAN NOT NULL DEFAULT false,
    "refundPolicy" TEXT NOT NULL,
    "riskDisclosure" TEXT NOT NULL,
    "processingFeePercentage" DOUBLE PRECISION NOT NULL DEFAULT 5.0,
    "complianceData" TEXT,
    "flexibleFunding" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Campaign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CampaignReward" (
    "id" TEXT NOT NULL,
    "campaignId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "estimatedDelivery" TIMESTAMP(3),
    "shippingEnabled" BOOLEAN NOT NULL DEFAULT true,
    "shippingFee" INTEGER NOT NULL DEFAULT 0,
    "shippingRegions" TEXT,
    "maxBackers" INTEGER,
    "currentBackers" INTEGER NOT NULL DEFAULT 0,
    "unlimited" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "digital" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CampaignReward_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CampaignPledge" (
    "id" TEXT NOT NULL,
    "campaignId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "rewardId" TEXT,
    "amount" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "stripePaymentIntentId" TEXT,
    "stripeSubscriptionId" TEXT,
    "shippingAddress" TEXT,
    "shippingStatus" "ShippingStatus" NOT NULL DEFAULT 'PENDING',
    "trackingNumber" TEXT,
    "deliveryDate" TIMESTAMP(3),
    "fulfillmentStatus" "FulfillmentStatus" NOT NULL DEFAULT 'PENDING',
    "fulfillmentNotes" TEXT,
    "isRecurring" BOOLEAN NOT NULL DEFAULT false,
    "isAnonymous" BOOLEAN NOT NULL DEFAULT false,
    "refundedAt" TIMESTAMP(3),
    "refundReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CampaignPledge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CampaignStretchGoal" (
    "id" TEXT NOT NULL,
    "campaignId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "targetAmount" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "achieved" BOOLEAN NOT NULL DEFAULT false,
    "achievedAt" TIMESTAMP(3),
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CampaignStretchGoal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CampaignTeamMember" (
    "id" TEXT NOT NULL,
    "campaignId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" "TeamMemberRole" NOT NULL,
    "permissions" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CampaignTeamMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CampaignUpdate" (
    "id" TEXT NOT NULL,
    "campaignId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CampaignUpdate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Campaign_slug_key" ON "Campaign"("slug");

-- CreateIndex
CREATE INDEX "Campaign_creatorId_idx" ON "Campaign"("creatorId");

-- CreateIndex
CREATE INDEX "Campaign_organizationId_idx" ON "Campaign"("organizationId");

-- CreateIndex
CREATE INDEX "Campaign_slug_idx" ON "Campaign"("slug");

-- CreateIndex
CREATE INDEX "Campaign_status_idx" ON "Campaign"("status");

-- CreateIndex
CREATE INDEX "Campaign_type_idx" ON "Campaign"("type");

-- CreateIndex
CREATE INDEX "Campaign_category_idx" ON "Campaign"("category");

-- CreateIndex
CREATE INDEX "Campaign_featured_idx" ON "Campaign"("featured");

-- CreateIndex
CREATE INDEX "Campaign_trending_idx" ON "Campaign"("trending");

-- CreateIndex
CREATE INDEX "Campaign_endDate_idx" ON "Campaign"("endDate");

-- CreateIndex
CREATE INDEX "Campaign_createdAt_idx" ON "Campaign"("createdAt");

-- CreateIndex
CREATE INDEX "Campaign_deletedAt_idx" ON "Campaign"("deletedAt");

-- CreateIndex
CREATE INDEX "CampaignReward_campaignId_idx" ON "CampaignReward"("campaignId");

-- CreateIndex
CREATE INDEX "CampaignReward_isActive_idx" ON "CampaignReward"("isActive");

-- CreateIndex
CREATE INDEX "CampaignReward_createdAt_idx" ON "CampaignReward"("createdAt");

-- CreateIndex
CREATE INDEX "CampaignPledge_campaignId_idx" ON "CampaignPledge"("campaignId");

-- CreateIndex
CREATE INDEX "CampaignPledge_userId_idx" ON "CampaignPledge"("userId");

-- CreateIndex
CREATE INDEX "CampaignPledge_rewardId_idx" ON "CampaignPledge"("rewardId");

-- CreateIndex
CREATE INDEX "CampaignPledge_paymentStatus_idx" ON "CampaignPledge"("paymentStatus");

-- CreateIndex
CREATE INDEX "CampaignPledge_fulfillmentStatus_idx" ON "CampaignPledge"("fulfillmentStatus");

-- CreateIndex
CREATE INDEX "CampaignPledge_shippingStatus_idx" ON "CampaignPledge"("shippingStatus");

-- CreateIndex
CREATE INDEX "CampaignPledge_createdAt_idx" ON "CampaignPledge"("createdAt");

-- CreateIndex
CREATE INDEX "CampaignStretchGoal_campaignId_idx" ON "CampaignStretchGoal"("campaignId");

-- CreateIndex
CREATE INDEX "CampaignStretchGoal_achieved_idx" ON "CampaignStretchGoal"("achieved");

-- CreateIndex
CREATE INDEX "CampaignStretchGoal_order_idx" ON "CampaignStretchGoal"("order");

-- CreateIndex
CREATE INDEX "CampaignStretchGoal_createdAt_idx" ON "CampaignStretchGoal"("createdAt");

-- CreateIndex
CREATE INDEX "CampaignTeamMember_campaignId_idx" ON "CampaignTeamMember"("campaignId");

-- CreateIndex
CREATE INDEX "CampaignTeamMember_userId_idx" ON "CampaignTeamMember"("userId");

-- CreateIndex
CREATE INDEX "CampaignTeamMember_role_idx" ON "CampaignTeamMember"("role");

-- CreateIndex
CREATE INDEX "CampaignTeamMember_createdAt_idx" ON "CampaignTeamMember"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "CampaignTeamMember_campaignId_userId_key" ON "CampaignTeamMember"("campaignId", "userId");

-- CreateIndex
CREATE INDEX "CampaignUpdate_campaignId_idx" ON "CampaignUpdate"("campaignId");

-- CreateIndex
CREATE INDEX "CampaignUpdate_authorId_idx" ON "CampaignUpdate"("authorId");

-- CreateIndex
CREATE INDEX "CampaignUpdate_isPublic_idx" ON "CampaignUpdate"("isPublic");

-- CreateIndex
CREATE INDEX "CampaignUpdate_createdAt_idx" ON "CampaignUpdate"("createdAt");

-- AddForeignKey
ALTER TABLE "Campaign" ADD CONSTRAINT "Campaign_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Campaign" ADD CONSTRAINT "Campaign_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CampaignReward" ADD CONSTRAINT "CampaignReward_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CampaignPledge" ADD CONSTRAINT "CampaignPledge_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CampaignPledge" ADD CONSTRAINT "CampaignPledge_rewardId_fkey" FOREIGN KEY ("rewardId") REFERENCES "CampaignReward"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CampaignPledge" ADD CONSTRAINT "CampaignPledge_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CampaignStretchGoal" ADD CONSTRAINT "CampaignStretchGoal_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CampaignTeamMember" ADD CONSTRAINT "CampaignTeamMember_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CampaignTeamMember" ADD CONSTRAINT "CampaignTeamMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CampaignUpdate" ADD CONSTRAINT "CampaignUpdate_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CampaignUpdate" ADD CONSTRAINT "CampaignUpdate_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;
