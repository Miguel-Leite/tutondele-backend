export class CustomerEmailExists extends Error {
  constructor() {
    super('E-mail user already exists.');
  }
}
