import { makePerson } from '@test/factories/person-factory';
import { makeUser } from '@test/factories/user-factory';
import { InMemoryPersonRepository } from '@test/repositories/in-memory-person-repository';
import { InMemoryCustomerRepository } from '@test/repositories/in-memory-customer';
import { CreateCustomer } from './create-customer';
import { GetByIdCustomer } from './get-by-id-customer';

describe('Get All Customers use case', () => {
  it('should be able to get all customers', async () => {
    const personRepository = new InMemoryPersonRepository();
    const customerRepository = new InMemoryCustomerRepository(personRepository);;
    const createCustomer = new CreateCustomer(customerRepository,personRepository);
    const getByIdCustomer = new GetByIdCustomer(customerRepository)

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
      organizationsId: 'exemple-organization-id',
    });

    const response = await getByIdCustomer.execute(customer.id);

    expect(response.customer?.created_at).toEqual(expect.any(Date));
  });
});
