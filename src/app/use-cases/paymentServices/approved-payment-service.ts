import { PaymentService } from '@app/entities/payment-service';
import { PaymentServiceRepository } from '@app/repositories/payment-service-repository';
import { Injectable } from '@nestjs/common';
import { PaymentServiceNotFound } from './errors/payment-service-not-found';
import { PaymentRepository } from '@app/repositories/payment-repository';
import { Payment } from '@app/entities/payment';

interface ApprovedPaymentServiceResponse {
  paymentService: PaymentService;
}

@Injectable()
export class ApprovedPaymentService {
  constructor(
    private paymentServiceRepository: PaymentServiceRepository,
    private paymentRepository: PaymentRepository,
  ) {}

  async execute(id: string): Promise<ApprovedPaymentServiceResponse> {
    const paymentService = await this.paymentServiceRepository.findById(id);

    if (!paymentService) {
      throw new PaymentServiceNotFound();
    }

    const payment = new Payment({
      paymentsId: id,
      value: paymentService.value,
      organizationsId: paymentService.organizationsId,
    });

    paymentService.approved();

    Promise.all([
      this.paymentServiceRepository.save(paymentService),
      this.paymentRepository.create(payment),
    ]);

    return {
      paymentService,
    };
  }
}
