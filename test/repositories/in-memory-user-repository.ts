import { Person } from '@app/entities/person';
import { User } from '@app/entities/user';
import { UserRepository } from '@app/repositories/user-repository';

export class InMemoryUserRepository implements UserRepository {
  public users: User[] = [];
  public persons: Person[] = [];
  async findById(usersId: string): Promise<User | null> {
    const user = this.users.find((item) => item.id === usersId);

    if (!user) {
      return null;
    }

    return user;
  }
  async findByEmail(email: string): Promise<User | null> {
    const person = this.persons.find((item) => item.email === email);

    if (!person) {
      return null;
    }

    const user = this.users.find((item) => item.personsId === person.id);
    
    if (!user) {
      return null;
    }

    return user;
  }
  async findAll(): Promise<User[]> {
    return this.users;
  }
  async create(user: User): Promise<void> {
    this.users.push(user);
  }
  async save(user: User): Promise<void> {
    const userIndex = this.users.findIndex((item) => item.id === user.id);

    if (userIndex >= 0) {
      this.users[userIndex] = user;
    }
  }
}
