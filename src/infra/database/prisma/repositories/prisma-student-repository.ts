import { Injectable } from '@nestjs/common';
import { Student } from '@app/entities/student';
import { StudentRepository } from '@app/repositories/student-repository';
import { PrismaService } from '../prisma.service';
import { PrismaStudentMapper } from '../mappers/prisma-student-mapper';

@Injectable()
export class PrismaStudentRepository implements StudentRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Student | null> {
    const student = await this.prisma.students.findFirst({
      where: { id, removed: null },
    });

    if (!student) {
      return null;
    }

    return PrismaStudentMapper.toDomain(student);
  }
  async findAll(organizationsId: string): Promise<Student[]> {
    const students = await this.prisma.students.findMany({
      where: {
        organizationsId,
        removed: null,
      },
    });
    return PrismaStudentMapper.toDomainList(students);
  }
  async create(student: Student): Promise<void> {
    await this.prisma.students.create({
      data: PrismaStudentMapper.toPrisma(student),
    });
  }
  async save(student: Student): Promise<void> {
    await this.prisma.students.updateMany({
      where: { id: student.id },
      data: PrismaStudentMapper.toPrisma(student),
    });
  }
}
