
export class StudentLimitReached extends Error {
  constructor() {
    super('Reached the student limit in the system.');
  }
}
