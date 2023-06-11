import { Injectable } from '@nestjs/common';

import { ServiceMonthlyRepository } from '@app/repositories/service-monthly-repository';
import { ServiceMonthly } from '@app/entities/service-monthly';

interface GetByIdServiceMonthlyResponse {
  serviceMonthly: ServiceMonthly | null;
}

@Injectable()
export class GetByIdServiceMonthly {
  constructor(private serviceMonthlyRepository: ServiceMonthlyRepository) {}

  async execute(id: string): Promise<GetByIdServiceMonthlyResponse> {
    const serviceMonthly = await this.serviceMonthlyRepository.findById(id);

    return {
      serviceMonthly,
    };
  }
}
