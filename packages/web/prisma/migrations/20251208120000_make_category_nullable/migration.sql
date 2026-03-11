-- AlterTable: Make category nullable on Organization
ALTER TABLE "Organization" ALTER COLUMN "category" DROP NOT NULL;
