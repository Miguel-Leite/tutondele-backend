import { InMemoryServiceRepository } from '@test/repositories/in-memory-service-repository';
import { makeService } from '@test/factories/service-factory';

import { CreateService } from './create-service';
import { RemoveService } from './remove-service';

describe('Create service s use case', () => {
  it('should be able to create service s', async () => {
    const serviceRepository = new InMemoryServiceRepository();
    const removeServices = new RemoveService(serviceRepository);
    const createService = new CreateService(serviceRepository);

    const response = await createService.execute(makeService());

    const { service } = await removeServices.execute(response.service.id);

    expect(serviceRepository.services[0]).toEqual(service);
  });
});
