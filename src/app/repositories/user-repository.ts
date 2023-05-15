import { User } from '@app/entities/user';

export abstract class UserRepository {
  abstract findById(usersId: string): Promise<User | null>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findAll(): Promise<User[]>;
  abstract create(user: User): Promise<void>;
  abstract save(user: User): Promise<void>;
}
