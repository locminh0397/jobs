/*
  Warnings:

  - You are about to drop the column `email` on the `Company` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_name]` on the table `Company` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_name` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Company_email_key";

-- AlterTable
ALTER TABLE "Company" DROP COLUMN "email",
ADD COLUMN     "user_name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Company_user_name_key" ON "Company"("user_name");
