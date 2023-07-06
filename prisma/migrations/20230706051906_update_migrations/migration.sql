/*
  Warnings:

  - You are about to drop the `AcademicYears` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `code` to the `paymentServices` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AcademicYears" DROP CONSTRAINT "AcademicYears_organizationsId_fkey";

-- AlterTable
ALTER TABLE "paymentServices" ADD COLUMN     "code" TEXT NOT NULL;

-- DropTable
DROP TABLE "AcademicYears";

-- CreateTable
CREATE TABLE "academicYears" (
    "id" TEXT NOT NULL,
    "organizationsId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "academicYears_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "academicYears" ADD CONSTRAINT "academicYears_organizationsId_fkey" FOREIGN KEY ("organizationsId") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
