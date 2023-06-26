import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma.service';
import { PaymentServiceRepository } from '@app/repositories/payment-service-repository';
import { PaymentService } from '@app/entities/payment-service';
import { PrismaPaymentServiceMapper } from '../mappers/prisma-payment-service-mapper';

@Injectable()
export class PrismaPaymentServiceRepository
  implements PaymentServiceRepository
{
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<PaymentService | null> {
    const paymentService = await this.prisma.paymentServices.findFirst({
      where: { id },
    });

    if (!paymentService) {
      return null;
    }

    return PrismaPaymentServiceMapper.toDomain(paymentService);
  }
  async findAll(organizationsId: string): Promise<PaymentService[] | null> {
    const paymentsServicesMonthlys = await this.prisma.paymentServices.findMany(
      {
        where: {
          organizationsId,
        },
      },
    );

    return PrismaPaymentServiceMapper.toDomainList(paymentsServicesMonthlys);
  }
  async create(paymentService: PaymentService): Promise<void> {
    await this.prisma.paymentServices.create({
      data: PrismaPaymentServiceMapper.toPrisma(paymentService),
    });
  }
  async save(paymentService: PaymentService): Promise<void> {
    await this.prisma.paymentServices.update({
      where: { id: paymentService.id },
      data: PrismaPaymentServiceMapper.toPrisma(paymentService),
    });
  }
}
