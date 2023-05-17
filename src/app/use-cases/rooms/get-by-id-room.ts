import { Injectable } from "@nestjs/common";

import { Room } from "@app/entities/room";
import { RoomRepository } from "@app/repositories/room-repository";

interface GetByIdRoomResponse {
  room: Room | null;
}

@Injectable()
export class GetByIdRoom {
  constructor (
    private roomRepository: RoomRepository,
  ) {}

  async execute(id: string): Promise<GetByIdRoomResponse> {
    const room = await this.roomRepository.findById(id);
    console.log(room)
    return {
      room
    }
  }
}