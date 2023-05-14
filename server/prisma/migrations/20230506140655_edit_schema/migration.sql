/*
  Warnings:

  - You are about to drop the column `created_at` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the `Employee` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `Company` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hash` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_company_id_fkey";

-- AlterTable
ALTER TABLE "Company" DROP COLUMN "created_at",
DROP COLUMN "updated_at",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "hash" TEXT NOT NULL,
ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'EMPLOYER';

-- DropTable
DROP TABLE "Employee";

-- CreateIndex
CREATE UNIQUE INDEX "Company_email_key" ON "Company"("email");
