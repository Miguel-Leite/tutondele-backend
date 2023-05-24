import { Injectable } from "@nestjs/common";

import { Student } from "@app/entities/student";
import { Person } from "@app/entities/person";
import { Bi } from "@app/entities/bi";

import { StudentRepository } from "@app/repositories/student-repository";
import { RoomRepository } from "@app/repositories/room-repository";
import { PersonRepository } from "@app/repositories/person-repository";

import { RoomNotFound } from "../rooms/errors/room-not-found";
import { StudentNotFound } from "./errors/student-not-found";

export interface UpdateStudentRequest {
  id               : string;
  organizationsId  : string;
  roomsId          : string;
  firstName: string;
  lastName: string;
  bi?: string;
  phone?: string | null;
  email?: string | null;
}

interface UpdateStudentResponse {
  student: Student;
}

@Injectable()
export class UpdateStudent {
  constructor(
    private studentRepository: StudentRepository,
    private personRepository: PersonRepository,
    private roomRepository: RoomRepository,
  ) {}

  async execute(request: UpdateStudentRequest): Promise<UpdateStudentResponse> {
    const { 
        id,
        organizationsId, 
        roomsId,
        firstName,
        lastName,
        bi,
        email,
        phone,
      } = request;

    const verifyRoomNotExists = await this.roomRepository.findById(roomsId);

    if (!verifyRoomNotExists) {
      throw new RoomNotFound();
    }

    const studentExists = await this.studentRepository.findById(id);
    if (!studentExists) {
      throw new StudentNotFound();
    }

    const personExists = await this.personRepository.findById(studentExists.personsId);

    if (!personExists) {
      throw new StudentNotFound();
    }

    const person = new Person({
      firstName,
      lastName,
      bi: new Bi(bi),
      email,
      phone,
    },personExists.id);

    const student = new Student({
      organizationsId,
      personsId: person.id,
      roomsId,
    });

    Promise.all([
      await this.personRepository.save(person),
      await this.studentRepository.save(student),
    ]);
    
    return {
      student,
    }
  }
}
