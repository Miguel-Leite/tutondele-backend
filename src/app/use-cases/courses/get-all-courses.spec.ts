import { InMemoryCourseRepository } from "@test/repositories/in-memory-course-repository";
import { makeCourse } from "@test/factories/course-factory";
import { CreateCourse } from "./create-course";
import { GetAllCourses } from "./get-all-courses";

describe('Get all courses use case', () => {
  it('should be able to get all courses', async () => {
    const courseRepository = new InMemoryCourseRepository();
    const createCourse = new CreateCourse(courseRepository);
    const getAllCourses = new GetAllCourses(courseRepository);

    const { course } = await createCourse.execute(makeCourse({
      organizationsId: 'example-organizations-id',
    }));

    const { courses } = await getAllCourses.execute('example-organizations-id');

    expect(courses).toHaveLength(1);
    expect(courses?.[0]).toEqual(course);
  });
});
