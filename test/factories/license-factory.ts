import { License, LicensesProps } from "@app/entities/license";


type Override = Partial<LicensesProps>;

export function makeLicense(override: Override = {}) {
  return new License({
    startDate: new Date(),
    endDate: new Date(),
    packagesId: 'example-package-id',
    ...override,
  });
}
