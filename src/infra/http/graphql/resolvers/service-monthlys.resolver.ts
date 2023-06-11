import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateServiceMonthly } from '@app/use-cases/serviceMonthlys/create-service-monthly';
import { GetAllServiceMonthlys } from '@app/use-cases/serviceMonthlys/get-all-service-monthlys';
import { GetByIdServiceMonthly } from '@app/use-cases/serviceMonthlys/get-by-id-service-monthly';
import { RemoveServiceMonthly } from '@app/use-cases/serviceMonthlys/remove-service-monthly';
import { UpdateServiceMonthly } from '@app/use-cases/serviceMonthlys/update-service-monthly';
import {
  CurrentCustomer,
  IAuthCustomer,
} from '@infra/http/auth/customer/current-customer';
import { AuthGuard } from '@infra/http/auth/auth.guard';

import { CreateServiceMonthlyInput } from '../dtos/inputs/create-service-monthly-input';
import { ServiceMonthlyModel } from '../dtos/models/service-monthly-model';
import { UpdateServiceMonthlyInput } from '../dtos/inputs/update-service-monthly-model';

@Resolver()
export class ServiceMonthlysResolver {
  constructor(
    private getAllServiceMonthlys: GetAllServiceMonthlys,
    private getByIdServiceMonthly: GetByIdServiceMonthly,
    private createServiceMonthly: CreateServiceMonthly,
    private updateServiceMonthly: UpdateServiceMonthly,
    private removeServiceMonthly: RemoveServiceMonthly,
  ) {}

  @UseGuards(AuthGuard)
  @Query(() => [ServiceMonthlyModel])
  async serviceMonthlys(@CurrentCustomer() customer: IAuthCustomer) {
    const { serviceMonthlys } = await this.getAllServiceMonthlys.execute(
      customer.organizationsId,
    );
    return serviceMonthlys;
  }

  @UseGuards(AuthGuard)
  @Query(() => ServiceMonthlyModel)
  async serviceMonthly(@Args('id') id: string) {
    const { serviceMonthly } = await this.getByIdServiceMonthly.execute(id);
    return serviceMonthly;
  }

  @UseGuards(AuthGuard)
  @Mutation(() => ServiceMonthlyModel)
  async addServiceMonthly(
    @Args('data') data: CreateServiceMonthlyInput,
    @CurrentCustomer() customer: IAuthCustomer,
  ) {
    const { serviceMonthly } = await this.createServiceMonthly.execute({
      organizationsId: customer.organizationsId,
      ...data,
    });
    return serviceMonthly;
  }

  @UseGuards(AuthGuard)
  @Mutation(() => ServiceMonthlyModel)
  async editServiceMonthly(
    @Args('data') data: UpdateServiceMonthlyInput,
    @CurrentCustomer() customer: IAuthCustomer,
  ) {
    const { serviceMonthly } = await this.updateServiceMonthly.execute({
      organizationsId: customer.organizationsId,
      ...data,
    });
    return serviceMonthly;
  }

  @UseGuards(AuthGuard)
  @Mutation(() => ServiceMonthlyModel)
  async deleteServiceMonthly(@Args('id') id: string) {
    const { serviceMonthly } = await this.removeServiceMonthly.execute(id);
    return serviceMonthly;
  }
}
