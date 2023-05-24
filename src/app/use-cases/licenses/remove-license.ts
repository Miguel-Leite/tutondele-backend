import { Injectable } from "@nestjs/common";
import { License } from "@app/entities/license";
import { LicenseRepository } from "@app/repositories/license-repository";
import { LicenseNotFound } from "./errors/license-not-found";

interface UpdateLicenseResponse {
  license: License;
}

@Injectable()
export class RemoveLicense {
  constructor (
    private licenseRepository: LicenseRepository,
  ) {}

  async execute(id: string): Promise<UpdateLicenseResponse> {

    const license = await this.licenseRepository.findById(id);

    if (!license) {
      throw new LicenseNotFound();
    }

    license.remove();

    await this.licenseRepository.save(license);

    return {
      license
    }
  }
}
