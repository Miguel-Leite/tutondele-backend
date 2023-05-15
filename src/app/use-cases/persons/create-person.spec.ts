import { InMemoryPersonRepository } from '@test/repositories/in-memory-person-repository';
import { CreatePerson } from './create-person';

describe('Create Person use case', () => {
  it('should be able to create a user', async () => {
    const personRepository = new InMemoryPersonRepository();
    const createPerson = new CreatePerson(personRepository);

    const { person } = await createPerson.execute({
      firstName: 'John',
      lastName: 'Doe',
      phone: '+244944995020',
      email: 'johndoe@gmail.com',
      bi: '009899308LA049',
    });

    expect(personRepository.persons).toHaveLength(1);
    expect(personRepository.persons[0]).toEqual(person);
  });
});
