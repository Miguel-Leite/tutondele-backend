import { Package } from '@app/entities/package';
import { Packages as RawPackage } from '@prisma/client';

export class PrismaPackageMapper {
  static toPrisma(packag: Package) {
    return {
      id: packag.id,
      name: packag.name,
      price: packag.price,
      students: packag.students,
      users: packag.students,
      admins: packag.admins,
      services: packag.services,
      manual_payment: packag.manual_payment,
      notification_email: packag.notification_email,
      notification_sms: packag.notification_sms,
      realtime_payment: packag.realtime_payment,
      security: packag.security,
    };
  }

  static toDomain(raw: RawPackage): Package {
    return new Package(
      {
        name: raw.name,
        price: raw.price,
        students: raw.students,
        users: raw.students,
        admins: raw.admins,
        services: raw.services,
        manual_payment: raw.manual_payment,
        notification_email: raw.notification_email,
        notification_sms: raw.notification_sms,
        realtime_payment: raw.realtime_payment,
        security: raw.security,
      },
      raw.id,
    );
  }

  static toDomainList(raw: RawPackage[]): Package[] {
    return raw.map((person) => this.toDomain(person));
  }
}
