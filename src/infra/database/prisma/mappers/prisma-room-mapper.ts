import { Rooms as RawRoom } from '@prisma/client';
import { Room } from '@app/entities/room';

export class PrismaRoomMapper {
  static toPrisma(room: Room) {
    return {
      id: room.id,
      coursesId: room.coursesId,
      organizationsId: room.organizationsId,
      number: room.number,
      group: room.group,
      level: room.level,
      period: room.period,
      studentsLimit: room.studentsLimit,
      removed: room.removed,
    };
  }

  static toDomain(raw: RawRoom): Room {
    return new Room(
      {
        coursesId: raw.coursesId,
        organizationsId: raw.organizationsId,
        group: raw.group,
        level: raw.level,
        number: raw.number,
        period: raw.period,
        studentsLimit: raw.studentsLimit,
        removed: raw.removed,
      },
      raw.id,
    );
  }

  static toDomainList(raw: RawRoom[]): Room[] {
    return raw.map((room) => this.toDomain(room));
  }
}
