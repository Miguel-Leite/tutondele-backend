-- CreateTable
CREATE TABLE "paymentServices" (
    "id" TEXT NOT NULL,
    "servicesId" TEXT NOT NULL,
    "studentsId" TEXT NOT NULL,
    "organizationsId" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "status" "Status" DEFAULT 'PENDING',
    "removed" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "paymentServices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payments" (
    "id" TEXT NOT NULL,
    "organizationsId" TEXT NOT NULL,
    "paymentsId" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "removed" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "payments_organizationsId_idx" ON "payments"("organizationsId");

-- CreateIndex
CREATE INDEX "payments_paymentsId_idx" ON "payments"("paymentsId");

-- AddForeignKey
ALTER TABLE "paymentServices" ADD CONSTRAINT "paymentServices_servicesId_fkey" FOREIGN KEY ("servicesId") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paymentServices" ADD CONSTRAINT "paymentServices_studentsId_fkey" FOREIGN KEY ("studentsId") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paymentServices" ADD CONSTRAINT "paymentServices_organizationsId_fkey" FOREIGN KEY ("organizationsId") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
