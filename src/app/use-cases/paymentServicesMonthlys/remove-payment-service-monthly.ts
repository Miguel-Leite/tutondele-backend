import { Injectable } from '@nestjs/common';
import { PaymentServiceMonthly } from '@app/entities/payment-service-monthly';
import { PaymentServiceMonthlyRepository } from '@app/repositories/payment-service-monthly-repository';

import { PaymentServiceMonthlyNotFound } from './errors/payment-service-monthly-not-found';

interface RemovePaymentServiceMonthlyResponse {
  paymentServiceMonthly: PaymentServiceMonthly;
}

@Injectable()
export class RemovePaymentServiceMonthly {
  constructor(
    private paymentServiceMonthlyRepository: PaymentServiceMonthlyRepository,
  ) {}

  async execute(id: string): Promise<RemovePaymentServiceMonthlyResponse> {
    const paymentServiceMonthly =
      await this.paymentServiceMonthlyRepository.findById(id);

    if (!paymentServiceMonthly) {
      throw new PaymentServiceMonthlyNotFound();
    }

    paymentServiceMonthly.remove();

    await this.paymentServiceMonthlyRepository.save(paymentServiceMonthly);

    return {
      paymentServiceMonthly,
    };
  }
}
