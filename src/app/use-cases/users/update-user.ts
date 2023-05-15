import { Injectable } from '@nestjs/common';
import { Person } from '@app/entities/person';
import { User } from '@app/entities/user';
import { PersonRepository } from '@app/repositories/person-repository';
import { UserRepository } from '@app/repositories/user-repository';

interface UpdateUserRequest {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  phone?: string | null;
  email?: string | null;
  level: string | null;
  personsId?: string | null;
}

interface UpdateUserResponse {
  user: User;
}

@Injectable()
export class UpdateUser {
  constructor(
    private userRepository: UserRepository,
    private personRepository: PersonRepository,
  ) {}

  async execute(request: UpdateUserRequest): Promise<UpdateUserResponse> {
    const { id, level, firstName, lastName, email, phone, username } = request;

    const userExists = await this.userRepository.findById(id);
    if (!userExists) {
      throw new Error('User not found.');
    }

    const personExists = await this.personRepository.findById(
      userExists.personsId,
    );

    if (!personExists) {
      throw new Error('Person not found.');
    }

    const person = new Person(
      {
        firstName,
        lastName,
        email,
        phone,
      },
      userExists.personsId,
    );

    const user = new User({
      level,
      username,
      personsId: person.id,
      password: userExists.password,
    });

    await Promise.all([
      await this.userRepository.save(user),
      await this.personRepository.save(person),
    ]);

    return { user };
  }
}
