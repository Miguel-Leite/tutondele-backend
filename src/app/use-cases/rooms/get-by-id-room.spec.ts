import { InMemoryRoomRepository } from "@test/repositories/in-memory-room-repository";
import { CreateRoom } from "./create-room";
import { makeRoom } from "@test/factories/room-factory";
import { GetByIdRoom } from "./get-by-id-room";

describe('Get by id room use case', () => {
  it('should be able to get by id room', async () => {
    const roomRepository = new InMemoryRoomRepository();
    const createRoom = new CreateRoom(roomRepository);
    const getByIdRoom = new GetByIdRoom(roomRepository);
    
    const response =  await createRoom.execute(makeRoom());

    const { room } = await getByIdRoom.execute(response.room.id);

    expect(room?.created_at).toEqual(expect.any(Date));
  });

});
