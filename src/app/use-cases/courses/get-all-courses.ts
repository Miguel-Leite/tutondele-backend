import { Course } from "@app/entities/course";
import { CourseRepository } from "@app/repositories/course-repository";
import { Injectable } from "@nestjs/common";


interface GetAllCourseResponse {
  courses: Course[] | null;
}

@Injectable()
export class GetAllCourses {
  constructor(
    private courseRepository: CourseRepository,
  ) {}

  async execute(organizationsId: string): Promise<GetAllCourseResponse> {
    const courses = await this.courseRepository.findAll(organizationsId);
    return {
      courses
    }
  }
}
