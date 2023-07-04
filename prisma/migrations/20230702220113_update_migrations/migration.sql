-- AlterTable
ALTER TABLE "notifications" ADD COLUMN     "categoryNotificationsId" TEXT;

-- AlterTable
ALTER TABLE "servicesMonthlys" ADD COLUMN     "fee" BOOLEAN DEFAULT false;

-- CreateTable
CREATE TABLE "categoryNotifications" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "removed" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "categoryNotifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tuitionPayments" (
    "id" TEXT NOT NULL,
    "studentsId" TEXT NOT NULL,
    "servicesMonthlysId" TEXT NOT NULL,
    "organizationsId" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "month" INTEGER NOT NULL,
    "status" "Status" DEFAULT 'PENDING',
    "removed" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tuitionPayments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messagesSMS" (
    "id" TEXT NOT NULL,
    "organizationsId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "numbers" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "messagesSMS_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AcademicYears" (
    "id" TEXT NOT NULL,
    "organizationsId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AcademicYears_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_categoryNotificationsId_fkey" FOREIGN KEY ("categoryNotificationsId") REFERENCES "categoryNotifications"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tuitionPayments" ADD CONSTRAINT "tuitionPayments_studentsId_fkey" FOREIGN KEY ("studentsId") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tuitionPayments" ADD CONSTRAINT "tuitionPayments_organizationsId_fkey" FOREIGN KEY ("organizationsId") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tuitionPayments" ADD CONSTRAINT "tuitionPayments_servicesMonthlysId_fkey" FOREIGN KEY ("servicesMonthlysId") REFERENCES "servicesMonthlys"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_organizationsId_fkey" FOREIGN KEY ("organizationsId") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AcademicYears" ADD CONSTRAINT "AcademicYears_organizationsId_fkey" FOREIGN KEY ("organizationsId") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
