export class PackageNotFound extends Error {
  constructor() {
    super('Package not found.');
  }
}