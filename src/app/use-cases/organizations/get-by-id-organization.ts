import { Injectable } from '@nestjs/common';
import { Organization } from '@app/entities/organization';
import { OrganizationRepository } from '@app/repositories/organization-repository';
import { OrganizationNotFound } from './errors/organization-not-found';

interface GetByIdOrganizationResponse {
  organization: Organization | null;
}

@Injectable()
export class GetByIdOrganization {
  constructor(private organizationRepository: OrganizationRepository) {}

  async execute(id: string): Promise<GetByIdOrganizationResponse> {
    const organization = await this.organizationRepository.findById(id);

    if (!organization) {
      throw new OrganizationNotFound();
    }

    return { organization };
  }
}
