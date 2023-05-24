import { InMemoryPackageRepository } from "@test/repositories/in-memory-package-repository";
import { InMemoryLicenseRepository } from "@test/repositories/in-memory-license-repository";
import { makeLicense } from "@test/factories/license-factory";
import { makePackage } from "@test/factories/package-factory";

import { CreatePackage } from "../packages/create-package";
import { CreateLicense } from "./create-license";
import { PackageNotFound } from "../packages/errors/package-not-found";


describe('Create license use case', () => {
  it('should be able to create a license', async () => {
    const packageRepository = new InMemoryPackageRepository();
    const licenseRepository = new InMemoryLicenseRepository();
    const createPackage     = new CreatePackage(packageRepository);
    const createLicense     = new CreateLicense(licenseRepository,packageRepository);
    
    const responsePackage   = await createPackage.execute(makePackage())
    const { license }       = await createLicense.execute(makeLicense({
      packagesId: responsePackage.package.id,
    }));

    expect(licenseRepository.licenses).toHaveLength(1)
    expect(licenseRepository.licenses[0]).toEqual(license)
  });

  it('should not be able to create a license', async () => {
    const packageRepository = new InMemoryPackageRepository();
    const licenseRepository = new InMemoryLicenseRepository();
    const createLicense     = new CreateLicense(licenseRepository,packageRepository);

    expect(async () => {
      await createLicense.execute(makeLicense())
    }).rejects.toThrow(PackageNotFound);
  });
});
