import { Course } from '@app/entities/course';
import { CourseRepository } from '@app/repositories/course-repository';
import { Injectable } from '@nestjs/common';
import { CourseAlreadyExists } from './errors/course-already-exists';

interface CreateCourseRequest {
  organizationsId: string;
  name: string;
  description?: string | null;
}

interface CreateCourseResponse {
  course: Course;
}

@Injectable()
export class CreateCourse {
  constructor(private courseRepository: CourseRepository) {}

  async execute(request: CreateCourseRequest): Promise<CreateCourseResponse> {
    const { name, description, organizationsId } = request;

    const course = new Course({
      name,
      description,
      organizationsId,
    });

    const courseAlreadyExists = await this.courseRepository.findByName(
      course.name,
    );

    if (courseAlreadyExists) {
      throw new CourseAlreadyExists();
    }

    await this.courseRepository.create(course);

    return {
      course,
    };
  }
}
