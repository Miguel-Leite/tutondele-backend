import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { CourseRepository } from "@app/repositories/course-repository";
import { Course } from "@app/entities/course";
import { PrismaCourseMapper } from "../mappers/prisma-course-mapper";

@Injectable()
export class PrismaCourseRepository implements CourseRepository{
  constructor(private prisma: PrismaService) {}
  
  async findById(id: string): Promise<Course | null> {
    const course = await this.prisma.courses.findFirst({
      where: { id },
    });
    if (!course) {
      return null;
    }
    return PrismaCourseMapper.toDomain(course); 
  }
  async findByName(name: string): Promise<Course | null> {
    const course = await this.prisma.courses.findFirst({
      where: { name },
    });
    if (!course) {
      return null;
    }
    return PrismaCourseMapper.toDomain(course);
  }
  async findAll(organizationsId: string): Promise<Course[] | null> {
    const courses = await this.prisma.courses.findMany({
      where: { organizationsId },
    });
    return PrismaCourseMapper.toDomainList(courses);
  }
  async create(course: Course): Promise<void> {
    await this.prisma.courses.create({
      data: PrismaCourseMapper.toPrisma(course),
    });
  }
  async save(course: Course): Promise<void> {
    await this.prisma.courses.updateMany({
      where: { id: course.id },
      data: PrismaCourseMapper.toPrisma(course),
    });
  }  
}
