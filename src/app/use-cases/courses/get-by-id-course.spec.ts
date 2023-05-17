import { InMemoryCourseRepository } from "@test/repositories/in-memory-course-repository";
import { makeCourse } from "@test/factories/course-factory";
import { CreateCourse } from "./create-course";
import { GetByIdCourse } from "./get-by-id-course";

describe('Get by id course use case', () => {
  it('should be able to get by id course', async () => {
    const courseRepository = new InMemoryCourseRepository();
    const createCourse = new CreateCourse(courseRepository);
    const getByIdCourse = new GetByIdCourse(courseRepository);

    const courseCreated = await createCourse.execute(makeCourse());

    const { course } = await getByIdCourse.execute(courseCreated.course.id);

    expect(courseCreated.course).toEqual(course);
  });
});
