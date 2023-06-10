import { CategoryRepository } from '@app/repositories/category-repository';
import { CategoryNotFound } from './errors/category-not-found';

export class RemoveCategory {
  constructor(private categoriesRepository: CategoryRepository) {}

  async execute(id: string) {
    const category = await this.categoriesRepository.findById(id);

    if (!category) {
      throw new CategoryNotFound();
    }

    category.remove();

    this.categoriesRepository.save(category);

    return {
      category,
    };
  }
}
