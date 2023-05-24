import { InMemoryPackageRepository } from "@test/repositories/in-memory-package-repository";
import { CreatePackage } from "./create-package";
import { makePackage } from "@test/factories/package-factory";
import { GetAllPackages } from "./get-all-packages";


describe('Get all packages use case', () => {
  it('should be able to get all packages', async () => {
    const packageRepository = new InMemoryPackageRepository();
    const createPackage     = new CreatePackage(packageRepository);
    const getAllPackages   = new GetAllPackages(packageRepository);
    
    await createPackage.execute(makePackage())

    const { packages } = await getAllPackages.execute();

    expect(packages).toHaveLength(1)
  });
});
