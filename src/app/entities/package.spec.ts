import { Package } from "./package";

describe('Package', () => {
  it('should be able to create a package', () => {
    const packag = new Package({
      name: 'My Package',
      users: 10,
      admins: 2,
      price: 100,
      services: 16,
      students: 300,
      manual_payment: true,
      notification_email: true,
      notification_sms: true,
      realtime_payment: true,
      security: true,
    });
    expect(packag).toBeTruthy();
  });
});
