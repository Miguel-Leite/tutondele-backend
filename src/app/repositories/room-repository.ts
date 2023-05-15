import { Room } from "@app/entities/room";

export abstract class RoomRepository {
  abstract findById(id: string): Promise<Room | null>;
  abstract checkRoomAvailability(room: Room): Promise<boolean>;
  abstract checkRoomAlreadyExists(room: Room): Promise<boolean>;
  abstract findAll(organizationsId: string): Promise<Room[] | null>;
  abstract create(room: Room): Promise<void>;
  abstract save(room: Room): Promise<void>;
}
