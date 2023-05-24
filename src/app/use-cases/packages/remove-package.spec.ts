import { InMemoryPackageRepository } from "@test/repositories/in-memory-package-repository";
import { CreatePackage } from "./create-package";
import { makePackage } from "@test/factories/package-factory";
import { PackageNotFound } from "./errors/package-not-found";
import { RemovePackage } from "./remove-package";


describe('Remove package use case', () => {
  it('should be able to remove package', async () => {
    const packageRepository = new InMemoryPackageRepository();
    const createPackage     = new CreatePackage(packageRepository);
    const removePackage   = new RemovePackage(packageRepository);
    
    const createdPackage = await createPackage.execute(makePackage())

    const response = await removePackage.execute(createdPackage.package.id);

    expect(response.package?.removed).toEqual(expect.any(Date))
  });

  it('should not be able to remove package', async () => {
    const packageRepository = new InMemoryPackageRepository();
    const removePackage   = new RemovePackage(packageRepository);

    expect(async () => await removePackage.execute('example-package-id')).rejects.toThrow(PackageNotFound);
  });
});
