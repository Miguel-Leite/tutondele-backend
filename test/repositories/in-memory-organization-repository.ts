import { Organization } from '@app/entities/organization';
import { OrganizationRepository } from '@app/repositories/organization-repository';

export class InMemoryOrganizationRepository implements OrganizationRepository {
  public organizations: Organization[] = [];
  async findById(organizationsId: string): Promise<Organization | null> {
    const organization = this.organizations.find((item) => item.id === organizationsId);

    if (!organization) {
      return null;
    }

    return organization;
  }
  
  async findAll(): Promise<Organization[]> {
    return this.organizations;
  }
  async create(organization: Organization): Promise<void> {
    this.organizations.push(organization);
  }
  async save(organization: Organization): Promise<void> {
    const organizationIndex = this.organizations.findIndex((item) => item.id === organization.id);

    if (organizationIndex >= 0) {
      this.organizations[organizationIndex] = organization;
    }
  }
}
