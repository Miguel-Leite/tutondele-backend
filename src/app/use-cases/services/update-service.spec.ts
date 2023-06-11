import { InMemoryServiceRepository } from '@test/repositories/in-memory-service-repository';
import { makeService } from '@test/factories/service-factory';

import { CreateService } from './create-service';
import { UpdateService } from './update-service';

describe('Update service  use case', () => {
  it('should be able to update a service ', async () => {
    const serviceRepository = new InMemoryServiceRepository();
    const createService = new CreateService(serviceRepository);
    const updateService = new UpdateService(serviceRepository);

    const createdService = await createService.execute(makeService());

    const { service } = await updateService.execute({
      id: createdService.service.id,
      price: 18000,
      name: 'Propina da 13ª classe',
      organizationsId: 'example-organizations-id',
    });
    expect(serviceRepository.services).toHaveLength(1);
    expect(serviceRepository.services[0]).toEqual(service);
  });
});
