import { Student } from "@app/entities/student";


export abstract class StudentRepository {
  abstract findById(id: string): Promise<Student | null>;
  abstract findAll(organizationsId: string): Promise<Student[]>;
  abstract create(student: Student): Promise<void>;
  abstract save(student: Student): Promise<void>;
}
