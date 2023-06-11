import { generateCode } from '@helpers/generate-code';
import { PaymentServiceMonthly } from './payment-service-monthly';

describe('Payment Services Monthlys', () => {
  it('should be able to create a payment service monthly', () => {
    const paymentServiceMonthly = new PaymentServiceMonthly({
      code: generateCode(10),
      account_number: '123454465',
      iban: '000600000453345280111',
      reference: '2434',
      servicesMonthlysId: 'example-servicesMonthlys-id',
      studentsId: 'example-student-id',
      organizationsId: 'example-organizations-id',
      value: 32000,
    });
    expect(paymentServiceMonthly).toBeTruthy();
  });
});
