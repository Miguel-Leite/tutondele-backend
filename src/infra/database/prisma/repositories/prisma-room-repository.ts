import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { RoomRepository } from '@app/repositories/room-repository';
import { Room } from '@app/entities/room';
import { PrismaRoomMapper } from '../mappers/prisma-room-mapper';

@Injectable()
export class PrismaRoomRepository implements RoomRepository {
  constructor(private prisma: PrismaService) {}
  async findById(id: string): Promise<Room | null> {
    const room = await this.prisma.rooms.findFirst({
      where: { id, removed: null },
    });
    if (!room) {
      return null;
    }
    return PrismaRoomMapper.toDomain(room);
  }
  async checkRoomAvailability({
    number,
    period,
    organizationsId,
  }: Room): Promise<boolean> {
    return !!(await this.prisma.rooms.findFirst({
      where: { number, period, organizationsId },
    }));
  }
  async checkRoomAlreadyExists({
    group,
    level,
    number,
    period,
    organizationsId,
  }: Room): Promise<boolean> {
    return !!(await this.prisma.rooms.findFirst({
      where: { group, level, number, period, organizationsId },
    }));
  }
  async findAll(organizationsId: string): Promise<Room[] | null> {
    const rooms = await this.prisma.rooms.findMany({
      where: { organizationsId, removed: null },
    });
    return PrismaRoomMapper.toDomainList(rooms);
  }
  async create(room: Room): Promise<void> {
    await this.prisma.rooms.create({
      data: PrismaRoomMapper.toPrisma(room),
    });
  }
  async save(room: Room): Promise<void> {
    await this.prisma.rooms.update({
      where: { id: room.id },
      data: PrismaRoomMapper.toPrisma(room),
    });
  }
}
