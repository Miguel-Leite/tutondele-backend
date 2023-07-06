import { CreatePaymentService } from '@app/use-cases/paymentServices/create-payment-service';
import { PaymentServiceModel } from '../dtos/models/payment-service';
import { UpdatePaymentService } from '@app/use-cases/paymentServices/update-payment-service';
import { GetAllPaymentsServices } from '@app/use-cases/paymentServices/get-all-payments-services';
import { GetByIdPaymentService } from '@app/use-cases/paymentServices/get-by-id-payment-service';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { RemovePaymentService } from '@app/use-cases/paymentServices/remove-payment-service';
import { GetByIdService } from '@app/use-cases/services/get-by-id-service';
import { GetByIdStudent } from '@app/use-cases/students/get-by-id-student';
import { AuthGuard } from '@infra/http/auth/auth.guard';
import { UseGuards } from '@nestjs/common';
import {
  CurrentCustomer,
  IAuthCustomer,
} from '@infra/http/auth/customer/current-customer';
import { StudentModel } from '../dtos/models/student-model';
import { ServiceModel } from '../dtos/models/service-model';
import { CreatePaymentServiceInput } from '../dtos/inputs/create-payment-service-input';
import { UpdatePaymentServiceInput } from '../dtos/inputs/update-payment-service-input';
import { ApprovedPaymentService } from '@app/use-cases/paymentServices/approved-payment-service';
import { CanceledPaymentService } from '@app/use-cases/paymentServices/canceled-payment-service';
import { PendingPaymentService } from '@app/use-cases/paymentServices/pending-payment-service';

@Resolver(() => PaymentServiceModel)
export class PaymentServicesResolver {
  constructor(
    private createPaymentService: CreatePaymentService,
    private updatePaymentService: UpdatePaymentService,
    private getAllPaymentsServices: GetAllPaymentsServices,
    private getByIdPaymentService: GetByIdPaymentService,
    private removePaymentService: RemovePaymentService,
    private approvedPaymentServiceUseCase: ApprovedPaymentService,
    private canceledPaymentServiceUseCase: CanceledPaymentService,
    private pendingPaymentServiceUseCase: PendingPaymentService,
    private getByIdService: GetByIdService,
    private getByIdStudent: GetByIdStudent,
  ) {}

  @UseGuards(AuthGuard)
  @Query(() => [PaymentServiceModel])
  async paymentsServices(@CurrentCustomer() customer: IAuthCustomer) {
    const { paymentServices } = await this.getAllPaymentsServices.execute(
      customer.organizationsId,
    );

    return paymentServices;
  }

  @UseGuards(AuthGuard)
  @Query(() => PaymentServiceModel)
  async paymentService(@Args('id') id: string) {
    const { paymentService } = await this.getByIdPaymentService.execute(id);

    return paymentService;
  }

  @ResolveField(() => StudentModel)
  async student(@Parent() paymentService: PaymentServiceModel) {
    const { student } = await this.getByIdStudent.execute(
      paymentService.studentsId,
    );
    return student;
  }

  @ResolveField(() => ServiceModel)
  async service(@Parent() paymentService: PaymentServiceModel) {
    const { service } = await this.getByIdService.execute(
      paymentService.servicesId,
    );
    return service;
  }

  @UseGuards(AuthGuard)
  @Mutation(() => PaymentServiceModel)
  async addPaymentService(
    @Args('data') data: CreatePaymentServiceInput,
    @CurrentCustomer() customer: IAuthCustomer,
  ) {
    const { paymentService } = await this.createPaymentService.execute({
      organizationsId: customer.organizationsId,
      ...data,
    });
    return paymentService;
  }

  @UseGuards(AuthGuard)
  @Mutation(() => PaymentServiceModel)
  async editPaymentService(
    @Args('data') data: UpdatePaymentServiceInput,
    @CurrentCustomer() customer: IAuthCustomer,
  ) {
    const { paymentService } = await this.updatePaymentService.execute({
      organizationsId: customer.organizationsId,
      ...data,
    });
    return paymentService;
  }

  @UseGuards(AuthGuard)
  @Mutation(() => PaymentServiceModel)
  async deletePaymentService(@Args('id') id: string) {
    const { paymentService } = await this.removePaymentService.execute(id);

    return paymentService;
  }

  @UseGuards(AuthGuard)
  @Mutation(() => PaymentServiceModel)
  async approvedPaymentService(@Args('id') id: string) {
    const { paymentService } = await this.approvedPaymentServiceUseCase.execute(
      id,
    );

    return paymentService;
  }

  @UseGuards(AuthGuard)
  @Mutation(() => PaymentServiceModel)
  async canceledPaymentService(@Args('id') id: string) {
    const { paymentService } = await this.canceledPaymentServiceUseCase.execute(
      id,
    );

    return paymentService;
  }

  @UseGuards(AuthGuard)
  @Mutation(() => PaymentServiceModel)
  async pendingPaymentService(@Args('id') id: string) {
    const { paymentService } = await this.pendingPaymentServiceUseCase.execute(
      id,
    );

    return paymentService;
  }
}
