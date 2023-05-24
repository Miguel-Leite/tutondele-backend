import { InMemoryStudentRepository } from "@test/repositories/in-memory-student-repository";
import { InMemoryPersonRepository } from "@test/repositories/in-memory-person-repository";

import { CreateStudent } from "./create-student";
import { RemoveStudent } from "./remove-student";

describe('Remove student use case', () => {
  it('should be able to update a student', async () => {
    
    const mockRoomRepository = {
      findById: jest.fn().mockImplementation(() => Promise.resolve({ id: 'some-room-id' })),
      checkRoomAvailability: jest.fn().mockImplementation(() => Promise.resolve(true)),
      checkRoomAlreadyExists: jest.fn().mockImplementation(() => Promise.resolve(false)),
      findAll: jest.fn().mockImplementation(() => Promise.resolve([{ id: 'some-room-id' }])),
      create: jest.fn().mockImplementation(() => Promise.resolve()),
      save: jest.fn().mockImplementation(() => Promise.resolve()),
    };
    
    const studentRepository = new InMemoryStudentRepository();
    const personRepository = new InMemoryPersonRepository();
    const createStudent = new CreateStudent(studentRepository, personRepository, mockRoomRepository);
    const removeStudent = new RemoveStudent(studentRepository);

    const studentCreated = await createStudent.execute({
      firstName: 'john',
      lastName: 'doe',
      roomsId: 'some-room-id',
      bi: '009899308LA049',
      organizationsId: 'example-organization-id',
    });

    const { student } = await removeStudent.execute(studentCreated.student.id);

    expect( student.removed ).toEqual(expect.any(Date));
  });
});
