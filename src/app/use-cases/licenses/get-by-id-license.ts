import { Injectable } from "@nestjs/common";
import { License } from "@app/entities/license";
import { LicenseRepository } from "@app/repositories/license-repository";

import { LicenseNotFound } from "./errors/license-not-found";

interface GetByIdLicenseResponse {
  license: License | null;
}

@Injectable()
export class GetByIdLicense {
  constructor (private licenseRepository: LicenseRepository) {}

  async execute(id: string): Promise<GetByIdLicenseResponse> {
    const license = await this.licenseRepository.findById(id);

    if (!license) {
      throw new LicenseNotFound();
    }

    return {
      license
    };
  }
}
