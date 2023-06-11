export class PaymentServiceMonthlyNotFound extends Error {
  constructor() {
    super(`Payment service monthly not found.`);
  }
}
