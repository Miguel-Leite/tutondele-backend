import { PaymentServices as RawPaymentService } from '@prisma/client';
import { PaymentService } from '@app/entities/payment-service';

export class PrismaPaymentServiceMapper {
  static toPrisma(paymentService: PaymentService) {
    return {
      id: paymentService.id,
      organizationsId: paymentService.organizationsId,
      servicesId: paymentService.servicesId,
      studentsId: paymentService.studentsId,
      status: paymentService.status,
      value: paymentService.value,
    };
  }

  static toDomain(raw: RawPaymentService): PaymentService {
    return new PaymentService(
      {
        organizationsId: raw.organizationsId,
        servicesId: raw.servicesId,
        studentsId: raw.studentsId,
        status: raw.status,
        value: raw.value,
      },
      raw.id,
    );
  }

  static toDomainList(raw: RawPaymentService[]): PaymentService[] {
    return raw.map((paymentService) => this.toDomain(paymentService));
  }
}
