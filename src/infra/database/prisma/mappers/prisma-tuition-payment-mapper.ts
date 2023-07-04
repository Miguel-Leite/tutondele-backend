import { TuitionPayments as RawTuitionPayment } from '@prisma/client';
import { TuitionPayment } from '@app/entities/tuition-payment';

export class PrismaTuitionPaymentMapper {
  static toPrisma(tuitionPayment: TuitionPayment) {
    return {
      id: tuitionPayment.id,
      month: tuitionPayment.month,
      organizationsId: tuitionPayment.organizationsId,
      servicesMonthlysId: tuitionPayment.servicesMonthlysId,
      studentsId: tuitionPayment.studentsId,
      value: tuitionPayment.value,
      status: tuitionPayment.status,
    };
  }

  static toDomain(raw: RawTuitionPayment): TuitionPayment {
    return new TuitionPayment(
      {
        month: raw.month,
        organizationsId: raw.organizationsId,
        servicesMonthlysId: raw.servicesMonthlysId,
        studentsId: raw.studentsId,
        value: raw.value,
        status: raw.status,
        removed: raw.removed,
        created_at: raw.created_at,
        updated_at: raw.updated_at,
      },
      raw.id,
    );
  }

  static toDomainList(raw: RawTuitionPayment[]): TuitionPayment[] {
    return raw.map((tuitionPayment) => this.toDomain(tuitionPayment));
  }
}
