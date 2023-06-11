export class ServiceAlreadyExists extends Error {
  constructor() {
    super(`Service already exists.`);
  }
}
