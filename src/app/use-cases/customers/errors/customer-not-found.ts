export class CustomerNotFound extends Error {
  constructor() {
    super('User not found');
  }
}
