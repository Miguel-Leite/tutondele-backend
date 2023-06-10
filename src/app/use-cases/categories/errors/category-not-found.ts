export class CategoryNotFound extends Error {
  constructor() {
    super('Category not found.');
  }
}
