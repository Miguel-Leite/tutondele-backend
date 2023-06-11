import { InMemoryServiceRepository } from '@test/repositories/in-memory-service-repository';
import { makeService } from '@test/factories/service-factory';

import { CreateService } from './create-service';
import { GetAllServices } from './get-all-services';

describe('Get all service s use case', () => {
  it('should be able to get all service s', async () => {
    const serviceRepository = new InMemoryServiceRepository();
    const getAllServices = new GetAllServices(serviceRepository);
    const createService = new CreateService(serviceRepository);

    const response = await createService.execute(makeService());

    const { services } = await getAllServices.execute(
      'example-organizations-id',
    );

    expect(services).toHaveLength(1);
    expect(serviceRepository.services[0]).toEqual(response.service);
  });
});
