import { Injectable } from '@nestjs/common';

import { Service } from '@app/entities/service';
import { ServiceRepository } from '@app/repositories/service-repository';

import { ServiceNotFound } from './errors/service-not-found';

interface UpdateServiceRequest {
  id: string;
  organizationsId: string;

  name: string;
  price: number;
  description?: string;
}

interface UpdateServiceResponse {
  service: Service | null;
}

@Injectable()
export class UpdateService {
  constructor(private serviceRepository: ServiceRepository) {}

  async execute(request: UpdateServiceRequest): Promise<UpdateServiceResponse> {
    const { id, name, organizationsId, price, description } = request;

    const service = new Service(
      {
        name,
        organizationsId,
        price,
        description,
      },
      id,
    );

    const serviceExists = await this.serviceRepository.findById(id);

    if (!serviceExists) {
      throw new ServiceNotFound();
    }

    await this.serviceRepository.save(service);

    return { service };
  }
}
