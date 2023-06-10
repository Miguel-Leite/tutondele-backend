import { InMemoryCategoryRepository } from '@test/repositories/in-memory-category-repository';
import { CreateCategory } from './create-category';
import { makeCategory } from '@test/factories/category-factory';
import { CategoryAlreadyExists } from './errors/category-already-exists';

describe('Create category use case', () => {
  it('should be able to create a category', async () => {
    const categoryRepository = new InMemoryCategoryRepository();
    const createCategory = new CreateCategory(categoryRepository);

    const { category } = await createCategory.execute(makeCategory());

    expect(categoryRepository.categories).toHaveLength(1);
    expect(categoryRepository.categories[0].id).toEqual(category.id);
  });

  it('should be able to check if the category already exists', async () => {
    const categoryRepository = new InMemoryCategoryRepository();
    const createCategory = new CreateCategory(categoryRepository);

    await createCategory.execute(makeCategory());

    expect(
      async () => await createCategory.execute(makeCategory()),
    ).rejects.toThrow(CategoryAlreadyExists);
  });
});
