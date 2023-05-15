import { InCharge } from "./inCharge";

describe('InCharge', () => {
  it('should be able to create a inCharge', () => {
    const inCharge = new InCharge({
      organizationsId: 'example-organization-id',
      personsId: 'example-person-id',
    });
    expect(inCharge).toBeTruthy();
  });
});
