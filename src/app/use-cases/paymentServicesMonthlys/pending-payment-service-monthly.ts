import { Injectable } from '@nestjs/common';
import { PaymentServiceMonthlyNotFound } from './errors/payment-service-monthly-not-found';
import { PaymentServiceMonthlyRepository } from '@app/repositories/payment-service-monthly-repository';
import { PaymentServiceMonthly } from '@app/entities/payment-service-monthly';

interface PendingPaymentServiceMonthlyResponse {
  paymentServiceMonthly: PaymentServiceMonthly;
}

@Injectable()
export class PendingPaymentServiceMonthly {
  constructor(
    private paymentServiceMonthlyRepository: PaymentServiceMonthlyRepository,
  ) {}

  async execute(id: string): Promise<PendingPaymentServiceMonthlyResponse> {
    const paymentServiceMonthly =
      await this.paymentServiceMonthlyRepository.findById(id);

    if (!paymentServiceMonthly) {
      throw new PaymentServiceMonthlyNotFound();
    }

    paymentServiceMonthly.pending();

    this.paymentServiceMonthlyRepository.save(paymentServiceMonthly);

    return {
      paymentServiceMonthly,
    };
  }
}
