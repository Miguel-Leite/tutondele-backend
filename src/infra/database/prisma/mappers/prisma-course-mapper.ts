import { Courses as RawCourse } from '@prisma/client';
import { Course } from '@app/entities/course';

export class PrismaCourseMapper {
  static toPrisma(course: Course) {
    return {
      id: course.id,
      name: course.name,
      description: course.description,
      is_used: course.is_used,
      organizationsId: course.organizationsId,
      removed: course.removed,
    };
  }

  static toDomain(raw: RawCourse): Course {
    return new Course(
      {
        name: raw.name,
        description: raw.description,
        is_used: raw.is_used,
        organizationsId: raw.organizationsId,
        removed: raw.removed,
      },
      raw.id,
    );
  }

  static toDomainList(raw: RawCourse[]): Course[] {
    return raw.map((course) => this.toDomain(course));
  }
}
