-- CreateEnum
CREATE TYPE "Instruction" AS ENUM ('PRIMARY', 'SECONDARY', 'TECHNICAL', 'PUNISHABLE', 'TECHNICAL_END_PUNISHABLE');

-- CreateTable
CREATE TABLE "avatars" (
    "id" TEXT NOT NULL,
    "url" TEXT,
    "filename" TEXT,
    "mimetype" TEXT DEFAULT 'image/jpeg',
    "encoding" TEXT DEFAULT '7bit',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "avatars_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "persons" (
    "id" TEXT NOT NULL,
    "addressesId" TEXT,
    "avatarsId" TEXT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "bi" TEXT,
    "removed" TIMESTAMP(3),
    "phone" TEXT,
    "email" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "persons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "addresses" (
    "id" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customers" (
    "id" TEXT NOT NULL,
    "personsId" TEXT NOT NULL,
    "organizationsId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "level" TEXT DEFAULT 'EMPLOYEE',
    "verified" BOOLEAN DEFAULT false,
    "acceptTermsAndConditions" BOOLEAN DEFAULT true,
    "removed" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "personsId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "level" TEXT DEFAULT 'EMPLOYEE',
    "verified" BOOLEAN DEFAULT false,
    "acceptTermsAndConditions" BOOLEAN DEFAULT true,
    "removed" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usersTokens" (
    "id" TEXT NOT NULL,
    "usersId" TEXT NOT NULL,
    "refresh_token" TEXT NOT NULL,
    "expires_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usersTokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "logos" (
    "id" TEXT NOT NULL,
    "url" TEXT,
    "filename" TEXT,
    "mimetype" TEXT DEFAULT 'image/jpeg',
    "encoding" TEXT DEFAULT '7bit',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "logos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organizations" (
    "id" TEXT NOT NULL,
    "licensesId" TEXT NOT NULL,
    "logosId" TEXT,
    "addressesId" TEXT NOT NULL,
    "contactsId" TEXT NOT NULL,
    "calendarysId" TEXT,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "birth" TIMESTAMP(3),
    "instruction" "Instruction" NOT NULL DEFAULT 'TECHNICAL',
    "about" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT false,
    "removed" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "organizations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contacts" (
    "id" TEXT NOT NULL,
    "primaryPhone" TEXT NOT NULL,
    "secundaryPhone" TEXT,
    "primaryEmail" TEXT NOT NULL,
    "secundaryEmail" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contacts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "courses" (
    "id" TEXT NOT NULL,
    "organizationsId" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT false,
    "is_used" BOOLEAN DEFAULT false,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "removed" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "courses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rooms" (
    "id" TEXT NOT NULL,
    "organizationsId" TEXT NOT NULL,
    "coursesId" TEXT NOT NULL,
    "number" DOUBLE PRECISION NOT NULL,
    "group" TEXT NOT NULL,
    "level" DOUBLE PRECISION NOT NULL,
    "period" TEXT NOT NULL,
    "studentsLimit" DOUBLE PRECISION DEFAULT 30,
    "removed" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "rooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "organizationsId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "removed" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "services" (
    "id" TEXT NOT NULL,
    "organizationsId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "description" TEXT,
    "removed" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "servicesMonthlys" (
    "id" TEXT NOT NULL,
    "organizationsId" TEXT NOT NULL,
    "service" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "removed" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "servicesMonthlys_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "calendarys" (
    "id" TEXT NOT NULL,
    "date_start" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_end" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_active" BOOLEAN NOT NULL DEFAULT false,
    "removed" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "calendarys_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documents" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "mimetype" TEXT NOT NULL,
    "encoding" TEXT NOT NULL,
    "removed" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inCharges" (
    "id" TEXT NOT NULL,
    "organizationsId" TEXT NOT NULL,
    "personsId" TEXT NOT NULL,
    "customersId" TEXT,
    "removed" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "inCharges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "students" (
    "id" TEXT NOT NULL,
    "organizationsId" TEXT NOT NULL,
    "personsId" TEXT NOT NULL,
    "customersId" TEXT,
    "roomsId" TEXT NOT NULL,
    "removed" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "students_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "studentsHasInCharges" (
    "id" TEXT NOT NULL,
    "studentsId" TEXT NOT NULL,
    "inChargesId" TEXT NOT NULL,

    CONSTRAINT "studentsHasInCharges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "readAt" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notificationsHasOrganizations" (
    "id" TEXT NOT NULL,
    "organizationsId" TEXT NOT NULL,
    "notificationsId" TEXT NOT NULL,

    CONSTRAINT "notificationsHasOrganizations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "alerts" (
    "id" TEXT NOT NULL,
    "organizationsId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "open" BOOLEAN NOT NULL,
    "removed" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "alerts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "packages" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "students" INTEGER NOT NULL,
    "admins" INTEGER NOT NULL,
    "users" INTEGER NOT NULL,
    "services" INTEGER NOT NULL,
    "removed" TIMESTAMP(3),
    "notification_email" BOOLEAN NOT NULL DEFAULT true,
    "notification_sms" BOOLEAN NOT NULL DEFAULT false,
    "manual_payment" BOOLEAN NOT NULL DEFAULT true,
    "realtime_payment" BOOLEAN NOT NULL DEFAULT false,
    "security" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "packages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "licenses" (
    "id" TEXT NOT NULL,
    "packagesId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "removed" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "licenses_pkey" PRIMARY KEY ("id")
);

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

-- CreateIndex
CREATE UNIQUE INDEX "persons_email_key" ON "persons"("email");

-- CreateIndex
CREATE INDEX "persons_addressesId_idx" ON "persons"("addressesId");

-- CreateIndex
CREATE INDEX "persons_avatarsId_idx" ON "persons"("avatarsId");

-- CreateIndex
CREATE UNIQUE INDEX "customers_personsId_key" ON "customers"("personsId");

-- CreateIndex
CREATE UNIQUE INDEX "customers_username_key" ON "customers"("username");

-- CreateIndex
CREATE INDEX "customers_personsId_idx" ON "customers"("personsId");

-- CreateIndex
CREATE INDEX "customers_organizationsId_idx" ON "customers"("organizationsId");

-- CreateIndex
CREATE UNIQUE INDEX "users_personsId_key" ON "users"("personsId");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE INDEX "users_personsId_idx" ON "users"("personsId");

-- CreateIndex
CREATE INDEX "usersTokens_usersId_idx" ON "usersTokens"("usersId");

-- CreateIndex
CREATE INDEX "organizations_addressesId_idx" ON "organizations"("addressesId");

-- CreateIndex
CREATE INDEX "organizations_contactsId_idx" ON "organizations"("contactsId");

-- CreateIndex
CREATE INDEX "organizations_logosId_idx" ON "organizations"("logosId");

-- CreateIndex
CREATE INDEX "organizations_calendarysId_idx" ON "organizations"("calendarysId");

-- CreateIndex
CREATE INDEX "organizations_licensesId_idx" ON "organizations"("licensesId");

-- CreateIndex
CREATE INDEX "courses_organizationsId_idx" ON "courses"("organizationsId");

-- CreateIndex
CREATE INDEX "rooms_organizationsId_idx" ON "rooms"("organizationsId");

-- CreateIndex
CREATE INDEX "rooms_coursesId_idx" ON "rooms"("coursesId");

-- CreateIndex
CREATE INDEX "categories_organizationsId_idx" ON "categories"("organizationsId");

-- CreateIndex
CREATE INDEX "services_organizationsId_idx" ON "services"("organizationsId");

-- CreateIndex
CREATE INDEX "servicesMonthlys_organizationsId_idx" ON "servicesMonthlys"("organizationsId");

-- CreateIndex
CREATE INDEX "inCharges_organizationsId_idx" ON "inCharges"("organizationsId");

-- CreateIndex
CREATE INDEX "inCharges_personsId_idx" ON "inCharges"("personsId");

-- CreateIndex
CREATE INDEX "inCharges_customersId_idx" ON "inCharges"("customersId");

-- CreateIndex
CREATE INDEX "students_organizationsId_idx" ON "students"("organizationsId");

-- CreateIndex
CREATE INDEX "students_personsId_idx" ON "students"("personsId");

-- CreateIndex
CREATE INDEX "students_customersId_idx" ON "students"("customersId");

-- CreateIndex
CREATE INDEX "students_roomsId_idx" ON "students"("roomsId");

-- CreateIndex
CREATE INDEX "studentsHasInCharges_studentsId_idx" ON "studentsHasInCharges"("studentsId");

-- CreateIndex
CREATE INDEX "studentsHasInCharges_inChargesId_idx" ON "studentsHasInCharges"("inChargesId");

-- CreateIndex
CREATE INDEX "notificationsHasOrganizations_organizationsId_idx" ON "notificationsHasOrganizations"("organizationsId");

-- CreateIndex
CREATE INDEX "notificationsHasOrganizations_notificationsId_idx" ON "notificationsHasOrganizations"("notificationsId");

-- CreateIndex
CREATE UNIQUE INDEX "packages_name_key" ON "packages"("name");

-- CreateIndex
CREATE UNIQUE INDEX "licenses_code_key" ON "licenses"("code");

-- AddForeignKey
ALTER TABLE "persons" ADD CONSTRAINT "persons_avatarsId_fkey" FOREIGN KEY ("avatarsId") REFERENCES "avatars"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "persons" ADD CONSTRAINT "persons_addressesId_fkey" FOREIGN KEY ("addressesId") REFERENCES "addresses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customers" ADD CONSTRAINT "customers_personsId_fkey" FOREIGN KEY ("personsId") REFERENCES "persons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customers" ADD CONSTRAINT "customers_organizationsId_fkey" FOREIGN KEY ("organizationsId") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_personsId_fkey" FOREIGN KEY ("personsId") REFERENCES "persons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organizations" ADD CONSTRAINT "organizations_addressesId_fkey" FOREIGN KEY ("addressesId") REFERENCES "addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organizations" ADD CONSTRAINT "organizations_logosId_fkey" FOREIGN KEY ("logosId") REFERENCES "logos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organizations" ADD CONSTRAINT "organizations_contactsId_fkey" FOREIGN KEY ("contactsId") REFERENCES "contacts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organizations" ADD CONSTRAINT "organizations_licensesId_fkey" FOREIGN KEY ("licensesId") REFERENCES "licenses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_organizationsId_fkey" FOREIGN KEY ("organizationsId") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rooms" ADD CONSTRAINT "rooms_coursesId_fkey" FOREIGN KEY ("coursesId") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rooms" ADD CONSTRAINT "rooms_organizationsId_fkey" FOREIGN KEY ("organizationsId") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_organizationsId_fkey" FOREIGN KEY ("organizationsId") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "services" ADD CONSTRAINT "services_organizationsId_fkey" FOREIGN KEY ("organizationsId") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "servicesMonthlys" ADD CONSTRAINT "servicesMonthlys_organizationsId_fkey" FOREIGN KEY ("organizationsId") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inCharges" ADD CONSTRAINT "inCharges_personsId_fkey" FOREIGN KEY ("personsId") REFERENCES "persons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inCharges" ADD CONSTRAINT "inCharges_organizationsId_fkey" FOREIGN KEY ("organizationsId") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inCharges" ADD CONSTRAINT "inCharges_customersId_fkey" FOREIGN KEY ("customersId") REFERENCES "customers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_personsId_fkey" FOREIGN KEY ("personsId") REFERENCES "persons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_roomsId_fkey" FOREIGN KEY ("roomsId") REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_organizationsId_fkey" FOREIGN KEY ("organizationsId") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_customersId_fkey" FOREIGN KEY ("customersId") REFERENCES "customers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "studentsHasInCharges" ADD CONSTRAINT "studentsHasInCharges_studentsId_fkey" FOREIGN KEY ("studentsId") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "studentsHasInCharges" ADD CONSTRAINT "studentsHasInCharges_inChargesId_fkey" FOREIGN KEY ("inChargesId") REFERENCES "inCharges"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notificationsHasOrganizations" ADD CONSTRAINT "notificationsHasOrganizations_organizationsId_fkey" FOREIGN KEY ("organizationsId") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notificationsHasOrganizations" ADD CONSTRAINT "notificationsHasOrganizations_notificationsId_fkey" FOREIGN KEY ("notificationsId") REFERENCES "notifications"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alerts" ADD CONSTRAINT "alerts_organizationsId_fkey" FOREIGN KEY ("organizationsId") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "licenses" ADD CONSTRAINT "licenses_packagesId_fkey" FOREIGN KEY ("packagesId") REFERENCES "packages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentServicesMonthlys" ADD CONSTRAINT "PaymentServicesMonthlys_servicesMonthlysId_fkey" FOREIGN KEY ("servicesMonthlysId") REFERENCES "servicesMonthlys"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentServicesMonthlys" ADD CONSTRAINT "PaymentServicesMonthlys_studentsId_fkey" FOREIGN KEY ("studentsId") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentServicesMonthlys" ADD CONSTRAINT "PaymentServicesMonthlys_organizationsId_fkey" FOREIGN KEY ("organizationsId") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
