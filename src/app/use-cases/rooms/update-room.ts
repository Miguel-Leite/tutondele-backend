import { Injectable } from "@nestjs/common";

import { Room } from "@app/entities/room";
import { RoomRepository } from "@app/repositories/room-repository";

import { RoomNotFound } from "./errors/room-not-found";

interface UpdateRoomRequest {
  id : string;
  organizationsId : string;
  coursesId       :string;

  number          :number;
  group           :string;
  level           :number
  period            :string;
  studentsLimit?  :number | null; 
}

interface UpdateRoomResponse {
  room: Room;
}

@Injectable()
export class UpdateRoom {
  constructor(
    private roomRepository: RoomRepository,
  ) {}

  async execute(request: UpdateRoomRequest): Promise<UpdateRoomResponse> {
    const {
      id,
      coursesId,
      group,
      level,
      number,
      organizationsId,
      period,
      studentsLimit,
    } = request;

    const roomExists = await this.roomRepository.findById(id);

    if (!roomExists) {
      throw new RoomNotFound();
    }

    const room = new Room({
      coursesId,
      group,
      level,
      number,
      period,
      studentsLimit,
      organizationsId,
    });

    await this.roomRepository.save(room);

    return {
      room,
    };
  }
}
