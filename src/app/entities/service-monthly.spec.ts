import { ServiceMonthly } from './service-monthly';

describe('Service Monthly', () => {
  it('should be able to create a service monthly', () => {
    const serviceMonthly = new ServiceMonthly({
      organizationsId: 'example-organizations-id',
      price: 17000,
      service: 'Propina da 13ª classe',
    });

    expect(serviceMonthly).toBeTruthy();
  });
});
