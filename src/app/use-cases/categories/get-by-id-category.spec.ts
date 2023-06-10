import { InMemoryCategoryRepository } from '@test/repositories/in-memory-category-repository';
import { CreateCategory } from './create-category';
import { GetByIdCategory } from './get-by-id-category';
import { makeCategory } from '@test/factories/category-factory';

describe('Get by id category use case', () => {
  it('should be able to get by id category', async () => {
    const categoryRepository = new InMemoryCategoryRepository();
    const createCategory = new CreateCategory(categoryRepository);
    const getByIdCategory = new GetByIdCategory(categoryRepository);

    const categoryCreated = await createCategory.execute(makeCategory());

    const { category } = await getByIdCategory.execute(
      categoryCreated.category.id,
    );

    expect(categoryCreated.category).toEqual(category);
  });
});
