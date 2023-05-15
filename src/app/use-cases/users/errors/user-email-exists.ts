export class UserEmailExists extends Error {
  constructor() {
    super('E-mail user already exists.');
  }
}
