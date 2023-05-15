import { Student } from "./student";

describe('Student', () => {
  it('should be able to create a student', () => {
    const student = new Student({
      organizationsId: 'example-organization-id',
      personsId: 'example-persons-id',
      roomsId: 'example-rooms-id',
      usersId: 'example-users-id'
    });
    expect(student).toBeTruthy();
  });
});
