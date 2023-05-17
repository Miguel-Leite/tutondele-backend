import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { OrganizationModel } from '../dtos/models/organization-model';
import { CreateOrganizationInput } from '../dtos/inputs/create-organization-input';
import { GetAllOrganizations } from '@app/use-cases/organizations/get-all-organizations';
import { CreateOrganization } from '@app/use-cases/organizations/create-organization';

@Resolver(() => OrganizationModel)
export class OrganizationsResolver {
  constructor(
    private getAllOrganizations: GetAllOrganizations,
    private createOrganization: CreateOrganization,
  ) {}
  @Query(() => [OrganizationModel])
  async organizations() {
    const { organizations } = await this.getAllOrganizations.execute();
    return organizations;
  }

  @Mutation(() => OrganizationModel)
  async organizationCreate(@Args('data') data: CreateOrganizationInput) {
    const { organization } = await this.createOrganization.execute(data);
    return organization;
  }
}
