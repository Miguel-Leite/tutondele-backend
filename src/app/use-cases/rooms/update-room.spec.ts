import { InMemoryRoomRepository } from "@test/repositories/in-memory-room-repository";
import { makeRoom } from "@test/factories/room-factory";

import { CreateRoom } from "./create-room";
import { UpdateRoom } from "./update-room";

describe('Update room use case', () => {
  it('should be able to update a room', async () => {
    const roomRepository = new InMemoryRoomRepository();
    const createRoom = new CreateRoom(roomRepository);
    const updateRoom = new UpdateRoom(roomRepository);

    const { room } = await createRoom.execute(makeRoom());

    const response = await updateRoom.execute({
      id: room.id,
      coursesId: room.coursesId,
      group: room.group,
      level: room.level,
      number: room.number,
      period: room.period,
      studentsLimit: 40,
      organizationsId: room.organizationsId,
    })
    expect(response.room.created_at).toEqual(expect.any(Date));
  });
});
