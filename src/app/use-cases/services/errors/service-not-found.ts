export class ServiceNotFound extends Error {
  constructor() {
    super(`Service not found.`);
  }
}
