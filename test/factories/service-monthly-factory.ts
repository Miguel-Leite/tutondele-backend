import {
  ServiceMonthly,
  ServiceMonthlysProps,
} from '@app/entities/service-monthly';

type Override = Partial<ServiceMonthlysProps>;

export function makeServiceMonthly(override: Override = {}) {
  return new ServiceMonthly({
    organizationsId: 'example-organizations-id',
    price: 17000,
    service: 'Propina da 13ª classe',
    created_at: new Date(),
    ...override,
  });
}
