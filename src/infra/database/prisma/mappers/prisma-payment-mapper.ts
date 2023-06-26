import { Payments as RawPayment } from '@prisma/client';
import { Payment } from '@app/entities/payment';

export class PrismaPaymentMapper {
  static toPrisma(payment: Payment) {
    return {
      id: payment.id,
      organizationsId: payment.organizationsId,
      paymentsId: payment.paymentsId,
      value: payment.value,
    };
  }

  static toDomain(raw: RawPayment): Payment {
    return new Payment(
      {
        organizationsId: raw.organizationsId,
        paymentsId: raw.paymentsId,
        value: raw.value,
      },
      raw.id,
    );
  }

  static toDomainList(raw: RawPayment[]): Payment[] {
    return raw.map((payment) => this.toDomain(payment));
  }
}
