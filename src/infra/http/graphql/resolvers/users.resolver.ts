import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CreateUserInput } from '../dtos/inputs/create-user-input';
import { UserModel } from '../dtos/models/user-model';
import { GetAllUsers } from '@app/use-cases/users/get-all-users';
import { CreateUser } from '@app/use-cases/users/create-user';
import { RemoveUser } from '@app/use-cases/users/remove-user';
import { AuthUserService } from '@infra/http/auth/user/auth-user.service';
import { AuthUserInput } from '../dtos/inputs/auth-user-input';
import { PersonModel } from '../dtos/models/person-model';
import { GetByIdPerson } from '@app/use-cases/persons/get-by-id-person';

@Resolver(() => UserModel)
export class UsersResolver {
  constructor(
    private getAllUsers: GetAllUsers,
    private removeUser: RemoveUser,
    private createUser: CreateUser,
    private getByIdPerson: GetByIdPerson,
    private authUSerService: AuthUserService,
  ) {}
  @Query(() => [UserModel])
  async users() {
    const { users } = await this.getAllUsers.execute();
    return users;
  }

  @Mutation(() => String)
  async authenticationUser(@Args('data') data: AuthUserInput) {
    return await this.authUSerService.execute(data);
  }

  @Mutation(() => UserModel)
  async addUser(@Args('data') data: CreateUserInput) {
    const { user } = await this.createUser.execute(data);
    return user;
  }

  @Mutation(() => UserModel)
  async deleteUser(@Args('id') id: string) {
    const { user } = await this.removeUser.execute(id);
    return user;
  }

  @ResolveField(() => PersonModel)
  async person(@Parent() user: UserModel) {
    const { person } = await this.getByIdPerson.execute(user.personsId);
    return person;
  }
}
