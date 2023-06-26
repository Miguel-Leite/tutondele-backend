import { Injectable } from '@nestjs/common';
import { PaymentServiceMonthlyNotFound } from './errors/payment-service-monthly-not-found';
import { PaymentServiceMonthlyRepository } from '@app/repositories/payment-service-monthly-repository';
import { PaymentServiceMonthly } from '@app/entities/payment-service-monthly';

interface CanceledPaymentServiceMonthlyResponse {
  paymentServiceMonthly: PaymentServiceMonthly;
}

@Injectable()
export class CanceledPaymentServiceMonthly {
  constructor(
    private paymentServiceMonthlyRepository: PaymentServiceMonthlyRepository,
  ) {}

  async execute(id: string): Promise<CanceledPaymentServiceMonthlyResponse> {
    const paymentServiceMonthly =
      await this.paymentServiceMonthlyRepository.findById(id);

    if (!paymentServiceMonthly) {
      throw new PaymentServiceMonthlyNotFound();
    }

    paymentServiceMonthly.canceled();

    this.paymentServiceMonthlyRepository.save(paymentServiceMonthly);

    return {
      paymentServiceMonthly,
    };
  }
}
