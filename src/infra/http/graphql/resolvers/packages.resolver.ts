import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreatePackage } from '@app/use-cases/packages/create-package';
import { GetAllPackages } from '@app/use-cases/packages/get-all-packages';
import { GetByIdPackage } from '@app/use-cases/packages/get-by-id-package';
import { RemovePackage } from '@app/use-cases/packages/remove-package';
import { UpdatePackage } from '@app/use-cases/packages/update-package';

import { PackageModel } from '../dtos/models/package-model';
import { CreatePackageInput } from '../dtos/inputs/create-package-input';
import { UpdatePackageInput } from '../dtos/inputs/update-package-input';

@Resolver()
export class PackagesResolver {
  constructor(
    private getAllPackages: GetAllPackages,
    private getByIdPackage: GetByIdPackage,
    private createPackage: CreatePackage,
    private updatePackage: UpdatePackage,
    private removePackage: RemovePackage,
  ) {}

  @Query(() => [PackageModel])
  async packages() {
    const { packages } = await this.getAllPackages.execute();
    return packages;
  }

  @Query(() => PackageModel)
  async package(@Args('id') id: string) {
    const response = await this.getByIdPackage.execute(id);
    return response.package;
  }

  @Mutation(() => PackageModel)
  async addPackage(@Args('data') data: CreatePackageInput) {
    const response = await this.createPackage.execute(data);

    return response.package;
  }

  @Mutation(() => PackageModel)
  async editPackage(@Args('data') data: UpdatePackageInput) {
    const response = await this.updatePackage.execute(data);

    return response.package;
  }

  @Mutation(() => PackageModel)
  async deleteCategory(@Args('id') id: string) {
    const response = await this.removePackage.execute(id);

    return response.package;
  }
}
