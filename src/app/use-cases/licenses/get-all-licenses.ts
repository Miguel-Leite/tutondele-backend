import { Injectable } from '@nestjs/common';
import { License } from '@app/entities/license';
import { LicenseRepository } from '@app/repositories/license-repository';

interface GetAllLicensesResponse {
  licenses: License[] | null;
}

@Injectable()
export class GetAllLicenses {
  constructor(private licenseRepository: LicenseRepository) {}

  async execute(): Promise<GetAllLicensesResponse> {
    const licenses = await this.licenseRepository.findAll();
    return {
      licenses,
    };
  }
}
