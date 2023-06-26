import { PaymentService } from '@app/entities/payment-service';
import { PaymentServiceRepository } from '@app/repositories/payment-service-repository';
import { Injectable } from '@nestjs/common';

interface GetAllPaymentsServicesResponse {
  paymentServices: PaymentService[] | null;
}

@Injectable()
export class GetAllPaymentsServices {
  constructor(private paymentServiceRepository: PaymentServiceRepository) {}

  async execute(
    organizationsId: string,
  ): Promise<GetAllPaymentsServicesResponse> {
    const paymentServices = await this.paymentServiceRepository.findAll(
      organizationsId,
    );

    return {
      paymentServices,
    };
  }
}
