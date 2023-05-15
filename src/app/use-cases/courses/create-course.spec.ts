import { InMemoryCourseRepository } from "@test/repositories/in-memory-course-repository";
import { makeCourse } from "@test/factories/course-factory";
import { CreateCourse } from "./create-course";
import { CourseAlreadyExists } from "./errors/course-already-exists";

describe('Create course use case', () => {
  it('should be able to create a course', async () => {
    const courseRepository = new InMemoryCourseRepository();
    const createCourse = new CreateCourse(courseRepository);

    const { course } = await createCourse.execute(makeCourse());

    expect(courseRepository.courses).toHaveLength(1);
    expect(courseRepository.courses[0]).toEqual(course);
  });

  it('should be able to check if the course already exists', async () => {
    const courseRepository = new InMemoryCourseRepository();
    const createCourse = new CreateCourse(courseRepository);

    await createCourse.execute(makeCourse());

    expect(async () => await createCourse.execute(makeCourse())).rejects.toThrow(CourseAlreadyExists);
  });
});
