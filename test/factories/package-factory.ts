import { Package, PackagesProps } from "@app/entities/package";


type Override = Partial<PackagesProps>;

export function makePackage(override: Override = {}) {
  return new Package({
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
    ...override,
  });
}
