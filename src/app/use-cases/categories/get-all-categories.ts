import { CategoryRepository } from '@app/repositories/category-repository';
import { Category } from '@app/entities/category';

interface GetAllCategoriesResponse {
  categories: Category[] | null;
}

export class GetAllCategories {
  constructor(private categoriesRepository: CategoryRepository) {}

  async execute(organizationsId: string): Promise<GetAllCategoriesResponse> {
    const categories = await this.categoriesRepository.findAll(organizationsId);
    return {
      categories,
    };
  }
}
