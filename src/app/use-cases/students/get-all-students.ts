import { Injectable } from "@nestjs/common";
import { Student } from "@app/entities/student";
import { StudentRepository } from "@app/repositories/student-repository";

interface GetAllStudentsResponse {
  students: Student[];
}

@Injectable()
export class GetAllStudents {
  constructor(
    private studentRepository: StudentRepository,
  ) {}

  async execute(organizationsId: string): Promise<GetAllStudentsResponse> {
    const students = await this.studentRepository.findAll(organizationsId);
    return {
      students
    }
  }
}
