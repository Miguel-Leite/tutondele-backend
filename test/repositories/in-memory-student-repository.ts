import { Student } from "@app/entities/student";
import { StudentRepository } from "@app/repositories/student-repository";

export class InMemoryStudentRepository implements StudentRepository {
  public students: Student[] = [];
  
  async findById(id: string): Promise<Student | null> {
    const student = this.students.find((item) => item.id === id);

    if (!student) {
      return null;
    }

    return student;
  }
  async findAll(organizationsId: string): Promise<Student[]> {
    const students = this.students.filter((item) => item.organizationsId === organizationsId);

    if (!students) {
      return [];
    }

    return students;
  }
  async create(student: Student): Promise<void> {
    this.students.push(student);
  }
  async save(student: Student): Promise<void> {
    const studentIndex = this.students.findIndex((item) => item.id === student.id);

    if (studentIndex >= 0) {
      this.students[studentIndex] = student;
    }
  }
}
