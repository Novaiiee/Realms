/*
  Warnings:

  - You are about to drop the `Ownership` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[provider,providerAccountId]` on the table `Account` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Community" DROP CONSTRAINT "Community_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "Ownership" DROP CONSTRAINT "Ownership_userId_fkey";

-- DropIndex
DROP INDEX "Account_providerAccountId_key";

-- DropIndex
DROP INDEX "Account_provider_key";

-- DropTable
DROP TABLE "Ownership";

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");
