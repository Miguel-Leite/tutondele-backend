import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreatePaymentServiceMonthly } from '@app/use-cases/paymentServicesMonthlys/create-payment-service-monthly';
import { GetAllPaymentsServicesMonthlys } from '@app/use-cases/paymentServicesMonthlys/get-all-payments-services-monthlys';
import { GetByIdPaymentServiceMonthly } from '@app/use-cases/paymentServicesMonthlys/get-by-id-payment-service-monthly';
import { RemovePaymentServiceMonthly } from '@app/use-cases/paymentServicesMonthlys/remove-payment-service-monthly';
import { UpdatePaymentServiceMonthly } from '@app/use-cases/paymentServicesMonthlys/update-payment-service-monthly';
import {
  CurrentCustomer,
  IAuthCustomer,
} from '@infra/http/auth/customer/current-customer';
import { AuthGuard } from '@infra/http/auth/auth.guard';
import { CreatePaymentServiceMonthlyInput } from '../dtos/inputs/create-payment-service-monthly-input';
import { UpdatePaymentServiceMonthlyInput } from '../dtos/inputs/update-payment-service-monthly-input';
import { PaymentServiceMonthlyModel } from '../dtos/models/payment-service-monthly';

@Resolver()
export class PaymentServiceMonthlysResolver {
  constructor(
    private getAllPaymentsServicesMonthlys: GetAllPaymentsServicesMonthlys,
    private getByIdPaymentServiceMonthly: GetByIdPaymentServiceMonthly,
    private createPaymentServiceMonthly: CreatePaymentServiceMonthly,
    private updatePaymentServiceMonthly: UpdatePaymentServiceMonthly,
    private removePaymentServiceMonthly: RemovePaymentServiceMonthly,
  ) {}

  @UseGuards(AuthGuard)
  @Query(() => [PaymentServiceMonthlyModel])
  async paymentsServicesMonthlys(@CurrentCustomer() customer: IAuthCustomer) {
    const { paymentServicesMonthlys } =
      await this.getAllPaymentsServicesMonthlys.execute(
        customer.organizationsId,
      );

    return paymentServicesMonthlys;
  }

  @UseGuards(AuthGuard)
  @Query(() => PaymentServiceMonthlyModel)
  async paymentServiceMonthly(@Args('id') id: string) {
    const { paymentServiceMonthly } =
      await this.getByIdPaymentServiceMonthly.execute(id);

    return paymentServiceMonthly;
  }

  @UseGuards(AuthGuard)
  @Mutation(() => PaymentServiceMonthlyModel)
  async addPaymentServiceMonthly(
    @Args('data') data: CreatePaymentServiceMonthlyInput,
    @CurrentCustomer() customer: IAuthCustomer,
  ) {
    const { paymentServiceMonthly } =
      await this.createPaymentServiceMonthly.execute({
        organizationsId: customer.organizationsId,
        ...data,
      });
    return paymentServiceMonthly;
  }

  @UseGuards(AuthGuard)
  @Mutation(() => PaymentServiceMonthlyModel)
  async editPaymentServiceMonthly(
    @Args('data') data: UpdatePaymentServiceMonthlyInput,
    @CurrentCustomer() customer: IAuthCustomer,
  ) {
    const { paymentServiceMonthly } =
      await this.updatePaymentServiceMonthly.execute({
        organizationsId: customer.organizationsId,
        ...data,
      });
    return paymentServiceMonthly;
  }

  @UseGuards(AuthGuard)
  @Mutation(() => PaymentServiceMonthlyModel)
  async deletePaymentServiceMonthly(@Args('id') id: string) {
    const { paymentServiceMonthly } =
      await this.removePaymentServiceMonthly.execute(id);

    return paymentServiceMonthly;
  }
}
