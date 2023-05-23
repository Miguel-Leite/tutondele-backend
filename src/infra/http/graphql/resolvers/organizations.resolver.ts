import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { GetAllOrganizations } from '@app/use-cases/organizations/get-all-organizations';
import { CreateOrganization } from '@app/use-cases/organizations/create-organization';
import { UpdateOrganization } from '@app/use-cases/organizations/update-organization';
import { RemoveOrganization } from '@app/use-cases/organizations/remove-organization';
import { ActivateOrganization } from '@app/use-cases/organizations/activate-organization';
import { DeactivateOrganization } from '@app/use-cases/organizations/deactivate-organization';

import { OrganizationModel } from '../dtos/models/organization-model';
import { UpdateOrganizationInput } from '../dtos/inputs/update-organization-input';
import { CreateOrganizationInput } from '../dtos/inputs/create-organization-input';

@Resolver(() => OrganizationModel)
export class OrganizationsResolver {
  constructor(
    private getAllOrganizations: GetAllOrganizations,
    private createOrganization: CreateOrganization,
    private updateOrganization: UpdateOrganization,
    private removeOrganization: RemoveOrganization,
    private activateOrganization: ActivateOrganization,
    private deactivateOrganization: DeactivateOrganization,
  ) {}
  @Query(() => [OrganizationModel])
  async organizations() {
    const { organizations } = await this.getAllOrganizations.execute();
    return organizations;
  }

  @Mutation(() => OrganizationModel)
  async addOrganization(@Args('data') data: CreateOrganizationInput) {
    const { organization } = await this.createOrganization.execute(data);
    return organization;
  }

  @Mutation(() => OrganizationModel)
  async editOrganization(@Args('data') data: UpdateOrganizationInput) {
    const { organization } = await this.updateOrganization.execute(data);
    return organization;
  }

  @Mutation(() => OrganizationModel)
  async enableOrganization(@Args('id') id: string) {
    const { organization } = await this.activateOrganization.execute(id);
    return organization;
  }

  @Mutation(() => OrganizationModel)
  async disableOrganization(@Args('id') id: string) {
    const { organization } = await this.deactivateOrganization.execute(id);
    return organization;
  }

  @Mutation(() => OrganizationModel)
  async deleteOrganization(@Args('id') id: string) {
    const { organization } = await this.removeOrganization.execute(id);
    return organization;
  }
}
