import { Injectable } from "@nestjs/common";
import { Student } from "@app/entities/student";
import { StudentRepository } from "@app/repositories/student-repository";

interface GetByIdStudentResponse {
  student: Student | null;
}

@Injectable()
export class GetByIdStudent {
  constructor (
    private studentRepository: StudentRepository,
  ) {}  

  async execute(id: string): Promise<GetByIdStudentResponse> {
    const student = await this.studentRepository.findById(id);
    return {
      student
    };
  }
}
