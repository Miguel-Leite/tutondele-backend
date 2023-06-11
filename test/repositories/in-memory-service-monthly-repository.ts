import { ServiceMonthly } from '@app/entities/service-monthly';
import { ServiceMonthlyRepository } from '@app/repositories/service-monthly-repository';

export class InMemoryServiceMonthlyRepository
  implements ServiceMonthlyRepository
{
  public serviceMonthlys: ServiceMonthly[] = [];

  async findById(id: string): Promise<ServiceMonthly | null> {
    const ServiceMonthly = this.serviceMonthlys.find((item) => item.id === id);

    if (!ServiceMonthly) {
      return null;
    }

    return ServiceMonthly;
  }
  async findByService(service: string): Promise<ServiceMonthly | null> {
    const ServiceMonthly = this.serviceMonthlys.find(
      (item) => item.service === service,
    );

    if (!ServiceMonthly) {
      return null;
    }

    return ServiceMonthly;
  }
  async findAll(organizationsId: string): Promise<ServiceMonthly[] | null> {
    const serviceMonthlys = this.serviceMonthlys.filter(
      (item) => item.organizationsId === organizationsId,
    );

    if (!serviceMonthlys) {
      return [];
    }

    return serviceMonthlys;
  }

  async create(ServiceMonthly: ServiceMonthly): Promise<void> {
    this.serviceMonthlys.push(ServiceMonthly);
  }
  async save(ServiceMonthly: ServiceMonthly): Promise<void> {
    const ServiceMonthlyIndex = this.serviceMonthlys.findIndex(
      (item) => item.id === ServiceMonthly.id,
    );

    if (ServiceMonthlyIndex >= 0) {
      this.serviceMonthlys[ServiceMonthlyIndex] = ServiceMonthly;
    }
  }
}
