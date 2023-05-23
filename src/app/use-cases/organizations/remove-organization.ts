import { Injectable } from '@nestjs/common';
import { Organization } from '@app/entities/organization';
import { OrganizationRepository } from '@app/repositories/organization-repository';
import { OrganizationNotFound } from './errors/organization-not-found';

interface RemoveOrganizationResponse {
  organization: Organization | null;
}

@Injectable()
export class RemoveOrganization {
  constructor(private organizationRepository: OrganizationRepository) {}

  async execute(id: string): Promise<RemoveOrganizationResponse> {
    const organization = await this.organizationRepository.findById(id);

    if (!organization) {
      throw new OrganizationNotFound();
    }

    organization.remove();

    await this.organizationRepository.save(organization);

    return { organization };
  }
}
