export class PackageAlreadyExists extends Error {
  constructor() {
    super('Package already exists.');
  }
}