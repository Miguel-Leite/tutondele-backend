import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma.service';
import { PaymentServiceMonthlyRepository } from '@app/repositories/payment-service-monthly-repository';
import { PaymentServiceMonthly } from '@app/entities/payment-service-monthly';
import { PrismaPaymentServiceMonthlyMapper } from '../mappers/prisma-payment-service-monthly-mapper';

@Injectable()
export class PrismaPaymentServiceMonthlyRepository
  implements PaymentServiceMonthlyRepository
{
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<PaymentServiceMonthly | null> {
    const paymentServiceMonthly =
      await this.prisma.paymentServicesMonthlys.findFirst({
        where: { id, removed: null },
      });

    if (!paymentServiceMonthly) {
      return null;
    }

    return PrismaPaymentServiceMonthlyMapper.toDomain(paymentServiceMonthly);
  }
  async findByReference(
    reference: string,
  ): Promise<PaymentServiceMonthly | null> {
    const paymentServiceMonthly =
      await this.prisma.paymentServicesMonthlys.findFirst({
        where: { reference, removed: null },
      });

    if (!paymentServiceMonthly) {
      return null;
    }

    return PrismaPaymentServiceMonthlyMapper.toDomain(paymentServiceMonthly);
  }
  async findAll(
    organizationsId: string,
  ): Promise<PaymentServiceMonthly[] | null> {
    const paymentsServicesMonthlys =
      await this.prisma.paymentServicesMonthlys.findMany({
        where: {
          organizationsId,
        },
      });

    return PrismaPaymentServiceMonthlyMapper.toDomainList(
      paymentsServicesMonthlys,
    );
  }
  async create(paymentServiceMonthly: PaymentServiceMonthly): Promise<void> {
    await this.prisma.paymentServicesMonthlys.create({
      data: PrismaPaymentServiceMonthlyMapper.toPrisma(paymentServiceMonthly),
    });
  }
  async save(paymentServiceMonthly: PaymentServiceMonthly): Promise<void> {
    await this.prisma.paymentServicesMonthlys.update({
      where: { id: paymentServiceMonthly.id },
      data: PrismaPaymentServiceMonthlyMapper.toPrisma(paymentServiceMonthly),
    });
  }
}
