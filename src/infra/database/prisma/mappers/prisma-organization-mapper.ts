import { Organization } from '@app/entities/organization';
import { Organizations as RawOrganization } from '@prisma/client';

export class PrismaOrganizationMapper {
  static toPrisma(organization: Organization) {
    return {
      id: organization.id,
      logosId: organization.logosId,
      calendarysId: organization.calendarysId,
      contactsId: organization.contactsId,
      addressesId: organization.addressesId,
      packagesId: organization.packagesId,
      name: organization.name,
      slug: organization.slug,
      birth: organization.birth,
      instruction: organization.instruction,
      about: organization.about,
      is_active: organization.is_active,
      removed: organization.removed,
    };
  }

  static toDomain(raw: RawOrganization): Organization {
    return new Organization(
      {
        logosId: raw.logosId,
        calendarysId: raw.calendarysId,
        contactsId: raw.contactsId,
        addressesId: raw.addressesId,
        packagesId: raw.packagesId,
        name: raw.name,
        slug: raw.slug,
        birth: raw.birth,
        instruction: raw.instruction,
        about: raw.about,
        is_active: raw.is_active,
        removed: raw.removed,
        created_at: raw.created_at,
        updated_at: raw.updated_at,
      },
      raw.id,
    );
  }

  static toDomainList(raw: RawOrganization[]): Organization[] {
    return raw.map((organization) => this.toDomain(organization));
  }
}
