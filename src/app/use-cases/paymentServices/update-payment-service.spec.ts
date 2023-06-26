import { makeService } from '@test/factories/service-factory';
import { InMemoryPaymentServiceRepository } from '@test/repositories/in-memory-payment-service-repository';
import { CreatePaymentService } from './create-payment-service';
import { InMemoryServiceRepository } from '@test/repositories/in-memory-service-repository';
import { CreateService } from '../services/create-service';
import { InMemoryStudentRepository } from '@test/repositories/in-memory-student-repository';
import { InMemoryPersonRepository } from '@test/repositories/in-memory-person-repository';
import { CreateStudent } from '../students/create-student';
import { UpdatePaymentService } from './update-payment-service';

describe('Update Payment Service use case', () => {
  it('should be able to update payment service', async () => {
    const mockRoomRepository = {
      findById: jest
        .fn()
        .mockImplementation(() => Promise.resolve({ id: 'some-room-id' })),
      checkRoomAvailability: jest
        .fn()
        .mockImplementation(() => Promise.resolve(true)),
      checkRoomAlreadyExists: jest
        .fn()
        .mockImplementation(() => Promise.resolve(false)),
      findAll: jest
        .fn()
        .mockImplementation(() => Promise.resolve([{ id: 'some-room-id' }])),
      create: jest.fn().mockImplementation(() => Promise.resolve()),
      save: jest.fn().mockImplementation(() => Promise.resolve()),
    };
    const personRepository = new InMemoryPersonRepository();
    const studentRepository = new InMemoryStudentRepository();
    const serviceRepository = new InMemoryServiceRepository();
    const paymentServiceRepository = new InMemoryPaymentServiceRepository();
    const createService = new CreateService(serviceRepository);
    const createPaymentService = new CreatePaymentService(
      paymentServiceRepository,
      serviceRepository,
      studentRepository,
    );
    const createStudent = new CreateStudent(
      studentRepository,
      personRepository,
      mockRoomRepository,
    );

    const updatePaymentService = new UpdatePaymentService(
      paymentServiceRepository,
      serviceRepository,
      studentRepository,
    );

    const { service } = await createService.execute(makeService());
    const { student } = await createStudent.execute({
      firstName: 'john',
      lastName: 'doe',
      organizationsId: 'example-organization-id',
      roomsId: 'some-room-id',
      bi: '009899308LA049',
    });

    const created = await createPaymentService.execute({
      servicesId: service.id,
      studentsId: student.id,
      value: 18000,
      organizationsId: service.organizationsId,
    });

    const { paymentService } = await updatePaymentService.execute({
      id: created.paymentService.id,
      servicesId: service.id,
      studentsId: student.id,
      value: 18000,
      organizationsId: service.organizationsId,
    });

    expect(paymentServiceRepository.paymentServices).toHaveLength(1);
    expect(paymentServiceRepository.paymentServices[0]).toEqual(paymentService);
  });
});
