import { Contacts as RawContact } from '@prisma/client';
import { Contact } from '@app/entities/contact';

export class PrismaContactMapper {
  static toPrisma(contact: Contact) {
    return {
      id: contact.id,
      primaryEmail: contact.primaryEmail,
      secundaryEmail: contact.secundaryPhone,
      primaryPhone: contact.primaryPhone,
      secundaryPhone: contact.secundaryPhone,
    };
  }

  static toDomain(raw: RawContact): Contact {
    return new Contact(
      {
        primaryEmail: raw.primaryEmail,
        secundaryEmail: raw.secundaryPhone,
        primaryPhone: raw.primaryPhone,
        secundaryPhone: raw.secundaryPhone,
        created_at: raw.created_at,
      },
      raw.id,
    );
  }

  static toDomainList(raw: RawContact[]): Contact[] {
    return raw.map((contact) => this.toDomain(contact));
  }
}
