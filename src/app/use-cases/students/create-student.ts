import { Injectable } from '@nestjs/common';
import { Student } from '@app/entities/student';
import { StudentRepository } from '@app/repositories/student-repository';
import { RoomRepository } from '@app/repositories/room-repository';
import { RoomNotFound } from '../rooms/errors/room-not-found';
import { Person } from '@app/entities/person';
import { PersonRepository } from '@app/repositories/person-repository';
// import { KafkaService } from "@infra/messaging/kafka.service";

export interface CreateStudentRequest {
  organizationsId: string;
  roomsId: string;
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
    private personRepository: PersonRepository,
    private roomRepository: RoomRepository, // private kafka: KafkaService,
  ) {}

  async execute(request: CreateStudentRequest): Promise<CreateStudentResponse> {
    const { organizationsId, roomsId, firstName, lastName, bi, email, phone } =
      request;

    const person = new Person({
      firstName,
      lastName,
      bi,
      email,
      phone,
    });
    const student = new Student({
      organizationsId,
      personsId: person.id,
      roomsId,
    });

    const verifyRoomNotExists = await this.roomRepository.findById(roomsId);

    if (!verifyRoomNotExists) {
      throw new RoomNotFound();
    }

    Promise.all([
      await this.personRepository.create(person),
      await this.studentRepository.create(student),
    ]);

    return {
      student,
    };
  }
}
