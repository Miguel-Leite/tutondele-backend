import { InMemoryRoomRepository } from "@test/repositories/in-memory-room-repository";
import { CreateRoom } from "./create-room";
import { makeRoom } from "@test/factories/room-factory";
import { GetAllRooms } from "./get-all-rooms";

describe('Get all rooms use case', () => {
  it('should be able to get all rooms', async () => {
    const roomRepository = new InMemoryRoomRepository();
    const createRoom = new CreateRoom(roomRepository);
    const getAllRooms = new GetAllRooms(roomRepository);

    await createRoom.execute(makeRoom({
      organizationsId: 'example-organizations-id',
    }));

    const { rooms } = await getAllRooms.execute('example-organizations-id');

    expect(rooms).toHaveLength(1);
  });

});
