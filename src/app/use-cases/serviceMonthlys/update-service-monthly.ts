import { Injectable } from '@nestjs/common';

import { ServiceMonthlyRepository } from '@app/repositories/service-monthly-repository';
import { ServiceMonthly } from '@app/entities/service-monthly';
import { ServiceMonthlyAlreadyExists } from './errors/service-monthly-already-exists';
import { ServiceMonthlyNotFound } from './errors/service-monthly-not-found';

interface UpdateServiceMonthlyRequest {
  id: string;
  service: string;
  price: number;
  fee?: boolean | null;
  organizationsId: string;
}

interface UpdateServiceMonthlyResponse {
  serviceMonthly: ServiceMonthly;
}

@Injectable()
export class UpdateServiceMonthly {
  constructor(private serviceMonthlyRepository: ServiceMonthlyRepository) {}

  async execute(
    request: UpdateServiceMonthlyRequest,
  ): Promise<UpdateServiceMonthlyResponse> {
    const { id, service, price, fee, organizationsId } = request;

    const serviceMonthly = new ServiceMonthly(
      {
        service,
        price,
        fee,
        organizationsId,
      },
      id,
    );

    const serviceMonthlyAlreadyExists =
      await this.serviceMonthlyRepository.findByService(service);

    const serviceMonthlyExists = await this.serviceMonthlyRepository.findById(
      id,
    );

    if (!serviceMonthlyExists) {
      throw new ServiceMonthlyNotFound();
    }

    if (serviceMonthlyAlreadyExists) {
      throw new ServiceMonthlyAlreadyExists();
    }

    await this.serviceMonthlyRepository.save(serviceMonthly);

    return {
      serviceMonthly,
    };
  }
}
