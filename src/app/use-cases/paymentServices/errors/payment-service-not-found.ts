export class PaymentServiceNotFound extends Error {
  constructor() {
    super(`Payment Service not found.`);
  }
}
