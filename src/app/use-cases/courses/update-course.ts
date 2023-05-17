import { Course } from "@app/entities/course";
import { CourseRepository } from "@app/repositories/course-repository";
import { Injectable } from "@nestjs/common";
import { CourseAlreadyExists } from "./errors/course-already-exists";

interface UpdateCourseRequest {
  id: string;
  organizationsId: string;
  name           : string;
  description?   : string | null;
}

interface UpdateCourseResponse {
  course: Course;
}

@Injectable()
export class UpdateCourse {
  constructor(
    private courseRepository: CourseRepository,
  ) {}

  async execute(request: UpdateCourseRequest): Promise<UpdateCourseResponse> {
    const { id, name, description, organizationsId } = request;

    const course = new Course({
      name,
      description,
      organizationsId,
    },id);
    
    await this.courseRepository.save(course);

    return {
      course,
    }
  }
}
