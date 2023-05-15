import { Person } from '@app/entities/person';

export abstract class PersonRepository {
  abstract findById(personsId: string): Promise<Person | null>;
  abstract findByBI(bi: string): Promise<Person | null>;
  abstract findByEmail(email: string): Promise<Person | null>;
  abstract create(person: Person): Promise<void>;
  abstract save(person: Person): Promise<void>;
}
