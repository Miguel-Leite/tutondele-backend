import { Room } from "@app/entities/room";
import { RoomRepository } from "@app/repositories/room-repository";
import { InMemoryDatabaseRepository } from "./in-memory-database-repository";

export class InMemoryRoomRepository extends InMemoryDatabaseRepository implements RoomRepository {
  public rooms: Room[] = [];

  async findById(id: string): Promise<Room | null> {
    const room = this.databse.rooms.find((item) => item.id === id);

    if (!room) {
      return null;
    }

    return room;
  }
  async checkRoomAvailability({
    number,
    period,
    organizationsId,
  }: Room): Promise<boolean> {
    const room = this.rooms.find((item) => item.number === number && item.period === period && item.organizationsId === organizationsId);
    return !!room;
  }
  async checkRoomAlreadyExists({
    group,
    level,
    number,
    period,
    organizationsId
  }: Room): Promise<boolean> {
    const room = this.rooms.find((item) => item.group === group && item.level === level && item.number === number && item.period === period && item.organizationsId === organizationsId);
    return !!room;
  }
  async findAll(organizationsId: string): Promise<Room[] | null> {
    const rooms = this.rooms.filter((item) => item.organizationsId === organizationsId);

    if (!rooms) {
      return [];
    }

    return rooms;
  }
  async create(room: Room): Promise<void> {
    this.rooms.push(room);
  }
  async save(room: Room): Promise<void> {
    this.rooms.push(room);
  }
}
