import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateService } from '@app/use-cases/services/create-service';
import { GetAllServices } from '@app/use-cases/services/get-all-services';
import { GetByIdService } from '@app/use-cases/services/get-by-id-service';
import { RemoveService } from '@app/use-cases/services/remove-service';
import { UpdateService } from '@app/use-cases/services/update-service';
import { AuthGuard } from '@infra/http/auth/auth.guard';
import {
  CurrentCustomer,
  IAuthCustomer,
} from '@infra/http/auth/customer/current-customer';

import { ServiceModel } from '../dtos/models/service-model';
import { UpdateServiceInput } from '../dtos/inputs/update-service-input';
import { CreateServiceInput } from '../dtos/inputs/create-service-input';

@Resolver()
export class ServicesResolver {
  constructor(
    private getAllServices: GetAllServices,
    private getByIdService: GetByIdService,
    private createService: CreateService,
    private updateService: UpdateService,
    private removeService: RemoveService,
  ) {}

  @UseGuards(AuthGuard)
  @Query(() => [ServiceModel])
  async services(@CurrentCustomer() customer: IAuthCustomer) {
    const { services } = await this.getAllServices.execute(
      customer.organizationsId,
    );

    return services;
  }

  @UseGuards(AuthGuard)
  @Query(() => ServiceModel)
  async service(@Args('id') id: string) {
    const { service } = await this.getByIdService.execute(id);

    return service;
  }

  @UseGuards(AuthGuard)
  @Mutation(() => ServiceModel)
  async addService(
    @Args('data') data: CreateServiceInput,
    @CurrentCustomer() customer: IAuthCustomer,
  ) {
    const { service } = await this.createService.execute({
      organizationsId: customer.organizationsId,
      ...data,
    });

    return service;
  }

  @UseGuards(AuthGuard)
  @Mutation(() => ServiceModel)
  async editService(
    @Args('data') data: UpdateServiceInput,
    @CurrentCustomer() customer: IAuthCustomer,
  ) {
    const { service } = await this.updateService.execute({
      organizationsId: customer.organizationsId,
      ...data,
    });

    return service;
  }

  @UseGuards(AuthGuard)
  @Mutation(() => ServiceModel)
  async deleteService(@Args('id') id: string) {
    const { service } = await this.removeService.execute(id);

    return service;
  }
}
