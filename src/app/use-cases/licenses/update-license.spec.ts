import { InMemoryPackageRepository } from "@test/repositories/in-memory-package-repository";
import { InMemoryLicenseRepository } from "@test/repositories/in-memory-license-repository";
import { makeLicense } from "@test/factories/license-factory";
import { makePackage } from "@test/factories/package-factory";

import { CreatePackage } from "../packages/create-package";
import { CreateLicense } from "./create-license";
import { PackageNotFound } from "../packages/errors/package-not-found";
import { UpdateLicense } from "./update-license";
import { LicenseNotFound } from "./errors/license-not-found";


describe('Update license use case', () => {
  it('should be able to update a license', async () => {
    const packageRepository = new InMemoryPackageRepository();
    const licenseRepository = new InMemoryLicenseRepository();
    const createPackage = new CreatePackage(packageRepository);
    const createLicense = new CreateLicense(licenseRepository, packageRepository);
    const updateLicense = new UpdateLicense(licenseRepository, packageRepository);

    const responsePackage = await createPackage.execute(makePackage())
    const responseLicense = await createLicense.execute(makeLicense({
      packagesId: responsePackage.package.id,
    }));

    const { license } = await updateLicense.execute({
      id: responseLicense.license.id,
      endDate: new Date(),
      startDate: new Date(),
      packagesId: responsePackage.package.id,
    })

    expect(licenseRepository.licenses[0].code).toEqual(responseLicense.license.code)
    expect(licenseRepository.licenses[0]).toEqual(license)
  });

  it('should not be able to update a license, license not found', async () => {
    const packageRepository = new InMemoryPackageRepository();
    const licenseRepository = new InMemoryLicenseRepository();
    const updateLicense = new UpdateLicense(licenseRepository, packageRepository);

    expect(async () => {
      await updateLicense.execute(makeLicense())
    }).rejects.toThrow(LicenseNotFound);
  });

  it('should not be able to update a license, package not found', async () => {
    const packageRepository = new InMemoryPackageRepository();
    const licenseRepository = new InMemoryLicenseRepository();
    const createPackage = new CreatePackage(packageRepository);
    const createLicense = new CreateLicense(licenseRepository, packageRepository);
    const updateLicense = new UpdateLicense(licenseRepository, packageRepository);

    const responsePackage = await createPackage.execute(makePackage())
    const responseLicense = await createLicense.execute(makeLicense({
      packagesId: responsePackage.package.id,
    }));

    expect(async () => {
      await updateLicense.execute({
        id: responseLicense.license.id,
        endDate: new Date(),
        startDate: new Date(),
        packagesId: 'example-package-id'
      })
    }).rejects.toThrow(PackageNotFound);
  });
});
