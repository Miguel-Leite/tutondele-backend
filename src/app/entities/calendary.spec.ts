import { Calendary } from "./calendary";

describe('Calendary', () => {
  it('should be able to create a calendary', () => {
    const calendary = new Calendary({
      organizationsId: 'example-organization-id',
      date_start: new Date(),
      date_end: new Date(),
    });
    expect(calendary).toBeTruthy();
  });
});
