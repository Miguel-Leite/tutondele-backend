import { InMemoryPackageRepository } from "@test/repositories/in-memory-package-repository";
import { CreatePackage } from "./create-package";
import { makePackage } from "@test/factories/package-factory";
import { PackageAlreadyExists } from "./errors/package-already-exists";


describe('Create package use case', () => {
  it('should be able to create a package', async () => {
    const packageRepository = new InMemoryPackageRepository();
    const createPackage     = new CreatePackage(packageRepository);
    
    const response = await createPackage.execute(makePackage())

    expect(packageRepository.packages).toHaveLength(1)
    expect(packageRepository.packages[0]).toEqual(response.package)
  });

  it('should not be able to create a package', async () => {
    const packageRepository = new InMemoryPackageRepository();
    const createPackage     = new CreatePackage(packageRepository);
    
    await createPackage.execute(makePackage())

    expect(
      async () => await createPackage.execute(makePackage())
    ).rejects.toThrow(PackageAlreadyExists);
  });
});
