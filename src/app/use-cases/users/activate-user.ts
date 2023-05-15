import { Injectable } from '@nestjs/common';
import { UserRepository } from '@app/repositories/user-repository';
import { UserNotFound } from './errors/user-not-found';

interface ActivateUserRequest {
  usersId: string;
}

type ActivateUserResponse = void;

@Injectable()
export class ActivateUser {
  constructor(private userRepository: UserRepository) {}

  async execute({
    usersId,
  }: ActivateUserRequest): Promise<ActivateUserResponse> {
    const user = await this.userRepository.findById(usersId);
    if (!user) {
      throw new UserNotFound();
    }
    user.activate();
    await this.userRepository.save(user);
  }
}
