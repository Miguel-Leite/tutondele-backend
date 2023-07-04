import { Injectable } from '@nestjs/common';

import { TuitionPaymentRepository } from '@app/repositories/tuition-payment-repository';
import { TuitionPayment } from '@app/entities/tuition-payment';

import { PrismaService } from '../prisma.service';
import { PrismaTuitionPaymentMapper } from '../mappers/prisma-tuition-payment-mapper';

@Injectable()
export class PrismaTuitionPaymentRepository
  implements TuitionPaymentRepository
{
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<TuitionPayment | null> {
    const tuitionPayment = await this.prisma.tuitionPayments.findFirst({
      where: { id },
    });

    if (!tuitionPayment) {
      return null;
    }

    return PrismaTuitionPaymentMapper.toDomain(tuitionPayment);
  }

  async findAll(organizationsId: string): Promise<TuitionPayment[] | null> {
    const tuitionPayments = await this.prisma.tuitionPayments.findMany({
      where: {
        organizationsId,
      },
    });

    return PrismaTuitionPaymentMapper.toDomainList(tuitionPayments);
  }
  async create(tuitionPayment: TuitionPayment): Promise<void> {
    await this.prisma.tuitionPayments.create({
      data: PrismaTuitionPaymentMapper.toPrisma(tuitionPayment),
    });
  }
  async save(tuitionPayment: TuitionPayment): Promise<void> {
    await this.prisma.tuitionPayments.update({
      where: { id: tuitionPayment.id },
      data: PrismaTuitionPaymentMapper.toPrisma(tuitionPayment),
    });
  }
}
