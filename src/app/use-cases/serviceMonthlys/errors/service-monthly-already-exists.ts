export class ServiceMonthlyAlreadyExists extends Error {
  constructor() {
    super(`Service monthly already exists.`);
  }
}
