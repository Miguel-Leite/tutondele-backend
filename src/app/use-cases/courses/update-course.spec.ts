import { InMemoryCourseRepository } from "@test/repositories/in-memory-course-repository";
import { makeCourse } from "@test/factories/course-factory";

import { CreateCourse } from "./create-course";
import { UpdateCourse } from "./update-course";

describe('Update course use case', () => {
  it('should be able to update course', async () => {
    const courseRepository = new InMemoryCourseRepository();
    const createCourse = new CreateCourse(courseRepository);
    const updateCourses = new UpdateCourse(courseRepository);

    const courseCreated = await createCourse.execute(makeCourse({}));

    const { course } = await updateCourses.execute({
      id: courseCreated.course.id,
      name: courseCreated.course.name,
      description: "Hello World",
      organizationsId: courseCreated.course.organizationsId,
    });

    expect(course.description).toEqual("Hello World");
  });
});
