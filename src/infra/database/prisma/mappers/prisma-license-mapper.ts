import { Licenses as RawLicense } from '@prisma/client';
import { License } from '@app/entities/license';

export class PrismaLicenseMapper {
  static toPrisma(license: License) {
    return {
      id: license.id,
      code: license.code,
      startDate: license.startDate,
      endDate: license.endDate,
      packagesId: license.packagesId,
    };
  }

  static toDomain(raw: RawLicense): License {
    return new License(
      {
        code: raw.code,
        startDate: raw.startDate,
        endDate: raw.endDate,
        packagesId: raw.packagesId,
      },
      raw.id,
    );
  }

  static toDomainList(raw: RawLicense[]): License[] {
    return raw.map((license) => this.toDomain(license));
  }
}
