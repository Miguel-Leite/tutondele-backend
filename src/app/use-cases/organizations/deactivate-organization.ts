import { Injectable } from '@nestjs/common';
import { Organization } from '@app/entities/organization';
import { OrganizationRepository } from '@app/repositories/organization-repository';
import { OrganizationNotFound } from './errors/organization-not-found';

interface DeactivateOrganizationResponse {
  organization: Organization | null;
}

@Injectable()
export class DeactivateOrganization {
  constructor(private organizationRepository: OrganizationRepository) {}

  async execute(id: string): Promise<DeactivateOrganizationResponse> {
    const organization = await this.organizationRepository.findById(id);

    if (!organization) {
      throw new OrganizationNotFound();
    }

    organization.deactivate();

    await this.organizationRepository.save(organization);

    return { organization };
  }
}
