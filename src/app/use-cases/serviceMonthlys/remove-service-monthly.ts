import { Injectable } from '@nestjs/common';

import { ServiceMonthlyRepository } from '@app/repositories/service-monthly-repository';
import { ServiceMonthly } from '@app/entities/service-monthly';
import { ServiceMonthlyNotFound } from './errors/service-monthly-not-found';

interface RemoveServiceMonthlyResponse {
  serviceMonthly: ServiceMonthly | null;
}

@Injectable()
export class RemoveServiceMonthly {
  constructor(private serviceMonthlyRepository: ServiceMonthlyRepository) {}

  async execute(id: string): Promise<RemoveServiceMonthlyResponse> {
    const serviceMonthly = await this.serviceMonthlyRepository.findById(id);

    if (!serviceMonthly) {
      throw new ServiceMonthlyNotFound();
    }

    serviceMonthly.remove();

    await this.serviceMonthlyRepository.save(serviceMonthly);

    return {
      serviceMonthly,
    };
  }
}
