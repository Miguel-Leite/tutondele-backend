import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { InChargeRepository } from '@app/repositories/inCharge-repository';
import { InCharge } from '@app/entities/inCharge';
import { PrismaInChargeMapper } from '../mappers/prisma-inCharge-mapper';

@Injectable()
export class PrismaInChargeRepository implements InChargeRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<InCharge | null> {
    const inCharge = await this.prisma.inCharges.findFirst({
      where: { id, removed: null },
    });
    if (!inCharge) {
      return null;
    }
    return PrismaInChargeMapper.toDomain(inCharge);
  }
  async findAll(organizationsId: string): Promise<InCharge[] | null> {
    const inCharges = await this.prisma.inCharges.findMany({
      where: { organizationsId, removed: null },
    });
    return PrismaInChargeMapper.toDomainList(inCharges);
  }
  async create(inCharge: InCharge): Promise<void> {
    await this.prisma.inCharges.create({
      data: PrismaInChargeMapper.toPrisma(inCharge),
    });
  }
  async save(inCharge: InCharge): Promise<void> {
    await this.prisma.inCharges.updateMany({
      where: { id: inCharge.id },
      data: PrismaInChargeMapper.toPrisma(inCharge),
    });
  }
}
