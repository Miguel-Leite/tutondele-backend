export class CategoryAlreadyExists extends Error {
  constructor() {
    super('Category already exists.');
  }
}
