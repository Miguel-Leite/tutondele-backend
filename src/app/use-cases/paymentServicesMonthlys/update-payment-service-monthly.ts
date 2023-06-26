import { Injectable } from '@nestjs/common';

import { PaymentServiceMonthly } from '@app/entities/payment-service-monthly';
import { PaymentServiceMonthlyRepository } from '@app/repositories/payment-service-monthly-repository';
import { ServiceMonthlyRepository } from '@app/repositories/service-monthly-repository';
import { generateCode } from '@helpers/generate-code';

import { ServiceMonthlyNotFound } from '../serviceMonthlys/errors/service-monthly-not-found';
import { PaymentServiceMonthlyNotFound } from './errors/payment-service-monthly-not-found';

interface UpdatePaymentServiceMonthlyRequest {
  id: string;
  studentsId: string;
  organizationsId: string;
  servicesMonthlysId: string;
  value: number;
  iban: string;
  account_number: string;
  reference: string;
}

interface UpdatePaymentServiceMonthlyResponse {
  paymentServiceMonthly: PaymentServiceMonthly;
}

@Injectable()
export class UpdatePaymentServiceMonthly {
  constructor(
    private paymentServiceMonthlyRepository: PaymentServiceMonthlyRepository,
    private serviceMonthlyRepository: ServiceMonthlyRepository,
  ) {}

  async execute(
    request: UpdatePaymentServiceMonthlyRequest,
  ): Promise<UpdatePaymentServiceMonthlyResponse> {
    const {
      id,
      account_number,
      iban,
      organizationsId,
      servicesMonthlysId,
      reference,
      studentsId,
      value,
    } = request;

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

    const paymentServiceMonthlyExists =
      await this.paymentServiceMonthlyRepository.findById(id);

    if (!paymentServiceMonthlyExists) {
      throw new PaymentServiceMonthlyNotFound();
    }

    const paymentServiceMonthly = new PaymentServiceMonthly(
      {
        code: generateCode(10),
        account_number,
        iban,
        organizationsId,
        reference,
        servicesMonthlysId,
        studentsId,
        value,
        status: paymentServiceMonthlyExists.status,
      },
      id,
    );

    await this.paymentServiceMonthlyRepository.save(paymentServiceMonthly);

    return {
      paymentServiceMonthly,
    };
  }
}
