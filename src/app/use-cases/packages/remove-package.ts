import { Injectable } from "@nestjs/common";
import { Package } from "@app/entities/package";
import { PackageRepository } from "@app/repositories/package-repository";
import { PackageNotFound } from "./errors/package-not-found";

interface RemovePackageResponse {
  package: Package | null;
}

@Injectable()
export class RemovePackage {
  constructor(
    private packageRepository: PackageRepository,
  ){}

  async execute(id: string): Promise<RemovePackageResponse> {
    const packag = await this.packageRepository.findById(id);

    if (!packag) {
      throw new PackageNotFound();
    }

    packag.remove();

    await this.packageRepository.save(packag);

    return {
      package: packag
    }
  }
}
