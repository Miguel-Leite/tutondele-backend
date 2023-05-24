import { Injectable } from "@nestjs/common";
import { License } from "@app/entities/license";
import { LicenseRepository } from "@app/repositories/license-repository";
import { PackageRepository } from "@app/repositories/package-repository";
import { PackageNotFound } from "../packages/errors/package-not-found";
import { LicenseNotFound } from "./errors/license-not-found";

interface UpdateLicenseRequest {
  id: string;
  packagesId: string;
  startDate: Date;
  endDate: Date;
}

interface UpdateLicenseResponse {
  license: License;
}

@Injectable()
export class UpdateLicense {
  constructor (
    private licenseRepository: LicenseRepository,
    private packageRepository: PackageRepository,  
  ) {}

  async execute(request: UpdateLicenseRequest): Promise<UpdateLicenseResponse> {
    const { id, packagesId, endDate, startDate } = request;

    const licenseExists = await this.licenseRepository.findById(id);

    if (!licenseExists) {
      throw new LicenseNotFound();
    }
    
    const packageExists = await this.packageRepository.findById(packagesId);

    if (!packageExists) {
      throw new PackageNotFound();
    }
    
    const license = new License({
      startDate,
      endDate,
      packagesId,
      code: licenseExists.code,
    },id);

    await this.licenseRepository.save(license);

    return {
      license
    }
  }
}
