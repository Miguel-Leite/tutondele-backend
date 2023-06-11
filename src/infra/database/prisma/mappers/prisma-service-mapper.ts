import { Services as RawService } from '@prisma/client';
import { Service } from '@app/entities/service';

export class PrismaServiceMapper {
  static toPrisma(service: Service) {
    return {
      id: service.id,
      name: service.name,
      price: service.price,
      description: service.description,
      removed: service.removed,
      organizationsId: service.organizationsId,
    };
  }

  static toDomain(raw: RawService): Service {
    return new Service(
      {
        name: raw.name,
        price: raw.price,
        description: raw.description,
        removed: raw.removed,
        organizationsId: raw.organizationsId,
      },
      raw.id,
    );
  }

  static toDomainList(raw: RawService[]): Service[] {
    return raw.map((service) => this.toDomain(service));
  }
}
