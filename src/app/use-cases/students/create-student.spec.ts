import { InMemoryStudentRepository } from "@test/repositories/in-memory-student-repository";
import { CreateStudent } from "./create-student";

describe('Create student use case', () => {
  it('should be able to create a student', async () => {
    
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

    const { student } = await createStudent.execute({
      firstName: 'john',
      lastName: 'doe',
      organizationsId: 'example-organization-id',
      roomsId: 'some-room-id',
      bi: '009899308LA049',
    });

    expect(studentRepository.students).toHaveLength(1);
    expect(studentRepository.students[0]).toEqual(student);
  });
});
