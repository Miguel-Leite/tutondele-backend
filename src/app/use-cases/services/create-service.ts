import { Injectable } from '@nestjs/common';

import { Service } from '@app/entities/service';
import { ServiceRepository } from '@app/repositories/service-repository';

import { ServiceAlreadyExists } from './errors/service-already-exists';

interface CreateServiceRequest {
  organizationsId: string;

  name: string;
  price: number;
  description?: string | null;
}

interface CreateServiceResponse {
  service: Service;
}

@Injectable()
export class CreateService {
  constructor(private serviceRepository: ServiceRepository) {}

  async execute(request: CreateServiceRequest): Promise<CreateServiceResponse> {
    const { name, organizationsId, price, description } = request;

    const service = new Service({
      name,
      organizationsId,
      price,
      description,
    });

    const serviceAlreadyExists = await this.serviceRepository.findByName(
      service.name,
    );

    if (serviceAlreadyExists) {
      throw new ServiceAlreadyExists();
    }

    await this.serviceRepository.create(service);

    return {
      service,
    };
  }
}
