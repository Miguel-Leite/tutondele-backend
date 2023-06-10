import { Args, Mutation, Query } from '@nestjs/graphql';

import { CreateLicense } from '@app/use-cases/licenses/create-license';
import { GetAllLicenses } from '@app/use-cases/licenses/get-all-licenses';
import { GetByIdLicense } from '@app/use-cases/licenses/get-by-id-license';
import { RemoveLicense } from '@app/use-cases/licenses/remove-license';
import { UpdateLicense } from '@app/use-cases/licenses/update-license';

import { LicenseModel } from '../dtos/models/license-model';
import { CreateLicenseInput } from '../dtos/inputs/create-license-input';
import { UpdateLicenseInput } from '../dtos/inputs/update-license-input';

export class LicensesResolver {
  constructor(
    private getAllLicenses: GetAllLicenses,
    private getByIdLicense: GetByIdLicense,
    private createLicense: CreateLicense,
    private updateLicense: UpdateLicense,
    private removeLicense: RemoveLicense,
  ) {}

  @Query(() => [LicenseModel])
  async licenses() {
    const { licenses } = await this.getAllLicenses.execute();
    return licenses;
  }

  @Query(() => LicenseModel)
  async license(@Args('id') id: string) {
    const { license } = await this.getByIdLicense.execute(id);
    return license;
  }

  @Mutation(() => LicenseModel)
  async addLicense(@Args('data') data: CreateLicenseInput) {
    const { license } = await this.createLicense.execute(data);

    return license;
  }

  @Mutation(() => LicenseModel)
  async editLicense(@Args('data') data: UpdateLicenseInput) {
    const { license } = await this.updateLicense.execute(data);

    return license;
  }

  @Mutation(() => LicenseModel)
  async deleteLicense(@Args('id') id: string) {
    const { license } = await this.removeLicense.execute(id);

    return license;
  }
}
