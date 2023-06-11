/*
  Warnings:

  - You are about to drop the column `categoriesId` on the `services` table. All the data in the column will be lost.
  - You are about to drop the column `is_active` on the `services` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "services" DROP CONSTRAINT "services_categoriesId_fkey";

-- DropIndex
DROP INDEX "services_categoriesId_idx";

-- AlterTable
ALTER TABLE "services" DROP COLUMN "categoriesId",
DROP COLUMN "is_active";

-- CreateTable
CREATE TABLE "PaymentServicesMonthlys" (
    "id" TEXT NOT NULL,
    "servicesMonthlysId" TEXT NOT NULL,
    "studentsId" TEXT NOT NULL,
    "organizationsId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "reference" TEXT NOT NULL,
    "iban" TEXT NOT NULL,
    "account_number" TEXT NOT NULL,
    "removed" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PaymentServicesMonthlys_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PaymentServicesMonthlys" ADD CONSTRAINT "PaymentServicesMonthlys_servicesMonthlysId_fkey" FOREIGN KEY ("servicesMonthlysId") REFERENCES "servicesMonthlys"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentServicesMonthlys" ADD CONSTRAINT "PaymentServicesMonthlys_studentsId_fkey" FOREIGN KEY ("studentsId") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentServicesMonthlys" ADD CONSTRAINT "PaymentServicesMonthlys_organizationsId_fkey" FOREIGN KEY ("organizationsId") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
