import { Injectable } from '@nestjs/common';

import { ServiceMonthlyRepository } from '@app/repositories/service-monthly-repository';
import { ServiceMonthly } from '@app/entities/service-monthly';
import { ServiceMonthlyAlreadyExists } from './errors/service-monthly-already-exists';
import { createProduct } from '@helpers/stripe-payment';

interface CreateServiceMonthlyRequest {
  service: string;
  price: number;
  organizationsId: string;
}

interface CreateServiceMonthlyResponse {
  serviceMonthly: ServiceMonthly;
}

@Injectable()
export class CreateServiceMonthly {
  constructor(private serviceMonthlyRepository: ServiceMonthlyRepository) {}

  async execute(
    request: CreateServiceMonthlyRequest,
  ): Promise<CreateServiceMonthlyResponse> {
    const { service, price, organizationsId } = request;

    const serviceMonthlyExists =
      await this.serviceMonthlyRepository.findByService(service);

    if (serviceMonthlyExists) {
      throw new ServiceMonthlyAlreadyExists();
    }

    const { link } = await createProduct({
      name: service,
      organizationsId,
      usdAmount: price,
    });

    const serviceMonthly = new ServiceMonthly({
      link,
      service,
      price,
      organizationsId,
    });

    await this.serviceMonthlyRepository.create(serviceMonthly);

    return {
      serviceMonthly,
    };
  }
}
