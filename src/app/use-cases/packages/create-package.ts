import { Injectable } from "@nestjs/common";
import { Package } from "@app/entities/package";
import { PackageRepository } from "@app/repositories/package-repository";
import { PackageAlreadyExists } from "./errors/package-already-exists";

interface CreatePackageRequest {
  name               : string;
  price              : number;
  students           : number;

  admins             : number;
  users              : number;

  services           : number;

  notification_email : boolean
  notification_sms   : boolean

  manual_payment     : boolean
  realtime_payment   : boolean

  security           : boolean;
}

interface CreatePackageResponse {
  package: Package;
}

@Injectable()
export class CreatePackage {
  constructor(
    private packageRepository: PackageRepository,
  ){}

  async execute(request: CreatePackageRequest): Promise<CreatePackageResponse> {
    const {
      name,
      price,
      users,
      admins,
      students,
      services,
      security,
      manual_payment,
      notification_email,
      notification_sms,
      realtime_payment,
    } = request;

    const packag = new Package({
      name,
      price,
      users,
      admins,
      students,
      services,
      security,
      manual_payment,
      notification_email,
      notification_sms,
      realtime_payment
    });

    const packageAlreadyExists = await this.packageRepository.findByName(packag.name);

    if (packageAlreadyExists) {
      throw new PackageAlreadyExists();
    }

    await this.packageRepository.create(packag);

    return {
      package: packag,
    }
  }
}
