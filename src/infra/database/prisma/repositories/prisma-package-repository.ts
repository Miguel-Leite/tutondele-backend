import { Package } from '@app/entities/package';
import { PackageRepository } from '@app/repositories/package-repository';

import { PrismaService } from '../prisma.service';
import { PrismaPackageMapper } from '../mappers/prisma-package-mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaPackageRepository implements PackageRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Package | null> {
    const packag = await this.prisma.packages.findFirst({
      where: { id },
    });
    if (!packag) {
      return null;
    }
    return PrismaPackageMapper.toDomain(packag);
  }
  async findByName(name: string): Promise<Package | null> {
    const packag = await this.prisma.packages.findFirst({
      where: { name },
    });
    if (!packag) {
      return null;
    }
    return PrismaPackageMapper.toDomain(packag);
  }
  async findAll(): Promise<Package[] | null> {
    const packages = await this.prisma.packages.findMany();
    return PrismaPackageMapper.toDomainList(packages);
  }
  async totalStudents(id: string): Promise<number | null> {
    const totalStudents = await this.prisma.packages.findFirst({
      where: { id },
    });

    if (!totalStudents) {
      return null;
    }

    return totalStudents.students;
  }
  async totalServices(id: string): Promise<number | null> {
    const totalServices = await this.prisma.packages.findFirst({
      where: { id },
    });

    if (!totalServices) {
      return null;
    }

    return totalServices.services;
  }
  async totalUsers(id: string): Promise<number | null> {
    const totalUsers = await this.prisma.packages.findFirst({
      where: { id },
    });

    if (!totalUsers) {
      return null;
    }

    return totalUsers.users;
  }
  async totalAdmins(id: string): Promise<number | null> {
    const totalAdmins = await this.prisma.packages.findFirst({
      where: { id },
    });

    if (!totalAdmins) {
      return null;
    }

    return totalAdmins.admins;
  }
  async create(packag: Package): Promise<void> {
    await this.prisma.packages.create({
      data: PrismaPackageMapper.toPrisma(packag),
    });
  }
  async save(packag: Package): Promise<void> {
    await this.prisma.packages.update({
      where: { id: packag.id },
      data: PrismaPackageMapper.toPrisma(packag),
    });
  }
}
