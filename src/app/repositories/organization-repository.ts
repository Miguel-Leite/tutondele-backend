import { Organization } from '@app/entities/organization';

export abstract class OrganizationRepository {
  abstract findAll(): Promise<Organization[]>;
  abstract findById(organizationsId: string): Promise<Organization | null>;
  abstract create(organization: Organization): Promise<void>;
  abstract save(organization: Organization): Promise<void>;
}
