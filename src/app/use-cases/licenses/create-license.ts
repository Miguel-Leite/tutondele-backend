import { Injectable } from "@nestjs/common";
import { License } from "@app/entities/license";
import { LicenseRepository } from "@app/repositories/license-repository";
import { PackageRepository } from "@app/repositories/package-repository";
import { PackageNotFound } from "../packages/errors/package-not-found";

interface CreateLicenseRequest {
  packagesId: string;
  startDate: Date;
  endDate: Date;
}

interface CreateLicenseResponse {
  license: License;
}

@Injectable()
export class CreateLicense {
  constructor (
    private licenseRepository: LicenseRepository,
    private packageRepository: PackageRepository,  
  ) {}

  async execute(request: CreateLicenseRequest): Promise<CreateLicenseResponse> {
    const { packagesId, endDate, startDate } = request;

    const license = new License({
      startDate,
      endDate,
      packagesId,
    });

    const packageExists = await this.packageRepository.findById(license.packagesId);

    if (!packageExists) {
      throw new PackageNotFound();
    }
    

    await this.licenseRepository.create(license);

    return {
      license
    }
  }
}
