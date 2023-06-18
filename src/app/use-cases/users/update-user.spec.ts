import { makePerson } from '@test/factories/person-factory';
import { makeUser } from '@test/factories/user-factory';
import { InMemoryPersonRepository } from '@test/repositories/in-memory-person-repository';
import { InMemoryUserRepository } from '@test/repositories/in-memory-user-repository';

import { CreateUser } from './create-user';
import { UpdateUser } from './update-user';

describe('Update User use case', () => {
  it('should be able to update a user', async () => {
    const usersRepository = new InMemoryUserRepository();
    const personRepository = new InMemoryPersonRepository();
    const createUser = new CreateUser(usersRepository, personRepository);
    const updateUser = new UpdateUser(usersRepository, personRepository);

    const person = makePerson();
    const { level } = makeUser({
      personsId: person.id,
    });

    const user = await createUser.execute({
      firstName: person.firstName,
      lastName: person.lastName,
      email: person.email ? person.email : '',
      phone: person.phone,
      level,
    });

    await updateUser.execute({
      id: user.user.id,
      firstName: person.firstName,
      lastName: person.lastName,
      email: person.email ? person.email : '',
      level,
      phone: person.phone,
      username: user.user.username,
    });

    expect(usersRepository.users[0].created_at).toEqual(expect.any(Date));
  });
});
