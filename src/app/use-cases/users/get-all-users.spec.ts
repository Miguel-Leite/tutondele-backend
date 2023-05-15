import { makePerson } from '@test/factories/person-factory';
import { makeUser } from '@test/factories/user-factory';
import { InMemoryPersonRepository } from '@test/repositories/in-memory-person-repository';
import { InMemoryUserRepository } from '@test/repositories/in-memory-user-repository';
import { CreateUser } from './create-user';
import { GetAllUsers } from './get-all-users';

describe('Update User use case', () => {
  it('should be able to update a user', async () => {
    const usersRepository = new InMemoryUserRepository();
    const personRepository = new InMemoryPersonRepository();
    const createUser = new CreateUser(usersRepository, personRepository);
    const getAllUsers = new GetAllUsers(usersRepository);

    const person = makePerson();
    const { password, level } = makeUser({
      personsId: person.id,
    });

    await createUser.execute({
      firstName: person.firstName,
      lastName: person.lastName,
      email: person.email ? person.email : '',
      phone: person.phone,
      password,
      level,
    });

    await createUser.execute({
      firstName: person.firstName,
      lastName: person.lastName,
      email: person.email ? person.email : '',
      phone: person.phone,
      password,
      level,
    });

    const { users } = await getAllUsers.execute();

    expect(users[0].created_at).toEqual(expect.any(Date));
  });
});
