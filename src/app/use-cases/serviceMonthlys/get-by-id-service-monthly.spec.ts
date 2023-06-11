import { InMemoryServiceMonthlyRepository } from '@test/repositories/in-memory-service-monthly-repository';
import { CreateServiceMonthly } from './create-service-monthly';
import { GetByIdServiceMonthly } from './get-by-id-service-monthly';
import { makeServiceMonthly } from '@test/factories/service-monthly-factory';

describe('Get by id service monthly use case', () => {
  it('should be able to get by id service monthly', async () => {
    const serviceMonthlyRepository = new InMemoryServiceMonthlyRepository();
    const getByIdServiceMonthly = new GetByIdServiceMonthly(
      serviceMonthlyRepository,
    );
    const createServiceMonthly = new CreateServiceMonthly(
      serviceMonthlyRepository,
    );

    const response = await createServiceMonthly.execute(makeServiceMonthly());

    const { serviceMonthly } = await getByIdServiceMonthly.execute(
      response.serviceMonthly.id,
    );

    expect(serviceMonthlyRepository.serviceMonthlys).toHaveLength(1);
    expect(serviceMonthlyRepository.serviceMonthlys[0]).toEqual(serviceMonthly);
  });
});
