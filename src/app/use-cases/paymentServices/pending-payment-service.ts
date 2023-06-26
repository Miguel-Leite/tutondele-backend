import { PaymentService } from '@app/entities/payment-service';
import { PaymentServiceRepository } from '@app/repositories/payment-service-repository';
import { Injectable } from '@nestjs/common';
import { PaymentServiceNotFound } from './errors/payment-service-not-found';

interface PendingPaymentServiceResponse {
  paymentService: PaymentService;
}

@Injectable()
export class PendingPaymentService {
  constructor(private paymentServiceRepository: PaymentServiceRepository) {}

  async execute(id: string): Promise<PendingPaymentServiceResponse> {
    const paymentService = await this.paymentServiceRepository.findById(id);

    if (!paymentService) {
      throw new PaymentServiceNotFound();
    }

    paymentService.pending();

    this.paymentServiceRepository.save(paymentService);

    return {
      paymentService,
    };
  }
}
