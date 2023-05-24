import { Injectable } from "@nestjs/common";

import { Student } from "@app/entities/student";

import { StudentRepository } from "@app/repositories/student-repository";

import { StudentNotFound } from "./errors/student-not-found";

interface RemoveStudentResponse {
  student: Student;
}

@Injectable()
export class RemoveStudent {
  constructor(
    private studentRepository: StudentRepository,
  ) {}

  async execute(id: string): Promise<RemoveStudentResponse> {

    const student = await this.studentRepository.findById(id);
    
    if (!student) {
      throw new StudentNotFound();
    }

    student.remove();

    await this.studentRepository.save(student)
    
    return {
      student,
    }
  }
}
