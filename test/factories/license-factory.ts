import { License, LicensesProps } from '@app/entities/license';
import { generateCode } from '@helpers/generate-code';

type Override = Partial<LicensesProps>;

export function makeLicense(override: Override = {}) {
  return new License({
    startDate: new Date(),
    code: generateCode(10),
    endDate: new Date(),
    packagesId: 'example-package-id',
    ...override,
  });
}
