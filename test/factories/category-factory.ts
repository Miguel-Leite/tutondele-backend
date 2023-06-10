import { Category, CategoriesProps } from '@app/entities/category';

type Override = Partial<CategoriesProps>;

export function makeCategory(override: Override = {}) {
  return new Category({
    name: 'Internal',
    organizationsId: 'example-organization-id',
    created_at: new Date(),
    ...override,
  });
}
