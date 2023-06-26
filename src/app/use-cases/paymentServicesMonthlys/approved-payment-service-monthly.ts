import { Injectable } from '@nestjs/common';
import { PaymentServiceMonthlyNotFound } from './errors/payment-service-monthly-not-found';
import { PaymentServiceMonthlyRepository } from '@app/repositories/payment-service-monthly-repository';
import { PaymentServiceMonthly } from '@app/entities/payment-service-monthly';
import { PaymentRepository } from '@app/repositories/payment-repository';
import { Payment } from '@app/entities/payment';

interface ApprovedPaymentServiceMonthlyResponse {
  paymentServiceMonthly: PaymentServiceMonthly;
}

@Injectable()
export class ApprovedPaymentServiceMonthly {
  constructor(
    private paymentServiceMonthlyRepository: PaymentServiceMonthlyRepository,
    private paymentRepository: PaymentRepository,
  ) {}

  async execute(id: string): Promise<ApprovedPaymentServiceMonthlyResponse> {
    const paymentServiceMonthly =
      await this.paymentServiceMonthlyRepository.findById(id);

    if (!paymentServiceMonthly) {
      throw new PaymentServiceMonthlyNotFound();
    }
    const payment = new Payment({
      paymentsId: id,
      organizationsId: paymentServiceMonthly.organizationsId,
      value: paymentServiceMonthly.value,
    });

    paymentServiceMonthly.approved();

    Promise.all([
      this.paymentServiceMonthlyRepository.save(paymentServiceMonthly),
      this.paymentRepository.create(payment),
    ]);

    return {
      paymentServiceMonthly,
    };
  }
}
