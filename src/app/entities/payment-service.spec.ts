import { generateCode } from '@helpers/generate-code';
import { PaymentService } from './payment-service';

describe('Payment Services', () => {
  it('should be able to create a payment service', () => {
    const paymentService = new PaymentService({
      servicesId: 'example-services-id',
      studentsId: 'example-student-id',
      organizationsId: 'example-organizations-id',
      status: 'PENDING',
      value: 32000,
      code: generateCode(10),
    });
    expect(paymentService).toBeTruthy();
  });
});
