import { Address } from './address';

describe('Address', () => {
  it('should be able to create a address', () => {
    const address = new Address({
      location: 'Luanda, Angola',
    });

    expect(address).toBeTruthy();
  });
});
