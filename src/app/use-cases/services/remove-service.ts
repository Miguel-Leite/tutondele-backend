import { Injectable } from '@nestjs/common';

import { Service } from '@app/entities/service';
import { ServiceRepository } from '@app/repositories/service-repository';

import { ServiceNotFound } from './errors/service-not-found';

interface RemoveServiceResponse {
  service: Service | null;
}

@Injectable()
export class RemoveService {
  constructor(private serviceRepository: ServiceRepository) {}

  async execute(id: string): Promise<RemoveServiceResponse> {
    const service = await this.serviceRepository.findById(id);

    if (!service) {
      throw new ServiceNotFound();
    }

    service.remove();

    await this.serviceRepository.save(service);

    return { service };
  }
}
