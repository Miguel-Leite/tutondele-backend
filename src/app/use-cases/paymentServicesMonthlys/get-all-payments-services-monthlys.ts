import { PaymentServiceMonthly } from '@app/entities/payment-service-monthly';
import { PaymentServiceMonthlyRepository } from '@app/repositories/payment-service-monthly-repository';
import { Injectable } from '@nestjs/common';

interface GetAllPaymentsServicesMonthlysResponse {
  paymentServicesMonthlys: PaymentServiceMonthly[] | null;
}

@Injectable()
export class GetAllPaymentsServicesMonthlys {
  constructor(
    private paymentServiceMonthlyRepository: PaymentServiceMonthlyRepository,
  ) {}

  async execute(
    organizationsId: string,
  ): Promise<GetAllPaymentsServicesMonthlysResponse> {
    const paymentServicesMonthlys =
      await this.paymentServiceMonthlyRepository.findAll(organizationsId);

    return {
      paymentServicesMonthlys,
    };
  }
}
