import { Room } from "./room";

describe('Room', () => {
  it('should be able to create a room', () => {
    const room = new Room({
      coursesId: 'example-course-id',
      organizationsId: 'example-organization-id',
      group: "A",
      level: 10,
      number: 10,
      period: "tarde",
    });
    expect(room).toBeTruthy();
  });
});
