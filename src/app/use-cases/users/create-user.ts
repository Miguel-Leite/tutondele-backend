import { Injectable } from '@nestjs/common';
import { hash } from 'bcryptjs';
import { Person } from '@app/entities/person';
import { User } from '@app/entities/user';
import { Username } from '@app/entities/username';
import { PersonRepository } from '@app/repositories/person-repository';
import { UserRepository } from '@app/repositories/user-repository';

interface CreateUserRequest {
  firstName: string;
  lastName: string;
  phone?: string | null;
  email: string;
  password: string;
  level: string | null;
}

interface CreateUserResponse {
  user: User;
}

@Injectable()
export class CreateUser {
  constructor(
    private userRepository: UserRepository,
    private personRepository: PersonRepository,
  ) {}

  async execute(request: CreateUserRequest): Promise<CreateUserResponse> {
    const { password, level, firstName, lastName, email, phone } = request;

    const person = new Person({
      firstName,
      lastName,
      email,
      phone,
    });

    const username = new Username(email);

    const hashPassword = await hash(password, 10);

    const user = new User({
      personsId: person.id,
      username: username.value,
      password: hashPassword,
      level: level ?? 'EMPLOYE',
      acceptTermsAndConditions: true,
    });

    await Promise.all([
      await this.personRepository.create(person),
      await this.userRepository.create(user),
    ]);

    return { user };
  }
}
