import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query } from '@nestjs/graphql';

import { CreateCategory } from '@app/use-cases/categories/create-category';
import { GetAllCategories } from '@app/use-cases/categories/get-all-categories';
import { GetByIdCategory } from '@app/use-cases/categories/get-by-id-category';
import { RemoveCategory } from '@app/use-cases/categories/remove-category';
import { UpdateCategory } from '@app/use-cases/categories/update-category';
import { AuthGuard } from '@infra/http/auth/auth.guard';
import {
  CurrentCustomer,
  IAuthCustomer,
} from '@infra/http/auth/customer/current-customer';

import { CategoryModel } from '../dtos/models/category-model';
import { CreateCategoryInput } from '../dtos/inputs/create-category-input';
import { UpdateCategoryInput } from '../dtos/inputs/update-category-input';

export class CategoriesResolver {
  constructor(
    private getAllCategories: GetAllCategories,
    private getByIdCategory: GetByIdCategory,
    private createCategory: CreateCategory,
    private updateCategory: UpdateCategory,
    private removeCategory: RemoveCategory,
  ) {}

  @UseGuards(AuthGuard)
  @Query(() => [CategoryModel])
  async categories(@CurrentCustomer() customer: IAuthCustomer) {
    const { categories } = await this.getAllCategories.execute(
      customer.organizationsId,
    );

    return categories;
  }

  @Query(() => CategoryModel)
  async category(@Args('id') id: string) {
    const { category } = await this.getByIdCategory.execute(id);
    return category;
  }

  @UseGuards(AuthGuard)
  @Mutation(() => CategoryModel)
  async addCategory(
    @Args('data') data: CreateCategoryInput,
    @CurrentCustomer() customer: IAuthCustomer,
  ) {
    const { category } = await this.createCategory.execute({
      organizationsId: customer.organizationsId,
      ...data,
    });

    return category;
  }

  @UseGuards(AuthGuard)
  @Mutation(() => CategoryModel)
  async editCategory(
    @Args('data') data: UpdateCategoryInput,
    @CurrentCustomer() customer: IAuthCustomer,
  ) {
    const { category } = await this.updateCategory.execute({
      organizationsId: customer.organizationsId,
      ...data,
    });

    return category;
  }

  @UseGuards(AuthGuard)
  @Mutation(() => CategoryModel)
  async deleteCategory(@Args('id') id: string) {
    const { category } = await this.removeCategory.execute(id);

    return category;
  }
}
