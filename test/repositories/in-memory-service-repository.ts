import { Service } from '@app/entities/service';
import { ServiceRepository } from '@app/repositories/service-repository';

export class InMemoryServiceRepository implements ServiceRepository {
  public services: Service[] = [];

  async findById(id: string): Promise<Service | null> {
    const service = this.services.find((item) => item.id === id);

    if (!service) {
      return null;
    }

    return service;
  }
  async findByName(name: string): Promise<Service | null> {
    const service = this.services.find((item) => item.name === name);

    if (!service) {
      return null;
    }

    return service;
  }
  async findAll(organizationsId: string): Promise<Service[] | null> {
    const services = this.services.filter(
      (item) => item.organizationsId === organizationsId,
    );

    if (!services) {
      return [];
    }

    return services;
  }
  async create(service: Service): Promise<void> {
    this.services.push(service);
  }
  async save(service: Service): Promise<void> {
    const ServiceIndex = this.services.findIndex(
      (item) => item.id === service.id,
    );

    if (ServiceIndex >= 0) {
      this.services[ServiceIndex] = service;
    }
  }
}
