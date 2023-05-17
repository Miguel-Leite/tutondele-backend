import { Course } from "@app/entities/course";
import { CourseRepository } from "@app/repositories/course-repository";
import { Injectable } from "@nestjs/common";
import { CourseNotFound } from "./errors/course-not-found";


interface RemoveCourseResponse {
  course: Course | null;
}

@Injectable()
export class RemoveCourse {
  constructor(
    private courseRepository: CourseRepository,
  ) {}

  async execute(id: string): Promise<RemoveCourseResponse> {
    const course = await this.courseRepository.findById(id);

    if (!course) {
      throw new CourseNotFound();
    }

    course.remove();

    this.courseRepository.save(course);
    
    return {
      course
    }
  }
}
