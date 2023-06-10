import { Category } from '@app/entities/category';
import { CategoryRepository } from '@app/repositories/category-repository';
import { CategoryAlreadyExists } from './errors/category-already-exists';

interface CreateCategoryRequest {
  organizationsId: string;
  name: string;
  description?: string;
}

interface CreateCategoryResponse {
  category: Category;
}

export class CreateCategory {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute({
    name,
    description,
    organizationsId,
  }: CreateCategoryRequest): Promise<CreateCategoryResponse> {
    const category = new Category({
      name,
      description,
      organizationsId,
    });

    const categoryAlreadyExists = await this.categoryRepository.findByName(
      category.name,
    );

    if (categoryAlreadyExists) {
      throw new CategoryAlreadyExists();
    }

    this.categoryRepository.create(category);

    return { category };
  }
}
