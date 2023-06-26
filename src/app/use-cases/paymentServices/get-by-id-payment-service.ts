import { PaymentService } from '@app/entities/payment-service';
import { PaymentServiceRepository } from '@app/repositories/payment-service-repository';
import { Injectable } from '@nestjs/common';

interface GetByIdPaymentServiceResponse {
  paymentService: PaymentService | null;
}

@Injectable()
export class GetByIdPaymentService {
  constructor(private paymentServiceRepository: PaymentServiceRepository) {}

  async execute(id: string): Promise<GetByIdPaymentServiceResponse> {
    const paymentService = await this.paymentServiceRepository.findById(id);

    return {
      paymentService,
    };
  }
}
