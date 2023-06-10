import { InMemoryCategoryRepository } from '@test/repositories/in-memory-category-repository';
import { CreateCategory } from './create-category';
import { RemoveCategory } from './remove-category';
import { CategoryNotFound } from './errors/category-not-found';
import { makeCategory } from '@test/factories/category-factory';

describe('Removed category use case', () => {
  it('should be able to removed category', async () => {
    const categoryRepository = new InMemoryCategoryRepository();
    const createCategory = new CreateCategory(categoryRepository);
    const removeCategory = new RemoveCategory(categoryRepository);

    const categoryCreated = await createCategory.execute(makeCategory());

    const { category } = await removeCategory.execute(
      categoryCreated.category.id,
    );

    expect(category?.removed).toEqual(expect.any(Date));
  });
  it('Should not be able to remove category', async () => {
    const categoryRepository = new InMemoryCategoryRepository();
    const createCategory = new CreateCategory(categoryRepository);
    const removeCategory = new RemoveCategory(categoryRepository);

    const categoryCreated = await createCategory.execute(makeCategory());

    expect(
      async () =>
        await removeCategory.execute(categoryCreated.category.organizationsId),
    ).rejects.toThrow(CategoryNotFound);
  });
});
