export class LicenseNotFound extends Error {
  constructor() {
    super('License not found.');
  }
}