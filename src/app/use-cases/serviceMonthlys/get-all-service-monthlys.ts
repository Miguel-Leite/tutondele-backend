import { Injectable } from '@nestjs/common';

import { ServiceMonthlyRepository } from '@app/repositories/service-monthly-repository';
import { ServiceMonthly } from '@app/entities/service-monthly';

interface GetAllServiceMonthlyResponse {
  serviceMonthlys: ServiceMonthly[] | null;
}

@Injectable()
export class GetAllServiceMonthlys {
  constructor(private serviceMonthlyRepository: ServiceMonthlyRepository) {}

  async execute(
    organizationsId: string,
  ): Promise<GetAllServiceMonthlyResponse> {
    const serviceMonthlys = await this.serviceMonthlyRepository.findAll(
      organizationsId,
    );

    return {
      serviceMonthlys,
    };
  }
}
