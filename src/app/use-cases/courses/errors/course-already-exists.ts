export class CourseAlreadyExists extends Error {
  constructor () {
    super('Course already exists');
  }
}
