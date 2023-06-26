import { InMemoryPackageRepository } from '@test/repositories/in-memory-package-repository';
import { InMemoryLicenseRepository } from '@test/repositories/in-memory-license-repository';
import { makeLicense } from '@test/factories/license-factory';
import { makePackage } from '@test/factories/package-factory';

import { CreatePackage } from '../packages/create-package';
import { CreateLicense } from './create-license';
import { GetAllLicenses } from './get-all-licenses';

describe('Get all licenses use case', () => {
  it('should be able to get all licenses', async () => {
    const packageRepository = new InMemoryPackageRepository();
    const licenseRepository = new InMemoryLicenseRepository();
    const createPackage = new CreatePackage(packageRepository);
    const createLicense = new CreateLicense(
      licenseRepository,
      packageRepository,
    );
    const getAllLicenses = new GetAllLicenses(licenseRepository);
    const responsePackage = await createPackage.execute(makePackage());
    const { license } = await createLicense.execute(
      makeLicense({
        startDate: new Date('2023/05/01'),
        packagesId: responsePackage.package.id,
      }),
    );

    const { licenses } = await getAllLicenses.execute();

    expect(licenses).toHaveLength(1);
    expect(licenses?.[0]).toEqual(license);
  });
});
