import { Injectable } from '@nestjs/common';

import { PaymentService } from '@app/entities/payment-service';
import { PaymentServiceRepository } from '@app/repositories/payment-service-repository';
import { ServiceRepository } from '@app/repositories/service-repository';
import { ServiceNotFound } from '../services/errors/service-not-found';
import { StudentRepository } from '@app/repositories/student-repository';
import { StudentNotFound } from '../students/errors/student-not-found';
import { PaymentServiceNotFound } from './errors/payment-service-not-found';

interface UpdatePaymentServiceRequest {
  id: string;
  studentsId: string;
  organizationsId: string;
  servicesId: string;
  value: number;
}

interface UpdatePaymentServiceResponse {
  paymentService: PaymentService;
}

@Injectable()
export class UpdatePaymentService {
  constructor(
    private paymentServiceRepository: PaymentServiceRepository,
    private serviceRepository: ServiceRepository,
    private studentRepository: StudentRepository,
  ) {}

  async execute(
    request: UpdatePaymentServiceRequest,
  ): Promise<UpdatePaymentServiceResponse> {
    const { id, servicesId, organizationsId, studentsId, value } = request;

    const paymentService = new PaymentService(
      {
        servicesId,
        organizationsId,
        studentsId,
        value,
        status: 'APPROVED',
      },
      id,
    );

    const paymentServiceExists = await this.paymentServiceRepository.findById(
      id,
    );

    if (!paymentServiceExists) {
      throw new PaymentServiceNotFound();
    }

    const serviceExists = await this.serviceRepository.findById(servicesId);

    if (!serviceExists) {
      throw new ServiceNotFound();
    }

    const studentExists = await this.studentRepository.findById(studentsId);

    if (!studentExists) {
      throw new StudentNotFound();
    }

    await this.paymentServiceRepository.save(paymentService);

    return {
      paymentService,
    };
  }
}
