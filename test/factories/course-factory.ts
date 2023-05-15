import { Course, CoursesProps } from "@app/entities/course";

type Override = Partial<CoursesProps>;

export function makeCourse(override: Override = {}) {
  return new Course({
    name: 'Informática',
    organizationsId: 'example-organization-id',
    created_at: new Date(),
    ...override,
  });
}
