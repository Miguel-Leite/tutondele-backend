import { InMemoryServiceMonthlyRepository } from '@test/repositories/in-memory-service-monthly-repository';
import { makeServiceMonthly } from '@test/factories/service-monthly-factory';

import { CreateServiceMonthly } from './create-service-monthly';
import { RemoveServiceMonthly } from './remove-service-monthly';

describe('Create service monthlys use case', () => {
  it('should be able to create service monthlys', async () => {
    const serviceMonthlyRepository = new InMemoryServiceMonthlyRepository();
    const removeServiceMonthlys = new RemoveServiceMonthly(
      serviceMonthlyRepository,
    );
    const createServiceMonthly = new CreateServiceMonthly(
      serviceMonthlyRepository,
    );

    const response = await createServiceMonthly.execute(makeServiceMonthly());

    const { serviceMonthly } = await removeServiceMonthlys.execute(
      response.serviceMonthly.id,
    );

    expect(serviceMonthlyRepository.serviceMonthlys).toHaveLength(1);
    expect(serviceMonthlyRepository.serviceMonthlys[0]).toEqual(serviceMonthly);
  });
});
