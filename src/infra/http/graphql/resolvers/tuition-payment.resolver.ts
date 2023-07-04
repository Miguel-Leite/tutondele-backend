import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { CreateTuitionPayment } from '@app/use-cases/tuitionPayments/create-tuition-payment';

import { AuthGuard } from '@infra/http/auth/auth.guard';

import { TuitionPaymentModel } from '../dtos/models/tuition-payment-model';
import { CreateTuitionPaymentInput } from '../dtos/inputs/create-tuition-payment-input';
import {
  CurrentCustomer,
  IAuthCustomer,
} from '@infra/http/auth/customer/current-customer';

@Resolver(() => TuitionPaymentModel)
export class TuitionPaymentResolver {
  constructor(private createTuitionPayment: CreateTuitionPayment) {}

  @UseGuards(AuthGuard)
  @Mutation(() => TuitionPaymentModel)
  async addTuitionPayment(
    @Args('data') data: CreateTuitionPaymentInput,
    @CurrentCustomer() customer: IAuthCustomer,
  ) {
    const { tuitionPayment } = await this.createTuitionPayment.execute({
      organizationsId: customer.organizationsId,
      ...data,
    });

    return tuitionPayment;
  }
}
