import { Service } from './service';

describe('Service', () => {
  it('should be able to create a service', () => {
    const service = new Service({
      name: 'Bolétim',
      organizationsId: 'example-organization-id',
      description: 'O valor do bolétim é unico para todas as classes',
      price: 2000,
    });
    expect(service).toBeTruthy();
  });
});
