export class ServiceMonthlyNotFound extends Error {
  constructor() {
    super(`Service monthly not found.`);
  }
}
