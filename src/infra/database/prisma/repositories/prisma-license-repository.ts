import { License } from '@app/entities/license';
import { LicenseRepository } from '@app/repositories/license-repository';

import { PrismaService } from '../prisma.service';
import { PrismaLicenseMapper } from '../mappers/prisma-license-mapper';

export class PrismaLicenseRepository implements LicenseRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<License | null> {
    const license = await this.prisma.licenses.findFirst({
      where: { id },
    });

    if (!license) {
      return null;
    }

    return PrismaLicenseMapper.toDomain(license);
  }
  async findByCode(code: string): Promise<License | null> {
    const license = await this.prisma.licenses.findFirst({
      where: { code },
    });

    if (!license) {
      return null;
    }

    return PrismaLicenseMapper.toDomain(license);
  }
  async findAll(): Promise<License[] | null> {
    const licenses = await this.prisma.licenses.findMany();
    return PrismaLicenseMapper.toDomainList(licenses);
  }
  async create(license: License): Promise<void> {
    await this.prisma.licenses.create({
      data: PrismaLicenseMapper.toPrisma(license),
    });
  }
  async save(license: License): Promise<void> {
    await this.prisma.licenses.update({
      where: { id: license.id },
      data: PrismaLicenseMapper.toPrisma(license),
    });
  }
}
