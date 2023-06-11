import { makeServiceMonthly } from '@test/factories/service-monthly-factory';
import { InMemoryPaymentServiceMonthlyRepository } from '@test/repositories/in-memory-payment-service-monthly-repository';
import { CreatePaymentServiceMonthly } from './create-payment-service-monthly';
import { InMemoryServiceMonthlyRepository } from '@test/repositories/in-memory-service-monthly-repository';
import { CreateServiceMonthly } from '../serviceMonthlys/create-service-monthly';
import { RemovePaymentServiceMonthly } from './remove-payment-service-monthly';

describe('Remove payment monthly use case', () => {
  it('should be able to remove payment monthly', async () => {
    const serviceMonthlyRepository = new InMemoryServiceMonthlyRepository();
    const paymentServiceMonthlyRepository =
      new InMemoryPaymentServiceMonthlyRepository();
    const createServiceMonthly = new CreateServiceMonthly(
      serviceMonthlyRepository,
    );
    const createPaymentServiceMonthly = new CreatePaymentServiceMonthly(
      paymentServiceMonthlyRepository,
      serviceMonthlyRepository,
    );
    const removePaymentServiceMonthly = new RemovePaymentServiceMonthly(
      paymentServiceMonthlyRepository,
    );

    const { serviceMonthly } = await createServiceMonthly.execute(
      makeServiceMonthly(),
    );

    const created = await createPaymentServiceMonthly.execute({
      servicesMonthlysId: serviceMonthly.id,
      account_number: '4565906632',
      iban: '00060000058959393',
      studentsId: 'example-students-id',
      reference: '3456',
      value: 18000,
      organizationsId: serviceMonthly.organizationsId,
    });

    const { paymentServiceMonthly } = await removePaymentServiceMonthly.execute(
      created.paymentServiceMonthly.id,
    );

    expect(paymentServiceMonthlyRepository.paymentServiceMonthlys).toHaveLength(
      1,
    );
    expect(paymentServiceMonthlyRepository.paymentServiceMonthlys?.[0]).toEqual(
      paymentServiceMonthly,
    );
  });
});
