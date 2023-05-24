import { License } from "./license";


describe('License', () => {
  it('should be able to create a license', () => {
    const license = new License({
      code: '35678',
      startDate: new Date(),
      endDate: new Date(),
      packagesId: 'example-package-id',
    });
    expect(license).toBeTruthy();
  });
});
