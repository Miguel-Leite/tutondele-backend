import { ServicesMonthlys as RawServiceMonthly } from '@prisma/client';
import { ServiceMonthly } from '@app/entities/service-monthly';

export class PrismaServiceMonthlyMapper {
  static toPrisma(serviceMonthly: ServiceMonthly) {
    return {
      id: serviceMonthly.id,
      service: serviceMonthly.service,
      link: serviceMonthly.link,
      price: serviceMonthly.price,
      removed: serviceMonthly.removed,
      organizationsId: serviceMonthly.organizationsId,
    };
  }

  static toDomain(raw: RawServiceMonthly): ServiceMonthly {
    return new ServiceMonthly(
      {
        service: raw.service,
        link: raw.link,
        price: raw.price,
        removed: raw.removed,
        organizationsId: raw.organizationsId,
      },
      raw.id,
    );
  }

  static toDomainList(raw: RawServiceMonthly[]): ServiceMonthly[] {
    return raw.map((serviceMonthly) => this.toDomain(serviceMonthly));
  }
}
