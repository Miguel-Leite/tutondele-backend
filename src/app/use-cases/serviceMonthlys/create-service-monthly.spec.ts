import { InMemoryServiceMonthlyRepository } from '@test/repositories/in-memory-service-monthly-repository';
import { CreateServiceMonthly } from './create-service-monthly';
import { makeServiceMonthly } from '@test/factories/service-monthly-factory';
import { ServiceMonthlyAlreadyExists } from './errors/service-monthly-already-exists';

describe('Create service monthly use case', () => {
  it('should be able to create a service monthly', async () => {
    const serviceMonthlyRepository = new InMemoryServiceMonthlyRepository();
    const createServiceMonthly = new CreateServiceMonthly(
      serviceMonthlyRepository,
    );

    const { serviceMonthly } = await createServiceMonthly.execute(
      makeServiceMonthly(),
    );
    expect(serviceMonthlyRepository.serviceMonthlys).toHaveLength(1);
    expect(serviceMonthlyRepository.serviceMonthlys[0]).toEqual(serviceMonthly);
  });
  it('should not be able to create a service monthly', async () => {
    const serviceMonthlyRepository = new InMemoryServiceMonthlyRepository();
    const createServiceMonthly = new CreateServiceMonthly(
      serviceMonthlyRepository,
    );

    await createServiceMonthly.execute(makeServiceMonthly());

    expect(async () => {
      await createServiceMonthly.execute(makeServiceMonthly());
    }).rejects.toThrow(ServiceMonthlyAlreadyExists);
  });
});
