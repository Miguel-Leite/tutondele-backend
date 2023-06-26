import { Payment } from './payment';

describe('Payment', () => {
  it('should be able to create a payment ', () => {
    const paymentService = new Payment({
      paymentsId: 'example-payment-id',
      organizationsId: 'example-organizations-id',
      value: 32000,
    });
    expect(paymentService).toBeTruthy();
  });
});
