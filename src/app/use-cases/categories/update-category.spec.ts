import { InMemoryCategoryRepository } from '@test/repositories/in-memory-category-repository';
import { CreateCategory } from './create-category';
import { makeCategory } from '@test/factories/category-factory';
import { UpdateCategory } from './update-category';

describe('Update course use case', () => {
  it('should be able to update course', async () => {
    const categoryRepository = new InMemoryCategoryRepository();
    const createCategory = new CreateCategory(categoryRepository);
    const updateCatgroy = new UpdateCategory(categoryRepository);

    const categoryCreated = await createCategory.execute(makeCategory({}));

    const { category } = await updateCatgroy.execute({
      id: categoryCreated.category.id,
      name: categoryCreated.category.name,
      description: 'Hello World',
      organizationsId: categoryCreated.category.organizationsId,
    });

    expect(category.description).toEqual('Hello World');
  });
});
