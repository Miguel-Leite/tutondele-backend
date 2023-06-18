import { makePerson } from '@test/factories/person-factory';
import { makeUser } from '@test/factories/user-factory';
import { InMemoryPersonRepository } from '@test/repositories/in-memory-person-repository';
import { CreateCustomer } from './create-customer';
import { DeleteCustomer } from './delete-customer';
import { InMemoryCustomerRepository } from '@test/repositories/in-memory-customer';

describe('Delete Customer', () => {
  it('should be able to delete a customer', async () => {
    const personRepository = new InMemoryPersonRepository();
    const customersRepository = new InMemoryCustomerRepository(
      personRepository,
    );
    const createCustomer = new CreateCustomer(
      customersRepository,
      personRepository,
    );
    const deleteCustomer = new DeleteCustomer(customersRepository);

    const person = makePerson();
    makeUser({
      personsId: person.id,
    });

    const { customer } = await createCustomer.execute({
      firstName: 'John',
      lastName: 'Doe',
      phone: '+244944995020',
      email: 'johndoe@gmail.com',
      level: 'ADMIN',
      organizationsId: '7cb0b681-74df-46d0-bcd7-92424adb92a7',
    });

    await deleteCustomer.execute(customer.id);

    expect(customersRepository.customers[0].removed).toEqual(expect.any(Date));
  });
});
