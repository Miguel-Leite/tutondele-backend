import { Category } from '@app/entities/category';
import { CategoryRepository } from '@app/repositories/category-repository';

import { CategoryAlreadyExists } from './errors/category-already-exists';

interface UpdateCategoryRequest {
  id: string;
  name: string;
  description?: string;
  organizationsId: string;
}

interface UpdateCategoryResponse {
  category: Category;
}

export class UpdateCategory {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute({
    id,
    name,
    description,
    organizationsId,
  }: UpdateCategoryRequest): Promise<UpdateCategoryResponse> {
    const category = new Category(
      {
        name,
        description,
        organizationsId,
      },
      id,
    );

    const categoryExists = this.categoryRepository.findById(id);

    if (!categoryExists) {
      throw new CategoryAlreadyExists();
    }

    this.categoryRepository.save(category);

    return { category };
  }
}
