import { Injectable } from '@nestjs/common';

import { Service } from '@app/entities/service';
import { ServiceRepository } from '@app/repositories/service-repository';

interface GetAllServicesResponse {
  services: Service[] | null;
}

@Injectable()
export class GetAllServices {
  constructor(private serviceRepository: ServiceRepository) {}

  async execute(organizationsId: string): Promise<GetAllServicesResponse> {
    const services = await this.serviceRepository.findAll(organizationsId);

    return { services };
  }
}
