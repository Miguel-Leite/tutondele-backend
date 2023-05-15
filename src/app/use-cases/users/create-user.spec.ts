import { InMemoryPersonRepository } from '@test/repositories/in-memory-person-repository';
import { InMemoryUserRepository } from '@test/repositories/in-memory-user-repository';
import { CreateUser } from './create-user';

describe('Create User use case', () => {
  it('should be able to create a user', async () => {
    const usersRepository = new InMemoryUserRepository();
    const personRepository = new InMemoryPersonRepository();
    const createUser = new CreateUser(usersRepository, personRepository);

    const { user } = await createUser.execute({
      firstName: 'John',
      lastName: 'Doe',
      password: 'password',
      phone: '+244944995020',
      email: 'johndoe@gmail.com',
      level: 'ADMIN',
    });

    expect(usersRepository.users).toHaveLength(1);
    expect(usersRepository.users[0]).toEqual(user);
  });
});
