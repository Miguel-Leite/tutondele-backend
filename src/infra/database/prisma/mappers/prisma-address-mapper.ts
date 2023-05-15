import { Addresses as RawAddress } from '@prisma/client';
import { Address } from '@app/entities/address';

export class PrismaAddressMapper {
  static toPrisma(address: Address) {
    return {
      id: address.id,
      location: address.location,
    };
  }

  static toDomain(raw: RawAddress): Address {
    return new Address(
      {
        location: raw.location,
        created_at: raw.created_at,
      },
      raw.id,
    );
  }

  static toDomainList(raw: RawAddress[]): Address[] {
    return raw.map((person) => this.toDomain(person));
  }
}
