import { InMemoryCustomerRepository } from '@test/repositories/in-memory-customer';
import { InMemoryOrganizationRepository } from '@test/repositories/in-memory-organization-repository';
import { InMemoryPersonRepository } from '@test/repositories/in-memory-person-repository';
import { makeOrganization } from '@test/factories/organization-factory';
import { JwtService } from '@nestjs/jwt';
import authConfig from '../config';
import { AuthStudentService } from './auth-student.service';
import { InMemoryStudentRepository } from '@test/repositories/in-memory-student-repository';
import { CreateStudent } from '@app/use-cases/students/create-student';
import { AddAccountStudent } from '@app/use-cases/students/add-account-student';

describe('Authentication Student service', () => {
  it('should be able to authenticate a student', async () => {
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

    const organizationRepository = new InMemoryOrganizationRepository();
    const jwtService = new JwtService({
      secret: authConfig.jwt.secret,
    });

    const organization = makeOrganization({
      is_active: true,
    });

    const created = await createStudent.execute({
      firstName: 'john',
      lastName: 'doe',
      email: 'miguel@gmail.com',
      organizationsId: organization.id,
      roomsId: 'some-room-id',
      bi: '009899308LA049',
    });

    const { customer } = await addAccountStudent.execute(created.student.id);

    const authStudentService = new AuthStudentService(
      customerRepository,
      organizationRepository,
      jwtService,
    );

    const token = await authStudentService.execute({
      email: 'miguel@gmail.com',
      password: 'password',
    });

    expect(token).toBeTruthy();

    const decodedToken = jwtService.decode(token);
    expect(decodedToken).toBeTruthy();

    if (decodedToken) {
      expect(decodedToken.sub).toEqual(customer?.id);
    }
  });
});
