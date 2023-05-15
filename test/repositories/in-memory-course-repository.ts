import { Course } from "@app/entities/course";
import { CourseRepository } from "@app/repositories/course-repository";

export class InMemoryCourseRepository implements CourseRepository {
  public courses: Course[] = [];

  async findById(id: string): Promise<Course | null> {
    const course = this.courses.find((item) => item.id === id);

    if (!course) {
      return null;
    }

    return course;
  }
  async findByName(name: string): Promise<Course | null> {
    const course = this.courses.find((item) => item.name === name);

    if (!course) {
      return null;
    }

    return course;
  }
  async findAll(organizationsId: string): Promise<Course[] | null> {
    const courses = this.courses.filter((item) => item.organizationsId === organizationsId);

    if (!courses) {
      return [];
    }

    return courses;
  }
  async create(course: Course): Promise<void> {
    this.courses.push(course);
  }
  async save(course: Course): Promise<void> {
    this.courses.push(course);
  }
}
