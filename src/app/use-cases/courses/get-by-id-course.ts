import { Course } from "@app/entities/course";
import { CourseRepository } from "@app/repositories/course-repository";
import { Injectable } from "@nestjs/common";


interface GetByIdCourseResponse {
  course: Course | null;
}

@Injectable()
export class GetByIdCourse {
  constructor(
    private courseRepository: CourseRepository,
  ) {}

  async execute(id: string): Promise<GetByIdCourseResponse> {
    const course = await this.courseRepository.findById(id);
    return {
      course
    }
  }
}
