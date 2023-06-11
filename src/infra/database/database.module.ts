import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UserRepository } from '@app/repositories/user-repository';
import { PrismaUserRepository } from './prisma/repositories/prisma-user-repository';
import { PersonRepository } from '@app/repositories/person-repository';
import { PrismaPersonRepository } from './prisma/repositories/prisma-person-repository';
import { CustomerRepository } from '@app/repositories/customer-repository';
import { PrismaCustomerRepository } from './prisma/repositories/prisma-customer-repository';
import { AddressRepository } from '@app/repositories/address-repository';
import { PrismaAddressRepository } from './prisma/repositories/prisma-address-repository';
import { ContactRepository } from '@app/repositories/contact-repository';
import { PrismaContactRepository } from './prisma/repositories/prisma-contact-repository';
import { OrganizationRepository } from '@app/repositories/organization-repository';
import { PrismaOrganizationRepository } from './prisma/repositories/prisma-organization-repository';
import { CourseRepository } from '@app/repositories/course-repository';
import { PrismaCourseRepository } from './prisma/repositories/prisma-course-repository';
import { InChargeRepository } from '@app/repositories/inCharge-repository';
import { PrismaInChargeRepository } from './prisma/repositories/prisma-inCharge-repository';
import { RoomRepository } from '@app/repositories/room-repository';
import { PrismaRoomRepository } from './prisma/repositories/prisma-room-repository';
import { StudentRepository } from '@app/repositories/student-repository';
import { PrismaStudentRepository } from './prisma/repositories/prisma-student-repository';
import { PackageRepository } from '@app/repositories/package-repository';
import { PrismaPackageRepository } from './prisma/repositories/prisma-package-repository';
import { LicenseRepository } from '@app/repositories/license-repository';
import { PrismaLicenseRepository } from './prisma/repositories/prisma-license-repository';
import { ServiceRepository } from '@app/repositories/service-repository';
import { PrismaServiceRepository } from './prisma/repositories/prisma-service-repository';
import { ServiceMonthlyRepository } from '@app/repositories/service-monthly-repository';
import { PrismaServiceMonthlyRepository } from './prisma/repositories/prisma-service-monthly-repository';
import { PaymentServiceMonthlyRepository } from '@app/repositories/payment-service-monthly-repository';
import { PrismaPaymentServiceMonthlyRepository } from './prisma/repositories/prisma-payment-service-monthly-repositoy';

@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: PersonRepository,
      useClass: PrismaPersonRepository,
    },
    {
      provide: CustomerRepository,
      useClass: PrismaCustomerRepository,
    },
    {
      provide: AddressRepository,
      useClass: PrismaAddressRepository,
    },
    {
      provide: ContactRepository,
      useClass: PrismaContactRepository,
    },
    {
      provide: OrganizationRepository,
      useClass: PrismaOrganizationRepository,
    },
    {
      provide: CourseRepository,
      useClass: PrismaCourseRepository,
    },
    {
      provide: InChargeRepository,
      useClass: PrismaInChargeRepository,
    },
    {
      provide: RoomRepository,
      useClass: PrismaRoomRepository,
    },
    {
      provide: StudentRepository,
      useClass: PrismaStudentRepository,
    },
    {
      provide: OrganizationRepository,
      useClass: PrismaOrganizationRepository,
    },
    {
      provide: PackageRepository,
      useClass: PrismaPackageRepository,
    },
    {
      provide: LicenseRepository,
      useClass: PrismaLicenseRepository,
    },
    {
      provide: ServiceRepository,
      useClass: PrismaServiceRepository,
    },
    {
      provide: ServiceMonthlyRepository,
      useClass: PrismaServiceMonthlyRepository,
    },
    {
      provide: PaymentServiceMonthlyRepository,
      useClass: PrismaPaymentServiceMonthlyRepository,
    },
  ],
  exports: [
    UserRepository,
    PersonRepository,
    CustomerRepository,
    AddressRepository,
    ContactRepository,
    OrganizationRepository,
    StudentRepository,
    RoomRepository,
    InChargeRepository,
    CourseRepository,
    PackageRepository,
    LicenseRepository,
    ServiceRepository,
    ServiceMonthlyRepository,
    PaymentServiceMonthlyRepository,
  ],
})
export class DatabaseModule {}
