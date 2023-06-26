import { Injectable } from '@nestjs/common';

import { PaymentServiceMonthly } from '@app/entities/payment-service-monthly';
import { PaymentServiceMonthlyRepository } from '@app/repositories/payment-service-monthly-repository';
import { ServiceMonthlyRepository } from '@app/repositories/service-monthly-repository';
import { generateCode } from '@helpers/generate-code';

import { ReferencePaymentServiceMonthlyAlreadyExists } from './errors/reference-payment-service-monthly-already-exists';
import { ServiceMonthlyNotFound } from '../serviceMonthlys/errors/service-monthly-not-found';

interface CreatePaymentServiceMonthlyRequest {
  studentsId: string;
  organizationsId: string;
  servicesMonthlysId: string;
  value: number;
  iban: string;
  account_number: string;
  reference: string;
}

interface CreatePaymentServiceMonthlyResponse {
  paymentServiceMonthly: PaymentServiceMonthly;
}

@Injectable()
export class CreatePaymentServiceMonthly {
  constructor(
    private paymentServiceMonthlyRepository: PaymentServiceMonthlyRepository,
    private serviceMonthlyRepository: ServiceMonthlyRepository,
  ) {}

  async execute(
    request: CreatePaymentServiceMonthlyRequest,
  ): Promise<CreatePaymentServiceMonthlyResponse> {
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

    if (serviceExists.price > value) {
      throw new Error(
        'Não é possivel efectuar o pagamento, valores insuficiente!',
      );
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
      status: 'APPROVED',
    });

    await this.paymentServiceMonthlyRepository.create(paymentServiceMonthly);

    return {
      paymentServiceMonthly,
    };
  }
}
