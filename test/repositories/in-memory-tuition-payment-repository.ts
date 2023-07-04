import { TuitionPayment } from '@app/entities/tuition-payment';
import { TuitionPaymentRepository } from '@app/repositories/tuition-payment-repository';

export class InMemoryTuitionPaymentRepository
  implements TuitionPaymentRepository
{
  public tuitionPayments: TuitionPayment[] = [];

  async findById(id: string): Promise<TuitionPayment | null> {
    const tuitionPayment = this.tuitionPayments.find((item) => item.id === id);

    if (!tuitionPayment) {
      return null;
    }

    return tuitionPayment;
  }

  async findAll(organizationsId: string): Promise<TuitionPayment[] | null> {
    const tuitionPayments = this.tuitionPayments.filter(
      (item) => item.organizationsId === organizationsId,
    );

    if (!tuitionPayments) {
      return [];
    }

    return tuitionPayments;
  }

  async create(tuitionPayment: TuitionPayment): Promise<void> {
    this.tuitionPayments.push(tuitionPayment);
  }
  async save(tuitionPayment: TuitionPayment): Promise<void> {
    const tuitionPaymentIndex = this.tuitionPayments.findIndex(
      (item) => item.id === tuitionPayment.id,
    );

    if (tuitionPaymentIndex >= 0) {
      this.tuitionPayments[tuitionPaymentIndex] = tuitionPayment;
    }
  }
}
