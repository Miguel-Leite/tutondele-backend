import { Service, ServicesProps } from '@app/entities/service';

type Override = Partial<ServicesProps>;

export function makeService(override: Override = {}) {
  return new Service({
    name: 'Bolétim',
    organizationsId: 'example-organizations-id',
    description: 'O valor do bolétim é unico para todas as classes',
    price: 2000,
    created_at: new Date(),
    ...override,
  });
}
