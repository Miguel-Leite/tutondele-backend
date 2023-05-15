import { makePerson } from '@test/factories/person-factory';
import { makeUser } from '@test/factories/user-factory';
import { InMemoryPersonRepository } from '@test/repositories/in-memory-person-repository';
import { CreateCustomer } from './create-customer';
import { InMemoryCustomerRepository } from '@test/repositories/in-memory-customer';
import { UpdateCustomer } from './update-customer';

describe('Update User use case', () => {
  it('should be able to update a user', async () => {
    const personRepository = new InMemoryPersonRepository();
    const customerRepository = new InMemoryCustomerRepository(personRepository);
    const createCustomer = new CreateCustomer(customerRepository,personRepository);
    const updateCustomer = new UpdateCustomer(customerRepository,personRepository,);

    const person = makePerson();
    const { password, level } = makeUser({
      personsId: person.id,
    });

    const { customer } = await createCustomer.execute({
      firstName: person.firstName,
      lastName: person.lastName,
      email: person.email?person.email : '',
      phone: person.phone,
      password,
      level,
      organizationsId: 'exemple-organization-id'
    });

    await updateCustomer.execute({
      id: customer.id,
      firstName: person.firstName,
      lastName: person.lastName,
      email: person.email,
      level,
      phone: person.phone,
      username: customer.username,
    });

    expect(customerRepository.customers[0].created_at).toEqual(expect.any(Date));
  });
});
