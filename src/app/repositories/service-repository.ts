import { Service } from '@app/entities/service';

export abstract class ServiceRepository {
  abstract findById(id: string): Promise<Service | null>;
  abstract findByName(name: string): Promise<Service | null>;
  abstract findAll(organizationsId: string): Promise<Service[] | null>;
  abstract create(service: Service): Promise<void>;
  abstract save(service: Service): Promise<void>;
}
