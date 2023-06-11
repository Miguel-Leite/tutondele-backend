export class ReferencePaymentServiceMonthlyAlreadyExists extends Error {
  constructor() {
    super(`Reference payment already exists.`);
  }
}
