import { InMemoryPersonRepository } from '@test/repositories/in-memory-person-repository';
import { CreateCustomer } from './create-customer';
import { InMemoryCustomerRepository } from '@test/repositories/in-memory-customer';

describe('Create Customer use case', () => {
  it('should be able to create a customer', async () => {
    const personRepository = new InMemoryPersonRepository();
    const customerRepository = new InMemoryCustomerRepository(personRepository);;
    const createCustomer = new CreateCustomer(customerRepository,personRepository);

    const { customer } = await createCustomer.execute({
      firstName: 'John',
      lastName: 'Doe',
      password: 'password',
      phone: '+244944995020',
      email: 'johndoe@gmail.com',
      level: 'ADMIN',
      organizationsId: '7cb0b681-74df-46d0-bcd7-92424adb92a7'
    });

    expect(customerRepository.customers).toHaveLength(1);
    expect(customerRepository.customers[0]).toEqual(customer);
  });
});
