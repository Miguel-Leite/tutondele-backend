import { Course } from "./course";

describe('Course', () => {
  it('should be able to create a course', () => {
    const course = new Course({
      name: "Informática",
      organizationsId: "example-organization-id",
      description: "O curso de informática é um curso técnico",
    });
    expect(course).toBeTruthy();
  });
});
