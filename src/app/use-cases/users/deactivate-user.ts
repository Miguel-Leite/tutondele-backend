import { Injectable } from '@nestjs/common';
import { UserRepository } from '@app/repositories/user-repository';
import { UserNotFound } from './errors/user-not-found';

interface DeactivateUserRequest {
  usersId: string;
}

type DeactivateUserResponse = void;

@Injectable()
export class DeactivateUser {
  constructor(private userRepository: UserRepository) {}

  async execute({
    usersId,
  }: DeactivateUserRequest): Promise<DeactivateUserResponse> {
    const user = await this.userRepository.findById(usersId);
    if (!user) {
      throw new UserNotFound();
    }
    user.deactivate();
    await this.userRepository.save(user);
  }
}
