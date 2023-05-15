import { InMemoryStudentRepository } from "@test/repositories/in-memory-student-repository";
import { CreateStudent } from "./create-student";
import { GetAllStudents } from "./get-all-students";

describe('Get all students use case', () => {
  it('should be able to get all students', async () => {
    
    const mockRoomRepository = {
      findById: jest.fn().mockImplementation(() => Promise.resolve({ id: 'some-room-id' })),
      checkRoomAvailability: jest.fn().mockImplementation(() => Promise.resolve(true)),
      checkRoomAlreadyExists: jest.fn().mockImplementation(() => Promise.resolve(false)),
      findAll: jest.fn().mockImplementation(() => Promise.resolve([{ id: 'some-room-id' }])),
      create: jest.fn().mockImplementation(() => Promise.resolve()),
      save: jest.fn().mockImplementation(() => Promise.resolve()),
    };
    
    const studentRepository = new InMemoryStudentRepository();
    const createStudent = new CreateStudent(studentRepository, mockRoomRepository);
    const getAllStudents = new GetAllStudents(studentRepository);

    await createStudent.execute({
      firstName: 'john',
      lastName: 'doe',
      organizationsId: 'example-organization-id',
      roomsId: 'some-room-id',
      bi: '009899308LA049',
    });

    const { students } = await getAllStudents.execute('example-organization-id')

    expect(students[0].created_at).toEqual(expect.any(Date));
  });
});
