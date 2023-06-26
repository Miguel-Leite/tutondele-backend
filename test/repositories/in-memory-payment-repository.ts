import { Payment } from '@app/entities/payment';
import { PaymentRepository } from '@app/repositories/payment-repository';

export class InMemoryPaymentRepository implements PaymentRepository {
  public payments: Payment[] = [];

  async findById(id: string): Promise<Payment | null> {
    const payment = this.payments.find((item) => item.id === id);

    if (!payment) {
      return null;
    }

    return payment;
  }
  async findAll(organizationsId: string): Promise<Payment[] | null> {
    const payments = this.payments.filter(
      (item) => item.organizationsId === organizationsId,
    );

    if (!payments) {
      return [];
    }

    return payments;
  }

  async create(payment: Payment): Promise<void> {
    this.payments.push(payment);
  }
  async save(payment: Payment): Promise<void> {
    const paymentIndex = this.payments.findIndex(
      (item) => item.id === payment.id,
    );

    if (paymentIndex >= 0) {
      this.payments[paymentIndex] = payment;
    }
  }
}
