/*
  Warnings:

  - You are about to drop the `PaymentServicesMonthlys` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('CANCELED', 'PENDING', 'APPROVED');

-- DropForeignKey
ALTER TABLE "PaymentServicesMonthlys" DROP CONSTRAINT "PaymentServicesMonthlys_organizationsId_fkey";

-- DropForeignKey
ALTER TABLE "PaymentServicesMonthlys" DROP CONSTRAINT "PaymentServicesMonthlys_servicesMonthlysId_fkey";

-- DropForeignKey
ALTER TABLE "PaymentServicesMonthlys" DROP CONSTRAINT "PaymentServicesMonthlys_studentsId_fkey";

-- DropTable
DROP TABLE "PaymentServicesMonthlys";

-- CreateTable
CREATE TABLE "paymentServicesMonthlys" (
    "id" TEXT NOT NULL,
    "servicesMonthlysId" TEXT NOT NULL,
    "studentsId" TEXT NOT NULL,
    "organizationsId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "reference" TEXT NOT NULL,
    "iban" TEXT NOT NULL,
    "account_number" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'PENDING',
    "removed" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "paymentServicesMonthlys_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "paymentServicesMonthlys" ADD CONSTRAINT "paymentServicesMonthlys_servicesMonthlysId_fkey" FOREIGN KEY ("servicesMonthlysId") REFERENCES "servicesMonthlys"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paymentServicesMonthlys" ADD CONSTRAINT "paymentServicesMonthlys_studentsId_fkey" FOREIGN KEY ("studentsId") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paymentServicesMonthlys" ADD CONSTRAINT "paymentServicesMonthlys_organizationsId_fkey" FOREIGN KEY ("organizationsId") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
