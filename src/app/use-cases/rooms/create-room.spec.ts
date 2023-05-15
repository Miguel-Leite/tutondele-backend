import { InMemoryRoomRepository } from "@test/repositories/in-memory-room-repository";
import { CreateRoom } from "./create-room";
import { makeRoom } from "@test/factories/room-factory";
import { RoomAlreadyExists } from "./errors/room-already-exists";
import { RoomNotAvailable } from "./errors/room-not-available";

describe('Create room use case', () => {
  it('should be able to create a room', async () => {
    const roomRepository = new InMemoryRoomRepository();
    const createRoom = new CreateRoom(roomRepository);

    const { room } = await createRoom.execute(makeRoom());

    expect(roomRepository.rooms).toHaveLength(1);
    expect(roomRepository.rooms[0]).toEqual(room);
  });

  it('should be able to check if the room already exists', async () => {
    const roomRepository = new InMemoryRoomRepository();
    const createRoom = new CreateRoom(roomRepository);

    await createRoom.execute(makeRoom())

    expect(async () => {
      await createRoom.execute(makeRoom())
    }).rejects.toThrow(RoomAlreadyExists)
  });

  it('must be able to check if the room is available', async () => {
    const roomRepository = new InMemoryRoomRepository();
    const createRoom = new CreateRoom(roomRepository);

    await createRoom.execute(makeRoom({
      level: 1,
      group: 'B',
    }))

    expect(async () => {
      await createRoom.execute(makeRoom())
    }).rejects.toThrow(RoomNotAvailable)
  });

});
