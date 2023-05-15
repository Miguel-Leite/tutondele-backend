import { Injectable } from "@nestjs/common";
import { Student } from "@app/entities/student";
import { StudentRepository } from "@app/repositories/student-repository";
import { RoomRepository } from "@app/repositories/room-repository";
import { RoomNotFound } from "../rooms/errors/room-not-found";
// import { KafkaService } from "@infra/messaging/kafka.service";

export interface CreateStudentRequest {
  organizationsId  : string;
  roomsId          : string;
  firstName: string;
  lastName: string;
  bi?: string;
  phone?: string | null;
  email?: string | null;
}

interface CreateStudentResponse {
  student: Student;
}

@Injectable()
export class CreateStudent {
  constructor(
    private studentRepository: StudentRepository,
    private roomRepository: RoomRepository,
    // private kafka: KafkaService,
  ) {}

  async execute(request: CreateStudentRequest): Promise<CreateStudentResponse> {
    const { 
        organizationsId, 
        roomsId,
        firstName,
        lastName,
        bi,
        email,
        phone,
      } = request;

    const student = new Student({
      organizationsId,
      personsId: '',
      roomsId,
    });

    const verifyRoomNotExists = await this.roomRepository.findById(roomsId);

    if (!verifyRoomNotExists) {
      throw new RoomNotFound();
    }

    await this.studentRepository.create(student);

    // this.kafka.emit('schools.new-person', {
    //   organizationsId,
    //   firstName,
    //   lastName,
    //   bi,
    //   email,
    //   phone,
    // })

    return {
      student,
    }
  }
}
