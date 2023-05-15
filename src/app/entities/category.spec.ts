import { Category } from "./category";

describe('Category', () => {
  it('should be able to create a category', () => {
    const category = new Category({
      name: "Interno",
      organizationsId: "example-organization-id",
      description: "O categoria interno se referi aos serviços como: folhas, cópias, etc.",
    });
    expect(category).toBeTruthy();
  });
});
