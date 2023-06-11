import { Injectable } from '@nestjs/common';

import { Service } from '@app/entities/service';
import { ServiceRepository } from '@app/repositories/service-repository';

interface GetByIdServiceResponse {
  service: Service | null;
}

@Injectable()
export class GetByIdService {
  constructor(private serviceRepository: ServiceRepository) {}

  async execute(id: string): Promise<GetByIdServiceResponse> {
    const service = await this.serviceRepository.findById(id);

    return { service };
  }
}
