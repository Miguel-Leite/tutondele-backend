import { InMemoryServiceRepository } from '@test/repositories/in-memory-service-repository';
import { CreateService } from './create-service';
import { GetByIdService } from './get-by-id-service';
import { makeService } from '@test/factories/service-factory';

describe('Get by id service  use case', () => {
  it('should be able to get by id service ', async () => {
    const serviceRepository = new InMemoryServiceRepository();
    const getByIdService = new GetByIdService(serviceRepository);
    const createService = new CreateService(serviceRepository);

    const response = await createService.execute(makeService());

    const { service } = await getByIdService.execute(response.service.id);

    expect(serviceRepository.services).toHaveLength(1);
    expect(serviceRepository.services[0]).toEqual(service);
  });
});
