import { Injectable } from '@nestjs/common';
import { License } from '@app/entities/license';
import { LicenseRepository } from '@app/repositories/license-repository';
import { PackageRepository } from '@app/repositories/package-repository';
import { PackageNotFound } from '../packages/errors/package-not-found';
import { generateCode } from '@helpers/generate-code';

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
  constructor(
    private licenseRepository: LicenseRepository,
    private packageRepository: PackageRepository,
  ) {}

  async execute(request: CreateLicenseRequest): Promise<CreateLicenseResponse> {
    const { packagesId, endDate, startDate } = request;

    const license = new License({
      code: generateCode(10),
      startDate,
      endDate,
      packagesId,
    });

    const packageExists = await this.packageRepository.findById(
      license.packagesId,
    );

    if (!packageExists) {
      throw new PackageNotFound();
    }

    if (startDate >= endDate) {
      throw new Error('The start date must be before the license end date.');
    }

    const diffInMonths =
      endDate.getMonth() -
      startDate.getMonth() +
      12 * (endDate.getFullYear() - startDate.getFullYear());
    if (diffInMonths < 1) {
      throw new Error(
        'There must be a minimum difference of 1 month between the start date and end date of the license.',
      );
    }
    await this.licenseRepository.create(license);

    return {
      license,
    };
  }
}
