import { Injectable } from '@nestjs/common';

import { PaymentServiceMonthly } from '@app/entities/payment-service-monthly';
import { PaymentServiceMonthlyRepository } from '@app/repositories/payment-service-monthly-repository';
import { ServiceMonthlyRepository } from '@app/repositories/service-monthly-repository';
import { generateCode } from '@helpers/generate-code';

import { ReferencePaymentServiceMonthlyAlreadyExists } from './errors/reference-payment-service-monthly-already-exists';
import { ServiceMonthlyNotFound } from '../serviceMonthlys/errors/service-monthly-not-found';

interface CreatePaymentServiceMonthlyPersonalizedRequest {
  studentsId: string;
  organizationsId: string;
  servicesMonthlysId: string;
  value: number;
  iban: string;
  account_number: string;
  reference: string;
}

interface CreatePaymentServiceMonthlyPersonalizedResponse {
  paymentServiceMonthly: PaymentServiceMonthly;
}

@Injectable()
export class CreatePaymentServiceMonthlyPersonalized {
  constructor(
    private paymentServiceMonthlyRepository: PaymentServiceMonthlyRepository,
    private serviceMonthlyRepository: ServiceMonthlyRepository,
  ) {}

  async execute(
    request: CreatePaymentServiceMonthlyPersonalizedRequest,
  ): Promise<CreatePaymentServiceMonthlyPersonalizedResponse> {
    const {
      account_number,
      iban,
      organizationsId,
      servicesMonthlysId,
      reference,
      studentsId,
      value,
    } = request;

    const referenceAlreadyExists =
      await this.paymentServiceMonthlyRepository.findByReference(reference);

    if (referenceAlreadyExists) {
      throw new ReferencePaymentServiceMonthlyAlreadyExists();
    }

    const serviceExists = await this.serviceMonthlyRepository.findById(
      servicesMonthlysId,
    );

    if (!serviceExists) {
      throw new ServiceMonthlyNotFound();
    }

    const paymentServiceMonthly = new PaymentServiceMonthly({
      code: generateCode(10),
      account_number,
      iban,
      organizationsId,
      reference,
      servicesMonthlysId,
      studentsId,
      value,
      status: 'PENDING',
    });
    console.log(paymentServiceMonthly.status);
    await this.paymentServiceMonthlyRepository.create(paymentServiceMonthly);

    return {
      paymentServiceMonthly,
    };
  }
}
