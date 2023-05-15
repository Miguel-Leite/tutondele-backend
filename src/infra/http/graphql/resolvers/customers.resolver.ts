import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserModel } from '../dtos/models/user-model';
import { GetAllCustomers } from '@app/use-cases/get-all-customers';
import { CreateCustomer } from '@app/use-cases/create-customer';
import { CustomerModel } from '../dtos/models/customer-model';
import { CreateCustomerInput } from '../dtos/inputs/create-customer-input';
import { AuthCustomerInput } from '../dtos/inputs/auth-customer-input';
import { AuthCustomerService } from '@infra/http/auth/auth-customer.service';
import { AuthGuard } from '@infra/http/auth/auth.guard';
import { CurrentUser, IAuthUser } from '@infra/http/auth/current-user';
import { GetByIdCustomer } from '@app/use-cases/get-by-id-customer';
import { UpdateCustomer } from '@app/use-cases/update-customer';
import { UpdateCustomerInput } from '../dtos/inputs/update-customer-input';
import { RemoveCustomer } from '@app/use-cases/remove-customer';
import { RetrieveCustomer } from '@app/use-cases/retrieve-customer';

@Resolver(() => UserModel)
export class CustomersResolver {
  constructor(
    private getAllCustomers: GetAllCustomers,
    private getByIdCustomer: GetByIdCustomer,
    private createCustomer: CreateCustomer,
    private updateCustomer: UpdateCustomer,
    private removeCustomer: RemoveCustomer,
    private retrieveCustomer: RetrieveCustomer,
    private authCustomerService: AuthCustomerService,
  ) {}

  @UseGuards(AuthGuard)
  @Query(() => CustomerModel)
  async meCustomer(
    @CurrentUser() user: IAuthUser,
  ) {
    const { customer } = await this.getByIdCustomer.execute(user.sub);
    return customer;
  }

  @UseGuards(AuthGuard)
  @Query(() => CustomerModel)
  async customer(@Args('id') id: string,) {
    const { customer } = await this.getByIdCustomer.execute(id);
    return customer;
  }

  @UseGuards(AuthGuard)
  @Query(() => [CustomerModel])
  async customers(
    @CurrentUser() user: IAuthUser,
  ) {
    const { customers } = await this.getAllCustomers.execute(user.organizationsId);
    return customers;
  }

  @Mutation(() => String)
  async authenticationCustomer(@Args('data') data: AuthCustomerInput) {
    return await this.authCustomerService.execute(data);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => CustomerModel)
  async addCustomer(@Args('data') data: CreateCustomerInput,@CurrentUser() user: IAuthUser,) {
    const { customer } = await this.createCustomer.execute({
      organizationsId: user.organizationsId,
      ...data
    });
    return customer;
  }

  @UseGuards(AuthGuard)
  @Mutation(() => CustomerModel)
  async editCustomer(@Args('data') data: UpdateCustomerInput,@CurrentUser() user: IAuthUser,) {
    const { customer } = await this.updateCustomer.execute(data);
    return customer;
  }

  @UseGuards(AuthGuard)
  @Mutation(() => CustomerModel)
  async deleteCustomer(@Args('id') id: string,) {
    const { customer } = await this.removeCustomer.execute(id);
    return customer;
  }

  @UseGuards(AuthGuard)
  @Mutation(() => CustomerModel)
  async recoverCustomer(@Args('id') id: string,) {
    const { customer } = await this.retrieveCustomer.execute(id);
    return customer;
  }
}
