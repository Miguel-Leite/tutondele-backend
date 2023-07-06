import { Students as RawStudent } from '@prisma/client';
import { Student } from '@app/entities/student';

export class PrismaStudentMapper {
  static toPrisma(student: Student) {
    return {
      id: student.id,
      personsId: student.personsId,
      roomsId: student.roomsId,
      customersId: student.customersId,
      organizationsId: student.organizationsId,
      removed: student.removed,
    };
  }

  static toDomain(raw: RawStudent): Student {
    return new Student(
      {
        personsId: raw.personsId,
        roomsId: raw.roomsId,
        customersId: raw.customersId,
        organizationsId: raw.organizationsId,
        removed: raw.removed,
      },
      raw.id,
    );
  }

  static toDomainList(raw: RawStudent[]): Student[] {
    return raw.map((student) => this.toDomain(student));
  }
}
