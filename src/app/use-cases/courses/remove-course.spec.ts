import { InMemoryCourseRepository } from "@test/repositories/in-memory-course-repository";
import { makeCourse } from "@test/factories/course-factory";
import { CreateCourse } from "./create-course";
import { RemoveCourse } from "./remove-course";
import { CourseNotFound } from "./errors/course-not-found";

describe('Removed course use case', () => {
  it('should be able to removed course', async () => {
    const courseRepository = new InMemoryCourseRepository();
    const createCourse = new CreateCourse(courseRepository);
    const removeCourse = new RemoveCourse(courseRepository);

    const courseCreated = await createCourse.execute(makeCourse());

    const { course } = await removeCourse.execute(courseCreated.course.id);

    expect(course?.removed).toEqual(expect.any(Date));
  });
  it('Should not be able to remove course', async () => {
    const courseRepository = new InMemoryCourseRepository();
    const createCourse = new CreateCourse(courseRepository);
    const removeCourse = new RemoveCourse(courseRepository);

    const courseCreated = await createCourse.execute(makeCourse());

    expect(async () => await removeCourse.execute(courseCreated.course.organizationsId)).rejects.toThrow(CourseNotFound);
  });
});
