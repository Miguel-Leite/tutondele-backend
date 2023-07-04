import { TuitionPayment } from './tuition-payment';

describe('Tuition Payment', () => {
  it('should be able to create a tuition payment', () => {
    const tuitionPayment = new TuitionPayment({
      organizationsId: 'example-organizations-id',
      studentsId: 'example-students-id',
      month: 1,
      value: 20000,
      servicesMonthlysId: 'example-services-id',
      status: 'PENDING',
    });
    expect(tuitionPayment).toBeTruthy();
  });
});
