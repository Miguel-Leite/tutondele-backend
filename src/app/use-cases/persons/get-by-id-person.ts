import { Injectable } from '@nestjs/common';
import { PersonRepository } from '@app/repositories/person-repository';
import { Person } from '@app/entities/person';

interface GetByIdPersonResponse {
  person: Person | null;
}

@Injectable()
export class GetByIdPerson {
  constructor(private personRepository: PersonRepository) {}

  async execute(id: string): Promise<GetByIdPersonResponse> {
    const person = await this.personRepository.findById(id);

    return {
      person,
    };
  }
}
