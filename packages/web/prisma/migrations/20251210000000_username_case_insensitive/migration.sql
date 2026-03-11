-- Make username unique constraint case-insensitive (allow "MikeSinn" but prevent "mikesinn" duplicate)
-- Drop the existing case-sensitive unique constraint
ALTER TABLE "User" DROP CONSTRAINT IF EXISTS "User_username_key";

-- Drop the existing unique index if it exists
DROP INDEX IF EXISTS "User_username_key";

-- Create a case-insensitive unique index on lowercase username
-- This allows users to type "MikeSinn" but prevents "mikesinn" and "MikeSinn" from both existing
CREATE UNIQUE INDEX "User_username_key" ON "User" (LOWER("username")) WHERE "username" IS NOT NULL;
