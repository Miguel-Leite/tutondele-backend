import { InMemoryStudentRepository } from '@test/repositories/in-memory-student-repository';
import { CreateStudent } from './create-student';
import { InMemoryPersonRepository } from '@test/repositories/in-memory-person-repository';
import { InMemoryCustomerRepository } from '@test/repositories/in-memory-customer';
import { AddAccountStudent } from './add-account-student';

describe('Add account to student use case', () => {
  it('should be able to add account a student', async () => {
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

    const studentRepository = new InMemoryStudentRepository();
    const personRepository = new InMemoryPersonRepository();
    const customerRepository = new InMemoryCustomerRepository(personRepository);
    const createStudent = new CreateStudent(
      studentRepository,
      personRepository,
      mockRoomRepository,
    );
    const addAccountStudent = new AddAccountStudent(
      studentRepository,
      personRepository,
      customerRepository,
    );

    const created = await createStudent.execute({
      firstName: 'john',
      lastName: 'doe',
      email: 'john@example.com',
      organizationsId: 'example-organization-id',
      roomsId: 'some-room-id',
      bi: '009899308LA049',
    });

    const { customer } = await addAccountStudent.execute(created.student.id);

    expect(customerRepository.customers).toHaveLength(1);
    expect(customerRepository.customers[0]).toEqual(customer);
  });
});
