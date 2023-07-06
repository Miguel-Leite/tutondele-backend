import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { resolve } from 'node:path';

import { GetAllUsers } from '@app/use-cases/users/get-all-users';
import { CreateUser } from '@app/use-cases/users/create-user';
import { GetAllCustomers } from '@app/use-cases/customers/get-all-customers';
import { CreateCustomer } from '@app/use-cases/customers/create-customer';
import { GetByIdCustomer } from '@app/use-cases/customers/get-by-id-customer';
import { GetAllOrganizations } from '@app/use-cases/organizations/get-all-organizations';
import { CreateOrganization } from '@app/use-cases/organizations/create-organization';
import { UpdateCustomer } from '@app/use-cases/customers/update-customer';
import { RemoveCustomer } from '@app/use-cases/customers/remove-customer';
import { RetrieveCustomer } from '@app/use-cases/customers/retrieve-customer';
import { GetAllRooms } from '@app/use-cases/rooms/get-all-rooms';
import { GetByIdRoom } from '@app/use-cases/rooms/get-by-id-room';
import { CreateRoom } from '@app/use-cases/rooms/create-room';
import { UpdateRoom } from '@app/use-cases/rooms/update-room';
import { RemoveRoom } from '@app/use-cases/rooms/remove-room';
import { GetAllStudents } from '@app/use-cases/students/get-all-students';
import { CreateStudent } from '@app/use-cases/students/create-student';
import { CreateCourse } from '@app/use-cases/courses/create-course';
import { UpdateCourse } from '@app/use-cases/courses/update-course';
import { RemoveCourse } from '@app/use-cases/courses/remove-course';
import { GetAllCourses } from '@app/use-cases/courses/get-all-courses';
import { GetByIdCourse } from '@app/use-cases/courses/get-by-id-course';
import { UpdateStudent } from '@app/use-cases/students/update-student';
import { GetByIdStudent } from '@app/use-cases/students/get-by-id-student';
import { RemoveStudent } from '@app/use-cases/students/remove-student';

import { DatabaseModule } from '@infra/database/database.module';

import { AuthCustomerService } from './auth/customer/auth-customer.service';
import { AuthModule } from './auth/auth.module';

import { CustomersResolver } from './graphql/resolvers/customers.resolver';
import { OrganizationsResolver } from './graphql/resolvers/organizations.resolver';
import { UsersResolver } from './graphql/resolvers/users.resolver';
import { StudentsResolver } from './graphql/resolvers/students.resolver';
import { IdentityResolver } from './graphql/resolvers/identity.resolver';
import { CoursesResolver } from './graphql/resolvers/courses.resolver';
import { RoomsResolver } from './graphql/resolvers/rooms.resolver';

import { IdentityService } from './identity.service';
import { UpdateOrganization } from '@app/use-cases/organizations/update-organization';
import { ActivateOrganization } from '@app/use-cases/organizations/activate-organization';
import { DeactivateOrganization } from '@app/use-cases/organizations/deactivate-organization';
import { RemoveOrganization } from '@app/use-cases/organizations/remove-organization';
import { GetAllCategories } from '@app/use-cases/categories/get-all-categories';
import { GetByIdCategory } from '@app/use-cases/categories/get-by-id-category';
import { CreateCategory } from '@app/use-cases/categories/create-category';
import { UpdateCategory } from '@app/use-cases/categories/update-category';
import { RemoveCategory } from '@app/use-cases/categories/remove-category';
import { PackagesResolver } from './graphql/resolvers/packages.resolver';
import { GetAllPackages } from '@app/use-cases/packages/get-all-packages';
import { GetByIdPackage } from '@app/use-cases/packages/get-by-id-package';
import { CreatePackage } from '@app/use-cases/packages/create-package';
import { UpdatePackage } from '@app/use-cases/packages/update-package';
import { RemovePackage } from '@app/use-cases/packages/remove-package';
import { LicensesResolver } from './graphql/resolvers/licenses.resolver';
import { GetAllLicenses } from '@app/use-cases/licenses/get-all-licenses';
import { GetByIdLicense } from '@app/use-cases/licenses/get-by-id-license';
import { CreateLicense } from '@app/use-cases/licenses/create-license';
import { UpdateLicense } from '@app/use-cases/licenses/update-license';
import { RemoveLicense } from '@app/use-cases/licenses/remove-license';
import { ServicesResolver } from './graphql/resolvers/services.resolver';
import { GetAllServices } from '@app/use-cases/services/get-all-services';
import { GetByIdService } from '@app/use-cases/services/get-by-id-service';
import { CreateService } from '@app/use-cases/services/create-service';
import { UpdateService } from '@app/use-cases/services/update-service';
import { RemoveService } from '@app/use-cases/services/remove-service';
import { ServiceMonthlysResolver } from './graphql/resolvers/service-monthlys.resolver';
import { GetAllServiceMonthlys } from '@app/use-cases/serviceMonthlys/get-all-service-monthlys';
import { GetByIdServiceMonthly } from '@app/use-cases/serviceMonthlys/get-by-id-service-monthly';
import { CreateServiceMonthly } from '@app/use-cases/serviceMonthlys/create-service-monthly';
import { UpdateServiceMonthly } from '@app/use-cases/serviceMonthlys/update-service-monthly';
import { RemoveServiceMonthly } from '@app/use-cases/serviceMonthlys/remove-service-monthly';
import { PaymentServiceMonthlysResolver } from './graphql/resolvers/payment-service-monthlys.resolver';
import { GetAllPaymentsServicesMonthlys } from '@app/use-cases/paymentServicesMonthlys/get-all-payments-services-monthlys';
import { GetByIdPaymentServiceMonthly } from '@app/use-cases/paymentServicesMonthlys/get-by-id-payment-service-monthly';
import { CreatePaymentServiceMonthly } from '@app/use-cases/paymentServicesMonthlys/create-payment-service-monthly';
import { UpdatePaymentServiceMonthly } from '@app/use-cases/paymentServicesMonthlys/update-payment-service-monthly';
import { RemovePaymentServiceMonthly } from '@app/use-cases/paymentServicesMonthlys/remove-payment-service-monthly';
import { GetByIdPerson } from '@app/use-cases/persons/get-by-id-person';
import { RemoveUser } from '@app/use-cases/users/remove-user';
import { AuthUserService } from './auth/user/auth-user.service';
import { GetByIdContact } from '@app/use-cases/organizations/get-by-id-contact';
import { ApprovedPaymentService } from '@app/use-cases/paymentServices/approved-payment-service';
import { CanceledPaymentService } from '@app/use-cases/paymentServices/canceled-payment-service';
import { PendingPaymentService } from '@app/use-cases/paymentServices/pending-payment-service';
import { CreatePaymentService } from '@app/use-cases/paymentServices/create-payment-service';
import { UpdatePaymentService } from '@app/use-cases/paymentServices/update-payment-service';
import { GetByIdPaymentService } from '@app/use-cases/paymentServices/get-by-id-payment-service';
import { ApprovedPaymentServiceMonthly } from '@app/use-cases/paymentServicesMonthlys/approved-payment-service-monthly';
import { CanceledPaymentServiceMonthly } from '@app/use-cases/paymentServicesMonthlys/canceled-payment-service-monthly';
import { PendingPaymentServiceMonthly } from '@app/use-cases/paymentServicesMonthlys/pending-payment-service-monthly';
import { CreateTuitionPayment } from '@app/use-cases/tuitionPayments/create-tuition-payment';
import { TuitionPaymentResolver } from './graphql/resolvers/tuition-payment.resolver';
import { PaymentServicesResolver } from './graphql/resolvers/payment-services.resolver';
import { GetAllPaymentsServices } from '@app/use-cases/paymentServices/get-all-payments-services';
import { RemovePaymentService } from '@app/use-cases/paymentServices/remove-payment-service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    AuthModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: resolve(process.cwd(), 'src/schema.gql'),
    }),
  ],
  providers: [
    // Identity
    IdentityResolver,
    IdentityService,
    // Packages
    PackagesResolver,
    GetAllPackages,
    GetByIdPackage,
    CreatePackage,
    UpdatePackage,
    RemovePackage,
    // Licenses
    LicensesResolver,
    GetAllLicenses,
    GetByIdLicense,
    CreateLicense,
    UpdateLicense,
    RemoveLicense,
    // Users
    UsersResolver,
    GetAllUsers,
    CreateUser,
    RemoveUser,
    AuthUserService,
    // Customers
    CustomersResolver,
    GetAllCustomers,
    CreateCustomer,
    // Organizations
    OrganizationsResolver,
    GetByIdContact,
    StudentsResolver,
    GetByIdPerson,
    GetAllStudents,
    CreateStudent,
    UpdateStudent,
    GetByIdStudent,
    RemoveStudent,
    AuthCustomerService,
    GetByIdCustomer,
    GetAllOrganizations,
    CreateOrganization,
    UpdateOrganization,
    ActivateOrganization,
    DeactivateOrganization,
    RemoveOrganization,
    UpdateCustomer,
    RemoveCustomer,
    RetrieveCustomer,
    RoomsResolver,
    GetAllRooms,
    GetByIdRoom,
    CreateRoom,
    UpdateRoom,
    RemoveRoom,
    CoursesResolver,
    CreateCourse,
    UpdateCourse,
    RemoveCourse,
    GetAllCourses,
    GetByIdCourse,
    GetAllCategories,
    GetByIdCategory,
    CreateCategory,
    UpdateCategory,
    RemoveCategory,
    ServicesResolver,
    GetAllServices,
    GetByIdService,
    CreateService,
    UpdateService,
    RemoveService,
    ServiceMonthlysResolver,
    GetAllServiceMonthlys,
    GetByIdServiceMonthly,
    CreateServiceMonthly,
    UpdateServiceMonthly,
    RemoveServiceMonthly,
    PaymentServiceMonthlysResolver,
    ApprovedPaymentServiceMonthly,
    CanceledPaymentServiceMonthly,
    PendingPaymentServiceMonthly,
    GetAllPaymentsServicesMonthlys,
    GetByIdPaymentServiceMonthly,
    CreatePaymentServiceMonthly,
    UpdatePaymentServiceMonthly,
    RemovePaymentServiceMonthly,
    ApprovedPaymentService,
    CanceledPaymentService,
    PendingPaymentService,
    CreatePaymentService,
    UpdatePaymentService,
    GetByIdPaymentService,
    GetAllPaymentsServices,
    RemovePaymentService,
    PaymentServicesResolver,
    CreateTuitionPayment,
    TuitionPaymentResolver,
  ],
})
export class HttpModule {}
