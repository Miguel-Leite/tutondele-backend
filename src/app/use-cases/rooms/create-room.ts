import { Room } from "@app/entities/room";
import { RoomRepository } from "@app/repositories/room-repository";
import { Injectable } from "@nestjs/common";
import { RoomAlreadyExists } from "./errors/room-already-exists";
import { RoomNotAvailable } from "./errors/room-not-available";

interface CreateRoomRequest {
  organizationsId : string;
  coursesId       :string;

  number          :number;
  group           :string;
  level           :number
  period            :string;
  studentsLimit?  :number | null; 
}

interface CreateRoomResponse {
  room: Room;
}

@Injectable()
export class CreateRoom {
  constructor(
    private roomRepository: RoomRepository,
  ) {}

  async execute(request: CreateRoomRequest): Promise<CreateRoomResponse> {
    const {
      coursesId,
      group,
      level,
      number,
      organizationsId,
      period,
      studentsLimit,
    } = request;

    const room = new Room({
      coursesId,
      group,
      level,
      number,
      period,
      studentsLimit,
      organizationsId,
    });

    const checkRoomAlreadyExists = await this.roomRepository.checkRoomAlreadyExists(room);

    if (checkRoomAlreadyExists) {
      throw new RoomAlreadyExists();
    }

    const checkRoomAvailability = await this.roomRepository.checkRoomAvailability(room);

    if (checkRoomAvailability) {
      throw new RoomNotAvailable();
    }

    await this.roomRepository.create(room);

    return {
      room,
    };
  }
}
