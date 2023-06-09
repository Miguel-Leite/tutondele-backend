import { makePerson } from '@test/factories/person-factory';
import { makeUser } from '@test/factories/user-factory';
import { InMemoryPersonRepository } from '@test/repositories/in-memory-person-repository';
import { InMemoryCustomerRepository } from '@test/repositories/in-memory-customer';
import { CreateCustomer } from './create-customer';
import { GetAllCustomers } from './get-all-customers';

describe('Get All Customers use case', () => {
  it('should be able to get all customers', async () => {
    const personRepository = new InMemoryPersonRepository();
    const customerRepository = new InMemoryCustomerRepository(personRepository);
    const createCustomer = new CreateCustomer(
      customerRepository,
      personRepository,
    );
    const getAllCustomers = new GetAllCustomers(customerRepository);

    const person = makePerson();
    const { level } = makeUser({
      personsId: person.id,
    });

    await createCustomer.execute({
      firstName: person.firstName,
      lastName: person.lastName,
      email: person.email ? person.email : '',
      phone: person.phone,
      level,
      organizationsId: 'exemple-organization-id',
    });

    await createCustomer.execute({
      firstName: person.firstName,
      lastName: person.lastName,
      email: person.email ? person.email : '',
      phone: person.phone,
      level,
      organizationsId: 'exemple-organization-id',
    });

    const { customers } = await getAllCustomers.execute(
      'exemple-organization-id',
    );

    expect(customers[0].created_at).toEqual(expect.any(Date));
  });
});
