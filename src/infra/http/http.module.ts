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
import { ScansResolver } from './graphql/resolvers/scans.resolver';
import { UpdateOrganization } from '@app/use-cases/organizations/update-organization';
import { ActivateOrganization } from '@app/use-cases/organizations/activate-organization';
import { DeactivateOrganization } from '@app/use-cases/organizations/deactivate-organization';
import { RemoveOrganization } from '@app/use-cases/organizations/remove-organization';
import { RestModule } from './rest/rest.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    AuthModule,
    RestModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: resolve(process.cwd(), 'src/schema.gql'),
    }),
  ],
  providers: [
    // Identity
    IdentityResolver,
    IdentityService,
    // Users
    UsersResolver, 
    GetAllUsers, 
    CreateUser, 
    // Customers
    CustomersResolver, 
    GetAllCustomers, 
    CreateCustomer,
    // Organizations
    OrganizationsResolver,
    StudentsResolver,
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
  ],
})
export class HttpModule {}
