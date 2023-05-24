import { InMemoryPackageRepository } from "@test/repositories/in-memory-package-repository";
import { CreatePackage } from "./create-package";
import { makePackage } from "@test/factories/package-factory";
import { GetByIdPackage } from "./get-by-id-package";
import { PackageNotFound } from "./errors/package-not-found";


describe('Find by id package use case', () => {
  it('should be able to find by id package', async () => {
    const packageRepository = new InMemoryPackageRepository();
    const createPackage     = new CreatePackage(packageRepository);
    const getByIdPackage   = new GetByIdPackage(packageRepository);
    
    const createdPackage = await createPackage.execute(makePackage())

    const response = await getByIdPackage.execute(createdPackage.package.id);

    expect(response.package).toEqual(createdPackage.package);
  });

  it('should not be able to find by id package', async () => {
    const packageRepository = new InMemoryPackageRepository();
    const getByIdPackage   = new GetByIdPackage(packageRepository);

    expect(async () => await getByIdPackage.execute('example-package-id')).rejects.toThrow(PackageNotFound);
  });
});
