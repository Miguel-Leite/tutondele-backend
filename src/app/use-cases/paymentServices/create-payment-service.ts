import { Injectable } from '@nestjs/common';

import { PaymentService } from '@app/entities/payment-service';
import { PaymentServiceRepository } from '@app/repositories/payment-service-repository';
import { ServiceRepository } from '@app/repositories/service-repository';
import { ServiceNotFound } from '../services/errors/service-not-found';
import { StudentRepository } from '@app/repositories/student-repository';
import { StudentNotFound } from '../students/errors/student-not-found';

interface CreatePaymentServiceRequest {
  studentsId: string;
  organizationsId: string;
  servicesId: string;
  value: number;
}

interface CreatePaymentServiceResponse {
  paymentService: PaymentService;
}

@Injectable()
export class CreatePaymentService {
  constructor(
    private paymentServiceRepository: PaymentServiceRepository,
    private serviceRepository: ServiceRepository,
    private studentRepository: StudentRepository,
  ) {}

  async execute(
    request: CreatePaymentServiceRequest,
  ): Promise<CreatePaymentServiceResponse> {
    const { servicesId, organizationsId, studentsId, value } = request;

    const paymentService = new PaymentService({
      servicesId,
      organizationsId,
      studentsId,
      value,
      status: 'APPROVED',
    });

    const serviceExists = await this.serviceRepository.findById(servicesId);

    if (!serviceExists) {
      throw new ServiceNotFound();
    }

    if (serviceExists.price > value) {
      throw new Error(
        'Não é possivel efectuar o pagamento, valores insuficiente!',
      );
    }

    const studentExists = await this.studentRepository.findById(studentsId);

    if (!studentExists) {
      throw new StudentNotFound();
    }

    await this.paymentServiceRepository.create(paymentService);

    return {
      paymentService,
    };
  }
}
