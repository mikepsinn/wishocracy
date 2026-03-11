/*
  Warnings:

  - A unique constraint covering the columns `[userId,type]` on the table `Badge` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Badge_userId_type_key" ON "Badge"("userId", "type");
