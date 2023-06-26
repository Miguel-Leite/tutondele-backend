import { PaymentService } from '@app/entities/payment-service';

export abstract class PaymentServiceRepository {
  abstract findById(id: string): Promise<PaymentService | null>;
  abstract findAll(organizationsId: string): Promise<PaymentService[] | null>;
  abstract create(paymentService: PaymentService): Promise<void>;
  abstract save(paymentService: PaymentService): Promise<void>;
}
