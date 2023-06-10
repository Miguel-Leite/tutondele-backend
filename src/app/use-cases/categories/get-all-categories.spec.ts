import { InMemoryCategoryRepository } from '@test/repositories/in-memory-category-repository';
import { makeCategory } from '@test/factories/category-factory';

import { CreateCategory } from './create-category';
import { GetAllCategories } from './get-all-categories';

describe('Get all categories use case', () => {
  it('should be able to get all categories', async () => {
    const categoryRepository = new InMemoryCategoryRepository();
    const createCourse = new CreateCategory(categoryRepository);
    const getAllCourses = new GetAllCategories(categoryRepository);

    const { category } = await createCourse.execute(
      makeCategory({
        organizationsId: 'example-organizations-id',
      }),
    );

    const { categories } = await getAllCourses.execute(
      'example-organizations-id',
    );

    expect(categories).toHaveLength(1);
    expect(categories?.[0]).toEqual(category);
  });
});
