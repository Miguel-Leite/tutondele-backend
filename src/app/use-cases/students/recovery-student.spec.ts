import { InMemoryStudentRepository } from "@test/repositories/in-memory-student-repository";
import { InMemoryPersonRepository } from "@test/repositories/in-memory-person-repository";

import { CreateStudent } from "./create-student";
import { RemoveStudent } from "./remove-student";
import { RecoveryStudent } from "./recovery-student";
import { StudentLimitReached } from "./errors/student-limit-reached";


describe('Recovery student use case', () => {
  it('should be able to recovery a student', async () => {
    
    const roomRepository = {
      findById: jest.fn().mockImplementation(() => Promise.resolve({ id: 'some-room-id' })),
      checkRoomAvailability: jest.fn().mockImplementation(() => Promise.resolve(true)),
      checkRoomAlreadyExists: jest.fn().mockImplementation(() => Promise.resolve(false)),
      findAll: jest.fn().mockImplementation(() => Promise.resolve([{ id: 'example-organization-id' }])),
      create: jest.fn().mockImplementation(() => Promise.resolve()),
      save: jest.fn().mockImplementation(() => Promise.resolve()),
    };
    
    const organizationRepository = {
      findById: jest.fn().mockImplementation(() => Promise.resolve({ id: 'example-organization-id' })),
      findAll: jest.fn().mockImplementation(() => Promise.resolve([{ id: 'example-organization-id' }])),
      create: jest.fn().mockImplementation(() => Promise.resolve()),
      save: jest.fn().mockImplementation(() => Promise.resolve()),
    };
    
    const licenseRepositoty = {
      findById: jest.fn().mockImplementation(() => Promise.resolve({ id: 'example-organization-id' })),
      findByCode: jest.fn().mockImplementation(() => Promise.resolve({ name: 'example-organization-id' })),
      findAll: jest.fn().mockImplementation(() => Promise.resolve([{ id: 'example-organization-id' }])),
      create: jest.fn().mockImplementation(() => Promise.resolve()),
      save: jest.fn().mockImplementation(() => Promise.resolve()),
    };
    
    const packageRepository = {
      findById: jest.fn().mockImplementation(() => Promise.resolve({ id: 'example-package-id' })),
      findByCode: jest.fn().mockImplementation(() => Promise.resolve({ name: 'example-package-id' })),
      findByName: jest.fn().mockImplementation(() => Promise.resolve(null)),
      findAll: jest.fn().mockImplementation(() => Promise.resolve([{ id: 'example-package-id' }])),
      create: jest.fn().mockImplementation(() => Promise.resolve()),
      save: jest.fn().mockImplementation(() => Promise.resolve()),
      totalStudents: jest.fn().mockImplementation(() => Promise.resolve(300)),
      totalServices: jest.fn().mockImplementation(() => Promise.resolve(12)),
      totalUsers: jest.fn().mockImplementation(() => Promise.resolve(4)),
      totalAdmins: jest.fn().mockImplementation(() => Promise.resolve(1)),
    };

    const studentRepository      = new InMemoryStudentRepository();
    const personRepository       = new InMemoryPersonRepository();
    const createStudent          = new CreateStudent(studentRepository, personRepository, roomRepository);
    const removeStudent          = new RemoveStudent(studentRepository);
    const recoveryStudent        = new RecoveryStudent(
      studentRepository,
      licenseRepositoty,
      organizationRepository,
      packageRepository,
    );

    const studentCreated = await createStudent.execute({
      firstName: 'john',
      lastName: 'doe',
      roomsId: 'some-room-id',
      bi: '009899308LA049',
      organizationsId: 'example-organization-id',
    });

    const response = await removeStudent.execute(studentCreated.student.id);

    expect( response.student.removed ).toEqual(expect.any(Date));

    const { student } = await recoveryStudent.execute(response.student.id);

    expect(student.removed).toEqual(null);
  });

  it('should not be able to recovery a student', async () => {
    const roomRepository = {
      findById: jest.fn().mockImplementation(() => Promise.resolve({ id: 'some-room-id' })),
      checkRoomAvailability: jest.fn().mockImplementation(() => Promise.resolve(true)),
      checkRoomAlreadyExists: jest.fn().mockImplementation(() => Promise.resolve(false)),
      findAll: jest.fn().mockImplementation(() => Promise.resolve([{ id: 'example-organization-id' }])),
      create: jest.fn().mockImplementation(() => Promise.resolve()),
      save: jest.fn().mockImplementation(() => Promise.resolve()),
    };
    
    const organizationRepository = {
      findById: jest.fn().mockImplementation(() => Promise.resolve({ id: 'example-organization-id' })),
      findAll: jest.fn().mockImplementation(() => Promise.resolve([{ id: 'example-organization-id' }])),
      create: jest.fn().mockImplementation(() => Promise.resolve()),
      save: jest.fn().mockImplementation(() => Promise.resolve()),
    };
    
    const licenseRepositoty = {
      findById: jest.fn().mockImplementation(() => Promise.resolve({ id: 'example-organization-id' })),
      findByCode: jest.fn().mockImplementation(() => Promise.resolve({ name: 'example-organization-id' })),
      findAll: jest.fn().mockImplementation(() => Promise.resolve([{ id: 'example-organization-id' }])),
      create: jest.fn().mockImplementation(() => Promise.resolve()),
      save: jest.fn().mockImplementation(() => Promise.resolve()),
    };
    
    const packageRepository = {
      findById: jest.fn().mockImplementation(() => Promise.resolve({ id: 'example-package-id' })),
      findByCode: jest.fn().mockImplementation(() => Promise.resolve({ name: 'example-package-id' })),
      findByName: jest.fn().mockImplementation(() => Promise.resolve(null)),
      findAll: jest.fn().mockImplementation(() => Promise.resolve([{ id: 'example-package-id' }])),
      create: jest.fn().mockImplementation(() => Promise.resolve()),
      save: jest.fn().mockImplementation(() => Promise.resolve()),
      totalStudents: jest.fn().mockImplementation(() => Promise.resolve(1)),
      totalServices: jest.fn().mockImplementation(() => Promise.resolve(12)),
      totalUsers: jest.fn().mockImplementation(() => Promise.resolve(4)),
      totalAdmins: jest.fn().mockImplementation(() => Promise.resolve(1)),
    };

    const studentRepository      = new InMemoryStudentRepository();
    const personRepository       = new InMemoryPersonRepository();
    const createStudent          = new CreateStudent(studentRepository, personRepository, roomRepository);
    const removeStudent          = new RemoveStudent(studentRepository);
    const recoveryStudent        = new RecoveryStudent(
      studentRepository,
      licenseRepositoty,
      organizationRepository,
      packageRepository,
    );

    const studentCreated = await createStudent.execute({
      firstName: 'john',
      lastName: 'doe',
      roomsId: 'some-room-id',
      bi: '009899308LA049',
      organizationsId: 'example-organization-id',
    });

    const response = await removeStudent.execute(studentCreated.student.id);

    expect( response.student.removed ).toEqual(expect.any(Date));

    expect(async () => {
      await recoveryStudent.execute(response.student.id);
    }).rejects.toThrow(StudentLimitReached);
  });
});
