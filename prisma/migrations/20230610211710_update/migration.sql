/*
  Warnings:

  - You are about to drop the column `packageId` on the `licenses` table. All the data in the column will be lost.
  - Added the required column `packagesId` to the `licenses` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "licenses" DROP CONSTRAINT "licenses_packageId_fkey";

-- AlterTable
ALTER TABLE "licenses" DROP COLUMN "packageId",
ADD COLUMN     "packagesId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "licenses" ADD CONSTRAINT "licenses_packagesId_fkey" FOREIGN KEY ("packagesId") REFERENCES "packages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
