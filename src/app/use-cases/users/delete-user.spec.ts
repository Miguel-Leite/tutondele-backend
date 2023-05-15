import { makePerson } from '@test/factories/person-factory';
import { makeUser } from '@test/factories/user-factory';
import { InMemoryPersonRepository } from '@test/repositories/in-memory-person-repository';
import { InMemoryUserRepository } from '@test/repositories/in-memory-user-repository';
import { CreateUser } from './create-user';
import { DeleteUser } from './delete-user';

describe('Delete User', () => {
  it('should be able to delete a user', async () => {
    const usersRepository = new InMemoryUserRepository();
    const personRepository = new InMemoryPersonRepository();
    const createUser = new CreateUser(usersRepository, personRepository);
    const deleteUser = new DeleteUser(usersRepository);

    const person = makePerson();
    const { password, level } = makeUser({
      personsId: person.id,
    });

    const { user } = await createUser.execute({
      firstName: person.firstName,
      lastName: person.lastName,
      email: person.email ? person.email : '',
      phone: person.phone,
      password,
      level,
    });

    await deleteUser.execute({ usersId: user.id });

    expect(usersRepository.users[0].removed).toEqual(expect.any(Date));
  });
});
