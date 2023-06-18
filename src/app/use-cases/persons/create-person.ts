import { Injectable } from '@nestjs/common';
import { PersonRepository } from '@app/repositories/person-repository';
import { Person } from '@app/entities/person';
import { Bi } from '@app/entities/bi';

interface CreatePersonRequest {
  firstName: string;
  lastName: string;
  bi?: string;
  phone?: string | null;
  email?: string | null;
};

interface CreatePersonResponse {
  person: Person;
};

@Injectable()
export class CreatePerson {
  constructor(private personRepository: PersonRepository) {}

  async execute(request:CreatePersonRequest): Promise<CreatePersonResponse> {
    const {
      firstName,
      lastName,
      bi,
      email,
      phone,
    } = request;

    const person = new Person({
      firstName,
      lastName,
      email,
      phone,
      bi,
    });

    await this.personRepository.create(person);

    return {
      person
    }
  }
}
