import { InMemoryStudentRepository } from "@test/repositories/in-memory-student-repository";
import { InMemoryPersonRepository } from "@test/repositories/in-memory-person-repository";
import { CreateStudent } from "./create-student";
import { GetByIdStudent } from "./get-by-id-student";

describe('Get by id student use case', () => {
  it('should be able to get by id student', async () => {
    
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
    const getByIdStudent = new GetByIdStudent(studentRepository);

    const response = await createStudent.execute({
      firstName: 'john',
      lastName: 'doe',
      organizationsId: 'example-organization-id',
      roomsId: 'some-room-id',
      bi: '009899308LA049',
    });

    const { student } = await getByIdStudent.execute(response.student.id);

    expect(studentRepository.students[0]).toEqual(student);
  });
});
