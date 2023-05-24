import { Injectable } from "@nestjs/common";
import { Package } from "@app/entities/package";
import { PackageRepository } from "@app/repositories/package-repository";
import { PackageNotFound } from "./errors/package-not-found";

interface GetByIdPackageResponse {
  package: Package | null;
}

@Injectable()
export class GetByIdPackage {
  constructor(
    private packageRepository: PackageRepository,
  ){}

  async execute(id: string): Promise<GetByIdPackageResponse> {
    const packag = await this.packageRepository.findById(id);

    if (!packag) {
      throw new PackageNotFound();
    }

    return {
      package: packag
    }
  }
}
