import { ServiceMonthly } from '@app/entities/service-monthly';

export abstract class ServiceMonthlyRepository {
  abstract findById(id: string): Promise<ServiceMonthly | null>;
  abstract findByService(service: string): Promise<ServiceMonthly | null>;
  abstract findAll(organizationsId: string): Promise<ServiceMonthly[] | null>;
  abstract create(serviceMonthly: ServiceMonthly): Promise<void>;
  abstract save(serviceMonthly: ServiceMonthly): Promise<void>;
}
