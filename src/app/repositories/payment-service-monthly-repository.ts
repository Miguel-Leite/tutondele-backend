import { PaymentServiceMonthly } from '@app/entities/payment-service-monthly';

export abstract class PaymentServiceMonthlyRepository {
  abstract findById(id: string): Promise<PaymentServiceMonthly | null>;
  abstract findByReference(
    reference: string,
  ): Promise<PaymentServiceMonthly | null>;
  abstract findAll(
    organizationsId: string,
  ): Promise<PaymentServiceMonthly[] | null>;
  abstract create(paymentServiceMonthly: PaymentServiceMonthly): Promise<void>;
  abstract save(paymentServiceMonthly: PaymentServiceMonthly): Promise<void>;
}
