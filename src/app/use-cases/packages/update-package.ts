import { Injectable } from "@nestjs/common";
import { Package } from "@app/entities/package";
import { PackageRepository } from "@app/repositories/package-repository";
import { PackageNotFound } from "./errors/package-not-found";

interface UpdatePackageRequest {
  id               : string;
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

interface UpdatePackageResponse {
  package: Package;
}

@Injectable()
export class UpdatePackage {
  constructor(
    private packageRepository: PackageRepository,
  ){}

  async execute(request: UpdatePackageRequest): Promise<UpdatePackageResponse> {
    const {
      id,
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

    const packageExists = await this.packageRepository.findById(id);

    if (!packageExists) {
      throw new PackageNotFound();
    }

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
    },id);

    await this.packageRepository.save(packag);

    return {
      package: packag,
    }
  }
}
