import { PaymentService } from '@app/entities/payment-service';
import { PaymentServiceRepository } from '@app/repositories/payment-service-repository';

export class InMemoryPaymentServiceRepository
  implements PaymentServiceRepository
{
  public paymentServices: PaymentService[] = [];

  async findById(id: string): Promise<PaymentService | null> {
    const paymentService = this.paymentServices.find((item) => item.id === id);

    if (!paymentService) {
      return null;
    }

    return paymentService;
  }
  async findAll(organizationsId: string): Promise<PaymentService[] | null> {
    const paymentServices = this.paymentServices.filter(
      (item) => item.organizationsId === organizationsId,
    );

    if (!paymentServices) {
      return [];
    }

    return paymentServices;
  }

  async create(paymentService: PaymentService): Promise<void> {
    this.paymentServices.push(paymentService);
  }
  async save(paymentService: PaymentService): Promise<void> {
    const paymentServiceIndex = this.paymentServices.findIndex(
      (item) => item.id === paymentService.id,
    );

    if (paymentServiceIndex >= 0) {
      this.paymentServices[paymentServiceIndex] = paymentService;
    }
  }
}
