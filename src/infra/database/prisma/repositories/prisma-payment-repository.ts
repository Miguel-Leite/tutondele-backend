import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma.service';
import { PaymentRepository } from '@app/repositories/payment-repository';
import { Payment } from '@app/entities/payment';
import { PrismaPaymentMapper } from '../mappers/prisma-payment-mapper';

@Injectable()
export class PrismaPaymentRepository implements PaymentRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Payment | null> {
    const payment = await this.prisma.payments.findFirst({
      where: { id, removed: null },
    });

    if (!payment) {
      return null;
    }

    return PrismaPaymentMapper.toDomain(payment);
  }
  async findAll(organizationsId: string): Promise<Payment[] | null> {
    const paymentsServicesMonthlys = await this.prisma.payments.findMany({
      where: {
        organizationsId,
        removed: null,
      },
    });

    return PrismaPaymentMapper.toDomainList(paymentsServicesMonthlys);
  }
  async create(payment: Payment): Promise<void> {
    await this.prisma.payments.create({
      data: PrismaPaymentMapper.toPrisma(payment),
    });
  }
  async save(payment: Payment): Promise<void> {
    await this.prisma.payments.update({
      where: { id: payment.id },
      data: PrismaPaymentMapper.toPrisma(payment),
    });
  }
}
