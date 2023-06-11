import { PaymentServicesMonthlys as RawPaymentServiceMonthly } from '@prisma/client';
import { PaymentServiceMonthly } from '@app/entities/payment-service-monthly';

export class PrismaPaymentServiceMonthlyMapper {
  static toPrisma(paymentServiceMonthly: PaymentServiceMonthly) {
    return {
      id: paymentServiceMonthly.id,
      account_number: paymentServiceMonthly.account_number,
      code: paymentServiceMonthly.code,
      iban: paymentServiceMonthly.iban,
      organizationsId: paymentServiceMonthly.organizationsId,
      reference: paymentServiceMonthly.reference,
      servicesMonthlysId: paymentServiceMonthly.servicesMonthlysId,
      studentsId: paymentServiceMonthly.studentsId,
      value: paymentServiceMonthly.value,
    };
  }

  static toDomain(raw: RawPaymentServiceMonthly): PaymentServiceMonthly {
    return new PaymentServiceMonthly(
      {
        account_number: raw.account_number,
        code: raw.code,
        iban: raw.iban,
        organizationsId: raw.organizationsId,
        reference: raw.reference,
        servicesMonthlysId: raw.servicesMonthlysId,
        studentsId: raw.studentsId,
        value: raw.value,
      },
      raw.id,
    );
  }

  static toDomainList(
    raw: RawPaymentServiceMonthly[],
  ): PaymentServiceMonthly[] {
    return raw.map((paymentServiceMonthly) =>
      this.toDomain(paymentServiceMonthly),
    );
  }
}
