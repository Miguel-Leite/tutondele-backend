import { InMemoryServiceMonthlyRepository } from '@test/repositories/in-memory-service-monthly-repository';
import { makeServiceMonthly } from '@test/factories/service-monthly-factory';

import { CreateServiceMonthly } from './create-service-monthly';
import { GetAllServiceMonthlys } from './get-all-service-monthlys';

describe('Get all service monthlys use case', () => {
  it('should be able to get all service monthlys', async () => {
    const serviceMonthlyRepository = new InMemoryServiceMonthlyRepository();
    const getAllServiceMonthlys = new GetAllServiceMonthlys(
      serviceMonthlyRepository,
    );
    const createServiceMonthly = new CreateServiceMonthly(
      serviceMonthlyRepository,
    );

    const response = await createServiceMonthly.execute(makeServiceMonthly());

    const { serviceMonthlys } = await getAllServiceMonthlys.execute(
      'example-organizations-id',
    );

    expect(serviceMonthlys).toHaveLength(1);
    expect(serviceMonthlyRepository.serviceMonthlys[0]).toEqual(
      response.serviceMonthly,
    );
  });
});
