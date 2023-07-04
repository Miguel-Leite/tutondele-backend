import { TuitionPayment } from '@app/entities/tuition-payment';

export abstract class TuitionPaymentRepository {
  abstract findById(id: string): Promise<TuitionPayment | null>;
  abstract findAll(organizationsId: string): Promise<TuitionPayment[] | null>;
  abstract create(tuitionPayment: TuitionPayment): Promise<void>;
  abstract save(tuitionPayment: TuitionPayment): Promise<void>;
}
