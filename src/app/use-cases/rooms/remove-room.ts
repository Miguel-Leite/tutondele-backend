import { Injectable } from "@nestjs/common";

import { Room } from "@app/entities/room";
import { RoomRepository } from "@app/repositories/room-repository";
import { RoomNotFound } from "./errors/room-not-found";

interface RemoveRoomResponse {
  room: Room | null;
}

@Injectable()
export class RemoveRoom {
  constructor (
    private roomRepository: RoomRepository,
  ) {}

  async execute(id: string): Promise<RemoveRoomResponse> {
    const room = await this.roomRepository.findById(id);

    if (!room) {
      throw new RoomNotFound();
    }

    room.remove();

    this.roomRepository.save(room);
    
    return {
      room
    }
  }
}