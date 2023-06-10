import { Injectable } from '@nestjs/common';
import { Package } from '@app/entities/package';
import { PackageRepository } from '@app/repositories/package-repository';

interface GetAllPackagesResponse {
  packages: Package[] | null;
}

@Injectable()
export class GetAllPackages {
  constructor(private packageRepository: PackageRepository) {}

  async execute(): Promise<GetAllPackagesResponse> {
    const packages = await this.packageRepository.findAll();
    return {
      packages,
    };
  }
}
