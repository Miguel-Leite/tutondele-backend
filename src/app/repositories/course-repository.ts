import { Course } from "@app/entities/course";

export abstract class CourseRepository {
  abstract findById(id: string): Promise<Course | null>;
  abstract findByName(name: string): Promise<Course | null>;
  abstract findAll(organizationsId: string): Promise<Course[] | null>;
  abstract create(course: Course): Promise<void>;
  abstract save(course: Course): Promise<void>;
}
