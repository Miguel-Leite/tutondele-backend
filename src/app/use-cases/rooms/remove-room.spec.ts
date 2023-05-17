import { InMemoryRoomRepository } from "@test/repositories/in-memory-room-repository";
import { makeRoom } from "@test/factories/room-factory";

import { CreateRoom } from "./create-room";
import { RemoveRoom } from "./remove-room";

describe('Remove room use case', () => {
  it('should be able to remove room', async () => {
    const roomRepository = new InMemoryRoomRepository();
    const createRoom = new CreateRoom(roomRepository);
    const getByIdRoom = new RemoveRoom(roomRepository);
    
    const response =  await createRoom.execute(makeRoom());

    const { room } = await getByIdRoom.execute(response.room.id);

    expect(room?.removed).toEqual(expect.any(Date));
  });

});
