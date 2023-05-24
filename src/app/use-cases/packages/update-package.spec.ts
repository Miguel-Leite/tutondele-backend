import { InMemoryPackageRepository } from "@test/repositories/in-memory-package-repository";
import { CreatePackage } from "./create-package";
import { makePackage } from "@test/factories/package-factory";
import { PackageNotFound } from "./errors/package-not-found";
import { UpdatePackage } from "./update-package";


describe('Update package use case', () => {
  it('should be able to update package', async () => {
    const packageRepository = new InMemoryPackageRepository();
    const createPackage     = new CreatePackage(packageRepository);
    const updatePackage   = new UpdatePackage(packageRepository);
    
    const createdPackage = await createPackage.execute(makePackage())
    
    const response = await updatePackage.execute({
      id: createdPackage.package.id,
      name: 'Package updated',
      users: 12,
      admins: 2,
      price: 80000,
      services: 20,
      students: 300,
      security: true,
      manual_payment: true,
      notification_sms: false,
      notification_email: true,
      realtime_payment: false,
    });

    expect(response.package.created_at).toEqual(expect.any(Date));
  });

  it('should not be able to update package', async () => {
    const packageRepository = new InMemoryPackageRepository();
    const updatePackage   = new UpdatePackage(packageRepository);

    expect(async () => await updatePackage.execute({
      id: 'example-package-id',
      name: 'Package updated',
      users: 12,
      admins: 2,
      price: 80000,
      services: 20,
      students: 300,
      security: true,
      manual_payment: true,
      notification_sms: false,
      notification_email: true,
      realtime_payment: false,
    })).rejects.toThrow(PackageNotFound);
  });
});
