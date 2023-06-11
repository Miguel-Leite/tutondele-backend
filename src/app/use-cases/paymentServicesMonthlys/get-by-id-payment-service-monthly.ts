import { PaymentServiceMonthly } from '@app/entities/payment-service-monthly';
import { PaymentServiceMonthlyRepository } from '@app/repositories/payment-service-monthly-repository';
import { Injectable } from '@nestjs/common';

interface GetByIdPaymentServiceMonthlyResponse {
  paymentServiceMonthly: PaymentServiceMonthly | null;
}

@Injectable()
export class GetByIdPaymentServiceMonthly {
  constructor(
    private paymentServiceMonthlyRepository: PaymentServiceMonthlyRepository,
  ) {}

  async execute(id: string): Promise<GetByIdPaymentServiceMonthlyResponse> {
    const paymentServiceMonthly =
      await this.paymentServiceMonthlyRepository.findById(id);

    return {
      paymentServiceMonthly,
    };
  }
}
