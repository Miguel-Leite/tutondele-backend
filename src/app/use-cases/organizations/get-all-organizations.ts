import { Injectable } from '@nestjs/common';
import { Organization } from '@app/entities/organization';
import { OrganizationRepository } from '@app/repositories/organization-repository';

interface GetAllOrganizationsResponse {
  organizations: Organization[];
}

@Injectable()
export class GetAllOrganizations {
  constructor(private organizationRepository: OrganizationRepository) {}

  async execute(): Promise<GetAllOrganizationsResponse> {
    const organizations = await this.organizationRepository.findAll();
    return { organizations };
  }
}
