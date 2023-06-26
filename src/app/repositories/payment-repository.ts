import { Payment } from '@app/entities/payment';

export abstract class PaymentRepository {
  abstract findById(id: string): Promise<Payment | null>;
  abstract findAll(organizationsId: string): Promise<Payment[] | null>;
  abstract create(payment: Payment): Promise<void>;
  abstract save(payment: Payment): Promise<void>;
}
