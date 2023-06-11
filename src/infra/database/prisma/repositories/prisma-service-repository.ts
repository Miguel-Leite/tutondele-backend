import { Injectable } from '@nestjs/common';

import { ServiceRepository } from '@app/repositories/service-repository';
import { Service } from '@app/entities/service';

import { PrismaService } from '../prisma.service';
import { PrismaServiceMapper } from '../mappers/prisma-service-mapper';

@Injectable()
export class PrismaServiceRepository implements ServiceRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Service | null> {
    const service = await this.prisma.services.findFirst({
      where: { id },
    });

    if (!service) {
      return null;
    }

    return PrismaServiceMapper.toDomain(service);
  }
  async findByName(name: string): Promise<Service | null> {
    const service = await this.prisma.services.findFirst({
      where: { name },
    });

    if (!service) {
      return null;
    }

    return PrismaServiceMapper.toDomain(service);
  }
  async findAll(organizationsId: string): Promise<Service[] | null> {
    const services = await this.prisma.services.findMany({
      where: { organizationsId },
    });

    return PrismaServiceMapper.toDomainList(services);
  }
  async create(service: Service): Promise<void> {
    await this.prisma.services.create({
      data: PrismaServiceMapper.toPrisma(service),
    });
  }
  async save(service: Service): Promise<void> {
    await this.prisma.services.update({
      where: { id: service.id },
      data: PrismaServiceMapper.toPrisma(service),
    });
  }
}
