import { CategoryRepository } from '@app/repositories/category-repository';
import { Category } from '@app/entities/category';

import { CategoryNotFound } from './errors/category-not-found';

interface GetByIdCategoryResponse {
  category: Category | null;
}

export class GetByIdCategory {
  constructor(private categoriesRepository: CategoryRepository) {}

  async execute(id: string): Promise<GetByIdCategoryResponse> {
    const category = await this.categoriesRepository.findById(id);

    if (!category) {
      throw new CategoryNotFound();
    }

    return {
      category,
    };
  }
}
