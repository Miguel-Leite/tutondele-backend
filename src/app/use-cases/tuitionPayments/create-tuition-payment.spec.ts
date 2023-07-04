import { InMemoryTuitionPaymentRepository } from '@test/repositories/in-memory-tuition-payment-repository';
import { makeServiceMonthly } from '@test/factories/service-monthly-factory';
import { InMemoryServiceMonthlyRepository } from '@test/repositories/in-memory-service-monthly-repository';

import { CreateServiceMonthly } from '../serviceMonthlys/create-service-monthly';
import { CreateTuitionPayment } from './create-tuition-payment';

describe('Create Tuition Payment use case', () => {
  it('should be able to create a Tuition Payment', async () => {
    const serviceMonthlyRepository = new InMemoryServiceMonthlyRepository();
    const tuitionPaymentRepository = new InMemoryTuitionPaymentRepository();
    const createServiceMonthly = new CreateServiceMonthly(
      serviceMonthlyRepository,
    );
    const createTuitionPayment = new CreateTuitionPayment(
      tuitionPaymentRepository,
      serviceMonthlyRepository,
    );

    const { serviceMonthly } = await createServiceMonthly.execute(
      makeServiceMonthly(),
    );

    const { tuitionPayment } = await createTuitionPayment.execute({
      servicesMonthlysId: serviceMonthly.id,
      month: 1,
      studentsId: 'example-students-id',
      value: 18000,
      organizationsId: serviceMonthly.organizationsId,
    });

    expect(tuitionPaymentRepository.tuitionPayments).toHaveLength(1);
    expect(tuitionPaymentRepository.tuitionPayments[0]).toEqual(tuitionPayment);
  });
});
