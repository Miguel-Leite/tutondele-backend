import { InMemoryPackageRepository } from "@test/repositories/in-memory-package-repository";
import { InMemoryLicenseRepository } from "@test/repositories/in-memory-license-repository";
import { makeLicense } from "@test/factories/license-factory";
import { makePackage } from "@test/factories/package-factory";

import { CreatePackage } from "../packages/create-package";
import { CreateLicense } from "./create-license";
import { GetByIdLicense } from "./get-by-id-license";


describe('Get by id license use case', () => {
  it('should be able to get by id license', async () => {
    const packageRepository = new InMemoryPackageRepository();
    const licenseRepository = new InMemoryLicenseRepository();
    const createPackage     = new CreatePackage(packageRepository);
    const createLicense     = new CreateLicense(licenseRepository,packageRepository);
    const getByIdLicense    = new GetByIdLicense(licenseRepository);
    const responsePackage   = await createPackage.execute(makePackage())
    
    const response          = await createLicense.execute(makeLicense({
      packagesId: responsePackage.package.id,
    }));


    const { license }      = await getByIdLicense.execute(response.license.id);
    
    expect(licenseRepository.licenses).toHaveLength(1)
    expect(licenseRepository.licenses[0]).toEqual(license)
  });
});
