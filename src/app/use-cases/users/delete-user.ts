import { Injectable } from '@nestjs/common';
import { UserRepository } from '@app/repositories/user-repository';
import { UserNotFound } from './errors/user-not-found';

interface DeleteUserRequest {
  usersId: string;
}

type DeleteUserResponse = void;

@Injectable()
export class DeleteUser {
  constructor(private userRepository: UserRepository) {}

  async execute({ usersId }: DeleteUserRequest): Promise<DeleteUserResponse> {
    const user = await this.userRepository.findById(usersId);
    if (!user) {
      throw new UserNotFound();
    }
    user.remove();
    await this.userRepository.save(user);
  }
}
