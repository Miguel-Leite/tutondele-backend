import { Injectable } from '@nestjs/common';
import { UserRepository } from '@app/repositories/user-repository';
import { UserNotFound } from './errors/user-not-found';
import { User } from '@app/entities/user';

interface RemoveUserResponse {
  user: User;
}

@Injectable()
export class RemoveUser {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string): Promise<RemoveUserResponse> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new UserNotFound();
    }
    user.remove();
    await this.userRepository.save(user);
    return {
      user,
    };
  }
}
