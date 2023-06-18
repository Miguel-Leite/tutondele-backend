import { Persons as RawPerson } from '@prisma/client';
import { Person } from '@app/entities/person';
import { Bi } from '@app/entities/bi';

export class PrismaPersonMapper {
  static toPrisma(person: Person) {
    return {
      id: person.id,
      firstName: person.firstName,
      lastName: person.lastName,
      addressesId: person.addressesId,
      avatarsId: person.avatarsId,
      bi: person.bi,
      email: person.email,
      phone: person.phone,
      removed: person.removed,
      created_at: person.created_at,
      updated_at: person.updated_at,
    };
  }

  static toDomain(raw: RawPerson): Person {
    return new Person(
      {
        firstName: raw.firstName,
        lastName: raw.lastName,
        addressesId: raw.addressesId,
        avatarsId: raw.avatarsId,
        bi: raw.bi,
        email: raw.email,
        phone: raw.phone,
        removed: raw.removed,
        created_at: raw.created_at,
        updated_at: raw.updated_at,
      },
      raw.id,
    );
  }

  static toDomainList(raw: RawPerson[]): Person[] {
    return raw.map((person) => this.toDomain(person));
  }
}
