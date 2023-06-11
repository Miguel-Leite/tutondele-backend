import { PaymentServiceMonthly } from '@app/entities/payment-service-monthly';
import { PaymentServiceMonthlyRepository } from '@app/repositories/payment-service-monthly-repository';

export class InMemoryPaymentServiceMonthlyRepository
  implements PaymentServiceMonthlyRepository
{
  public paymentServiceMonthlys: PaymentServiceMonthly[] = [];

  async findById(id: string): Promise<PaymentServiceMonthly | null> {
    const paymentServiceMonthly = this.paymentServiceMonthlys.find(
      (item) => item.id === id,
    );

    if (!paymentServiceMonthly) {
      return null;
    }

    return paymentServiceMonthly;
  }
  async findByReference(
    reference: string,
  ): Promise<PaymentServiceMonthly | null> {
    const paymentServiceMonthly = this.paymentServiceMonthlys.find(
      (item) => item.reference === reference,
    );

    if (!paymentServiceMonthly) {
      return null;
    }

    return paymentServiceMonthly;
  }
  async findAll(
    organizationsId: string,
  ): Promise<PaymentServiceMonthly[] | null> {
    const paymentServiceMonthlys = this.paymentServiceMonthlys.filter(
      (item) => item.organizationsId === organizationsId,
    );

    if (!paymentServiceMonthlys) {
      return [];
    }

    return paymentServiceMonthlys;
  }

  async create(paymentServiceMonthly: PaymentServiceMonthly): Promise<void> {
    this.paymentServiceMonthlys.push(paymentServiceMonthly);
  }
  async save(paymentServiceMonthly: PaymentServiceMonthly): Promise<void> {
    const paymentServiceMonthlyIndex = this.paymentServiceMonthlys.findIndex(
      (item) => item.id === paymentServiceMonthly.id,
    );

    if (paymentServiceMonthlyIndex >= 0) {
      this.paymentServiceMonthlys[paymentServiceMonthlyIndex] =
        paymentServiceMonthly;
    }
  }
}
