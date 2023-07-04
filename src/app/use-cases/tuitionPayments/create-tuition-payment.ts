import { Injectable } from '@nestjs/common';

import { TuitionPayment } from '@app/entities/tuition-payment';
import { TuitionPaymentRepository } from '@app/repositories/tuition-payment-repository';

import { ServiceMonthlyRepository } from '@app/repositories/service-monthly-repository';
import { ServiceNotFound } from '../services/errors/service-not-found';

interface CreateTuitionPaymentRequest {
  organizationsId: string;
  studentsId: string;
  servicesMonthlysId: string;
  month: number;
  value: number;
}

interface CreateTuitionPaymentResponse {
  tuitionPayment: TuitionPayment;
}

@Injectable()
export class CreateTuitionPayment {
  constructor(
    private tuitionPaymentRepository: TuitionPaymentRepository,
    private serviceMonthlyRepository: ServiceMonthlyRepository,
  ) {}

  async execute(
    request: CreateTuitionPaymentRequest,
  ): Promise<CreateTuitionPaymentResponse> {
    const { month, organizationsId, studentsId, value, servicesMonthlysId } =
      request;

    const tuitionPayment = new TuitionPayment({
      month,
      organizationsId,
      studentsId,
      value,
      servicesMonthlysId,
      status: 'PENDING',
    });

    const serviceExists = await this.serviceMonthlyRepository.findById(
      servicesMonthlysId,
    );

    if (!serviceExists) {
      throw new ServiceNotFound();
    }

    if (serviceExists.price > value) {
      throw new Error(
        'Não é possivel efectuar o pagamento, valores insuficiente!',
      );
    }

    this.tuitionPaymentRepository.create(tuitionPayment);

    return { tuitionPayment };
  }
}
