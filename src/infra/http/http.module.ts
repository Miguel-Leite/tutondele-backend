import { resolve } from 'node:path';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { StudentsResolver } from './graphql/resolvers/students.resolver';
import { AuthModule } from './auth/auth.module';
import { UsersResolver } from './graphql/resolvers/users.resolver';
import { GetAllUsers } from '@app/use-cases/users/get-all-users';
import { CreateUser } from '@app/use-cases/users/create-user';
import { CustomersResolver } from './graphql/resolvers/customers.resolver';
import { GetAllCustomers } from '@app/use-cases/customers/get-all-customers';
import { CreateCustomer } from '@app/use-cases/customers/create-customer';
import { OrganizationsResolver } from './graphql/resolvers/organizations.resolver';
import { AuthCustomerService } from './auth/customer/auth-customer.service';
import { GetByIdCustomer } from '@app/use-cases/customers/get-by-id-customer';
import { GetAllOrganizations } from '@app/use-cases/organizations/get-all-organizations';
import { CreateOrganization } from '@app/use-cases/organizations/create-organization';
import { UpdateCustomer } from '@app/use-cases/customers/update-customer';
import { RemoveCustomer } from '@app/use-cases/customers/remove-customer';
import { RetrieveCustomer } from '@app/use-cases/customers/retrieve-customer';

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
    AuthCustomerService,
    GetByIdCustomer,
    GetAllOrganizations,
    CreateOrganization,
    UpdateCustomer,
    RemoveCustomer,
    RetrieveCustomer,
  ],
})
export class HttpModule {}
