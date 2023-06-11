import { InMemoryServiceMonthlyRepository } from '@test/repositories/in-memory-service-monthly-repository';
import { makeServiceMonthly } from '@test/factories/service-monthly-factory';

import { CreateServiceMonthly } from './create-service-monthly';
import { UpdateServiceMonthly } from './update-service-monthly';

describe('Update service monthly use case', () => {
  it('should be able to update a service monthly', async () => {
    const serviceMonthlyRepository = new InMemoryServiceMonthlyRepository();
    const createServiceMonthly = new CreateServiceMonthly(
      serviceMonthlyRepository,
    );
    const updateServiceMonthly = new UpdateServiceMonthly(
      serviceMonthlyRepository,
    );

    const createdServiceMonthly = await createServiceMonthly.execute(
      makeServiceMonthly(),
    );

    await createServiceMonthly.execute({
      price: 18000,
      service: 'Propina da 10ª classe',
      organizationsId: 'example-organizations-id',
    });

    const { serviceMonthly } = await updateServiceMonthly.execute({
      id: createdServiceMonthly.serviceMonthly.id,
      price: 18000,
      service: 'Propina da 13ª classe',
      organizationsId: 'example-organizations-id',
    });
    expect(serviceMonthlyRepository.serviceMonthlys).toHaveLength(2);
    expect(serviceMonthlyRepository.serviceMonthlys[0]).toEqual(serviceMonthly);
  });
});
