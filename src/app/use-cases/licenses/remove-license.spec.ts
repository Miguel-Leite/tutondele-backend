import { InMemoryPackageRepository } from "@test/repositories/in-memory-package-repository";
import { InMemoryLicenseRepository } from "@test/repositories/in-memory-license-repository";
import { makeLicense } from "@test/factories/license-factory";
import { makePackage } from "@test/factories/package-factory";

import { CreatePackage } from "../packages/create-package";
import { CreateLicense } from "./create-license";
import { RemoveLicense } from "./remove-license";


describe('Remove license use case', () => {
  it('should be able to remove license', async () => {
    const packageRepository = new InMemoryPackageRepository();
    const licenseRepository = new InMemoryLicenseRepository();
    const createPackage     = new CreatePackage(packageRepository);
    const createLicense     = new CreateLicense(licenseRepository,packageRepository);
    const removeLicense     = new RemoveLicense(licenseRepository);

    const responsePackage   = await createPackage.execute(makePackage())
    
    const response          = await createLicense.execute(makeLicense({
      packagesId: responsePackage.package.id,
    }));


    const { license }       = await removeLicense.execute(response.license.id);
    
    expect(license.removed).toEqual(expect.any(Date))
  });
});
