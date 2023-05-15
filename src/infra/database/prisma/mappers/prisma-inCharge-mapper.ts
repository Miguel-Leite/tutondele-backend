import { InCharges as RawInCharge } from '@prisma/client';
import { InCharge } from '@app/entities/inCharge';

export class PrismaInChargeMapper {
  static toPrisma(inCharge: InCharge) {
    return {
      id: inCharge.id,
      personsId: inCharge.personsId,
      customersId: inCharge.customersId,
      organizationsId: inCharge.organizationsId,
      removed: inCharge.removed,
    };
  }

  static toDomain(raw: RawInCharge): InCharge {
    return new InCharge(
      {
        personsId: raw.personsId,
        customersId: raw.customersId,
        organizationsId: raw.organizationsId,
        removed: raw.removed,
      },
      raw.id,
    );
  }

  static toDomainList(raw: RawInCharge[]): InCharge[] {
    return raw.map((inCharge) => this.toDomain(inCharge));
  }
}
