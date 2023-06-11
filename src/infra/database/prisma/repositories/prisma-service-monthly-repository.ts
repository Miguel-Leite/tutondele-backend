import { Injectable } from '@nestjs/common';

import { ServiceMonthlyRepository } from '@app/repositories/service-monthly-repository';
import { ServiceMonthly } from '@app/entities/service-monthly';

import { PrismaService } from '../prisma.service';
import { PrismaServiceMonthlyMapper } from '../mappers/prisma-service-monthly-mapper';

@Injectable()
export class PrismaServiceMonthlyRepository
  implements ServiceMonthlyRepository
{
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<ServiceMonthly | null> {
    const service = await this.prisma.servicesMonthlys.findFirst({
      where: { id },
    });

    if (!service) {
      return null;
    }

    return PrismaServiceMonthlyMapper.toDomain(service);
  }
  async findByService(service: string): Promise<ServiceMonthly | null> {
    const serviceMonthly = await this.prisma.servicesMonthlys.findFirst({
      where: { service },
    });

    if (!serviceMonthly) {
      return null;
    }

    return PrismaServiceMonthlyMapper.toDomain(serviceMonthly);
  }
  async findAll(organizationsId: string): Promise<ServiceMonthly[] | null> {
    const services = await this.prisma.servicesMonthlys.findMany({
      where: { organizationsId },
    });

    return PrismaServiceMonthlyMapper.toDomainList(services);
  }
  async create(serviceMonthly: ServiceMonthly): Promise<void> {
    await this.prisma.servicesMonthlys.create({
      data: PrismaServiceMonthlyMapper.toPrisma(serviceMonthly),
    });
  }
  async save(serviceMonthly: ServiceMonthly): Promise<void> {
    await this.prisma.servicesMonthlys.update({
      where: { id: serviceMonthly.id },
      data: PrismaServiceMonthlyMapper.toPrisma(serviceMonthly),
    });
  }
}
