import { makePerson } from '@test/factories/person-factory';
import { makeUser } from '@test/factories/user-factory';
import { InMemoryPersonRepository } from '@test/repositories/in-memory-person-repository';
import { CreateCustomer } from './create-customer';
import { InMemoryCustomerRepository } from '@test/repositories/in-memory-customer';
import { RetrieveCustomer } from './retrieve-customer';

describe('Retrieve Customer use case', () => {
  it('should be able to retrieve a customer', async () => {
    const personRepository = new InMemoryPersonRepository();
    const customerRepository = new InMemoryCustomerRepository(personRepository);
    const createCustomer = new CreateCustomer(customerRepository,personRepository);
    const retrieveCustomer = new RetrieveCustomer(customerRepository);

    const person = makePerson();
    const { password, level } = makeUser({
      personsId: person.id,
    });

    const customerCreated  = await createCustomer.execute({
      firstName: person.firstName,
      lastName: person.lastName,
      email: person.email?person.email : '',
      phone: person.phone,
      password,
      level,
      organizationsId: 'exemple-organization-id'
    });

    const { customer } = await retrieveCustomer.execute(customerCreated.customer.id);

    expect(customer.removed).toEqual(null);
  });
});
