import { Injectable } from '@nestjs/common';
import { UserRepository } from '@app/repositories/user-repository';
import { User } from '@app/entities/user';

interface GetAllUsersResponse {
  users: User[];
}

@Injectable()
export class GetAllUsers {
  constructor(private userRepository: UserRepository) {}

  async execute(): Promise<GetAllUsersResponse> {
    const users = await this.userRepository.findAll();
    return { users };
  }
}
