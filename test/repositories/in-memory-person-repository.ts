import { Person } from '@app/entities/person';
import { PersonRepository } from '@app/repositories/person-repository';

export class InMemoryPersonRepository implements PersonRepository {
  public persons: Person[] = [];
  async findById(personsId: string): Promise<Person | null> {
    const person = this.persons.find((item) => item.id === personsId);

    if (!person) {
      return null;
    }

    return person;
  }
  async findByBI(bi: string): Promise<Person | null> {
    const person = this.persons.find((item) => item.bi?.value === bi);

    if (!person) {
      return null;
    }

    return person;
  }
  async findByEmail(email: string): Promise<Person | null> {
    const person = this.persons.find((item) => item.email === email);

    if (!person) {
      return null;
    }

    return person;
  }
  async create(person: Person): Promise<void> {
    this.persons.push(person);
  }
  async save(person: Person): Promise<void> {
    const personIndex = this.persons.findIndex((item) => item.id === person.id);

    if (personIndex >= 0) {
      this.persons[personIndex] = person;
    }
  }
}
