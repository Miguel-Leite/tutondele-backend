import { InMemoryServiceRepository } from '@test/repositories/in-memory-service-repository';
import { CreateService } from './create-service';
import { makeService } from '@test/factories/service-factory';
import { ServiceAlreadyExists } from './errors/service-already-exists';

describe('Create service use case', () => {
  it('should be able to create a service ', async () => {
    const serviceRepository = new InMemoryServiceRepository();
    const createService = new CreateService(serviceRepository);

    const { service } = await createService.execute(makeService());

    expect(serviceRepository.services).toHaveLength(1);
    expect(serviceRepository.services[0]).toEqual(service);
  });
  it('should not be able to create a service ', async () => {
    const serviceRepository = new InMemoryServiceRepository();
    const createService = new CreateService(serviceRepository);

    await createService.execute(makeService());

    expect(async () => {
      await createService.execute(makeService());
    }).rejects.toThrow(ServiceAlreadyExists);
  });
});
