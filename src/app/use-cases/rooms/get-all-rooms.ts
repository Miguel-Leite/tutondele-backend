import { Injectable } from "@nestjs/common";

import { Room } from "@app/entities/room";
import { RoomRepository } from "@app/repositories/room-repository";

interface GetAllRoomsResponse {
  rooms: Room[] | null;
}

@Injectable()
export class GetAllRooms {
  constructor (
    private roomRepository: RoomRepository,
  ) {}

  async execute(organizationsId: string): Promise<GetAllRoomsResponse> {
    const rooms = await this.roomRepository.findAll(organizationsId);
    return {
      rooms
    }
  }
}