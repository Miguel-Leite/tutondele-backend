import { Injectable } from '@nestjs/common';
import { PaymentService } from '@app/entities/payment-service';
import { PaymentServiceRepository } from '@app/repositories/payment-service-repository';

import { PaymentServiceNotFound } from './errors/payment-service-not-found';

interface RemovePaymentServiceResponse {
  paymentService: PaymentService;
}

@Injectable()
export class RemovePaymentService {
  constructor(private paymentServiceRepository: PaymentServiceRepository) {}

  async execute(id: string): Promise<RemovePaymentServiceResponse> {
    const paymentService = await this.paymentServiceRepository.findById(id);

    if (!paymentService) {
      throw new PaymentServiceNotFound();
    }

    paymentService.remove();

    await this.paymentServiceRepository.save(paymentService);

    return {
      paymentService,
    };
  }
}
