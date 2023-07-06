import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { CreatePaymentServiceMonthly } from '@app/use-cases/paymentServicesMonthlys/create-payment-service-monthly';
import { GetAllPaymentsServicesMonthlys } from '@app/use-cases/paymentServicesMonthlys/get-all-payments-services-monthlys';
import { GetByIdPaymentServiceMonthly } from '@app/use-cases/paymentServicesMonthlys/get-by-id-payment-service-monthly';
import { RemovePaymentServiceMonthly } from '@app/use-cases/paymentServicesMonthlys/remove-payment-service-monthly';
import { UpdatePaymentServiceMonthly } from '@app/use-cases/paymentServicesMonthlys/update-payment-service-monthly';
import { GetByIdStudent } from '@app/use-cases/students/get-by-id-student';
import {
  CurrentCustomer,
  IAuthCustomer,
} from '@infra/http/auth/customer/current-customer';
import { AuthGuard } from '@infra/http/auth/auth.guard';

import { CreatePaymentServiceMonthlyInput } from '../dtos/inputs/create-payment-service-monthly-input';
import { UpdatePaymentServiceMonthlyInput } from '../dtos/inputs/update-payment-service-monthly-input';
import { PaymentServiceMonthlyModel } from '../dtos/models/payment-service-monthly';
import { StudentModel } from '../dtos/models/student-model';
import { GetByIdServiceMonthly } from '@app/use-cases/serviceMonthlys/get-by-id-service-monthly';
import { ServiceMonthlyModel } from '../dtos/models/service-monthly-model';
import { ApprovedPaymentServiceMonthly } from '@app/use-cases/paymentServicesMonthlys/approved-payment-service-monthly';
import { CanceledPaymentServiceMonthly } from '@app/use-cases/paymentServicesMonthlys/canceled-payment-service-monthly';
import { PendingPaymentServiceMonthly } from '@app/use-cases/paymentServicesMonthlys/pending-payment-service-monthly';
import { CreatePaymentServiceMonthlyPersonalized } from '@app/use-cases/paymentServicesMonthlys/create-payment-service-monthly-personalized';

@Resolver(() => PaymentServiceMonthlyModel)
export class PaymentServiceMonthlysResolver {
  constructor(
    private getAllPaymentsServicesMonthlys: GetAllPaymentsServicesMonthlys,
    private getByIdPaymentServiceMonthly: GetByIdPaymentServiceMonthly,
    private createPaymentServiceMonthly: CreatePaymentServiceMonthly,
    private createPaymentServiceMonthlyPersonalized: CreatePaymentServiceMonthlyPersonalized,
    private updatePaymentServiceMonthly: UpdatePaymentServiceMonthly,
    private removePaymentServiceMonthly: RemovePaymentServiceMonthly,
    private getByIdStudent: GetByIdStudent,
    private getByIdServiceMonthly: GetByIdServiceMonthly,
    private approvedPaymentServiceMonthlyUseCase: ApprovedPaymentServiceMonthly,
    private canceledPaymentServiceMonthlyUseCase: CanceledPaymentServiceMonthly,
    private pendingPaymentServiceMonthlyUseCase: PendingPaymentServiceMonthly,
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

  @ResolveField(() => StudentModel)
  async student(@Parent() paymentServiceMonthly: PaymentServiceMonthlyModel) {
    const { student } = await this.getByIdStudent.execute(
      paymentServiceMonthly.studentsId,
    );
    return student;
  }

  @ResolveField(() => ServiceMonthlyModel)
  async service(@Parent() paymentServiceMonthly: PaymentServiceMonthlyModel) {
    const { serviceMonthly } = await this.getByIdServiceMonthly.execute(
      paymentServiceMonthly.servicesMonthlysId,
    );
    return serviceMonthly;
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
  async addPaymentServiceMonthlyPersonalized(
    @Args('data') data: CreatePaymentServiceMonthlyInput,
    @CurrentCustomer() customer: IAuthCustomer,
  ) {
    const { paymentServiceMonthly } =
      await this.createPaymentServiceMonthlyPersonalized.execute({
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

  @UseGuards(AuthGuard)
  @Mutation(() => PaymentServiceMonthlyModel)
  async approvedPaymentServiceMonthly(@Args('id') id: string) {
    const { paymentServiceMonthly } =
      await this.approvedPaymentServiceMonthlyUseCase.execute(id);

    return paymentServiceMonthly;
  }

  @UseGuards(AuthGuard)
  @Mutation(() => PaymentServiceMonthlyModel)
  async canceledPaymentServiceMonthly(@Args('id') id: string) {
    const { paymentServiceMonthly } =
      await this.canceledPaymentServiceMonthlyUseCase.execute(id);

    return paymentServiceMonthly;
  }

  @UseGuards(AuthGuard)
  @Mutation(() => PaymentServiceMonthlyModel)
  async pendingPaymentServiceMonthly(@Args('id') id: string) {
    const { paymentServiceMonthly } =
      await this.pendingPaymentServiceMonthlyUseCase.execute(id);

    return paymentServiceMonthly;
  }
}
