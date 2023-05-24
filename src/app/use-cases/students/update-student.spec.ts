import { InMemoryStudentRepository } from "@test/repositories/in-memory-student-repository";
import { CreateStudent } from "./create-student";
import { InMemoryPersonRepository } from "@test/repositories/in-memory-person-repository";
import { UpdateStudent } from "./update-student";

describe('Update student use case', () => {
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
    const updateStudent = new UpdateStudent(studentRepository, personRepository, mockRoomRepository);

    const studentCreated = await createStudent.execute({
      firstName: 'john',
      lastName: 'doe',
      organizationsId: 'example-organization-id',
      roomsId: 'some-room-id',
      bi: '009899308LA049',
    });

    const { student } = await updateStudent.execute({
      id: studentCreated.student.id,
      firstName: 'Miguel',
      lastName: 'Leite',
      bi: '009899308LA049',
      roomsId: studentCreated.student.roomsId,
      email: 'miguel.leite@gmail.com',
      phone: '+244944995020',
      organizationsId: studentCreated.student.organizationsId,
    })

    expect( student.created_at ).toEqual(expect.any(Date));
  });
});
