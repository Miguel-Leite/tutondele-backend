import { Category } from '@app/entities/category';
import { CategoryRepository } from '@app/repositories/category-repository';

export class InMemoryCategoryRepository implements CategoryRepository {
  public categories: Category[] = [];

  async findById(id: string): Promise<Category | null> {
    const category = this.categories.find((item) => item.id === id);

    if (!category) {
      return null;
    }

    return category;
  }
  async findByName(name: string): Promise<Category | null> {
    const category = this.categories.find((item) => item.name === name);

    if (!category) {
      return null;
    }

    return category;
  }
  async findAll(organizationsId: string): Promise<Category[] | null> {
    const categories = this.categories.filter(
      (item) => item.organizationsId === organizationsId,
    );

    if (!categories) {
      return [];
    }

    return categories;
  }
  async create(category: Category): Promise<void> {
    this.categories.push(category);
  }
  async save(category: Category): Promise<void> {
    this.categories.push(category);
  }
}
