import { Injectable } from '@nestjs/common';
import { Organization } from '@app/entities/organization';
import { OrganizationRepository } from '@app/repositories/organization-repository';
import { LicenseRepository } from '@app/repositories/license-repository';

interface GetAllOrganizationsResponse {
  organizations: Organization[];
}

@Injectable()
export class GetAllOrganizations {
  constructor(
    private organizationRepository: OrganizationRepository,
    private licenseRepository: LicenseRepository,
  ) {}

  async execute(): Promise<GetAllOrganizationsResponse> {
    const organizations = await this.organizationRepository.findAll();
    console.log(this.licenseRepository.findAll());
    return { organizations };
  }
}
