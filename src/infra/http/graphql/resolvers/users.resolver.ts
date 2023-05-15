import { CreateUser } from '@app/use-cases/create-user';
import { GetAllUsers } from '@app/use-cases/get-all-users';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from '../dtos/inputs/create-user-input';
import { UserModel } from '../dtos/models/user-model';

@Resolver(() => UserModel)
export class UsersResolver {
  constructor(
    private getAllUsers: GetAllUsers,
    private createUser: CreateUser,
  ) {}
  @Query(() => [UserModel])
  async users() {
    const { users } = await this.getAllUsers.execute();
    return users;
  }

  @Mutation(() => UserModel)
  async userCreate(@Args('data') data: CreateUserInput) {
    const { user } = await this.createUser.execute(data);
    return user;
  }
}
