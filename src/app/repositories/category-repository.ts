import { Category } from '@app/entities/category';

export abstract class CategoryRepository {
  abstract findById(id: string): Promise<Category | null>;
  abstract findByName(name: string): Promise<Category | null>;
  abstract findAll(organizationsId: string): Promise<Category[] | null>;
  abstract create(category: Category): Promise<void>;
  abstract save(category: Category): Promise<void>;
}
