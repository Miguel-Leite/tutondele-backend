import { makePerson } from '@test/factories/person-factory';
import { makeUser } from '@test/factories/user-factory';
import { InMemoryPersonRepository } from '@test/repositories/in-memory-person-repository';
import { CreateCustomer } from './create-customer';
import { InMemoryCustomerRepository } from '@test/repositories/in-memory-customer';
import { RemoveCustomer } from './remove-customer';

describe('Remove Customer use case', () => {
  it('should be able to remove a customer', async () => {
    const personRepository = new InMemoryPersonRepository();
    const customerRepository = new InMemoryCustomerRepository(personRepository);
    const createCustomer = new CreateCustomer(
      customerRepository,
      personRepository,
    );
    const removeCustomer = new RemoveCustomer(customerRepository);

    const person = makePerson();
    const { level } = makeUser({
      personsId: person.id,
    });

    const customerCreated = await createCustomer.execute({
      firstName: person.firstName,
      lastName: person.lastName,
      email: person.email ? person.email : '',
      phone: person.phone,
      level,
      organizationsId: 'exemple-organization-id',
    });

    const { customer } = await removeCustomer.execute(
      customerCreated.customer.id,
    );

    expect(customer.removed).toEqual(expect.any(Date));
  });
});
