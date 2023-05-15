import { Injectable } from '@nestjs/common';
import { Person } from '@app/entities/person';
import { PersonRepository } from '@app/repositories/person-repository';
import { Customer } from '@app/entities/customer';
import { CustomerRepository } from '@app/repositories/customer-repository';

interface UpdateCustomerRequest {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  phone?: string | null;
  email?: string | null;
  level: string | null;
  personsId?: string | null;
}

interface UpdateCustomerResponse {
  customer: Customer;
}

@Injectable()
export class UpdateCustomer {
  constructor(
    private customerRepository: CustomerRepository,
    private personRepository: PersonRepository,
  ) {}

  async execute(request: UpdateCustomerRequest): Promise<UpdateCustomerResponse> {
    const { id, level, firstName, lastName, email, phone, username } = request;

    const customerExists = await this.customerRepository.findById(id);
    if (!customerExists) {
      throw new Error('User not found.');
    }

    const personExists = await this.personRepository.findById(
      customerExists.personsId,
    );

    if (!personExists) {
      throw new Error('User not found.');
    }

    const person = new Person(
      {
        firstName,
        lastName,
        email,
        phone,
      },
      customerExists.personsId,
    );

    const customer = new Customer({
      level,
      username,
      personsId: person.id,
      password: customerExists.password,
      organizationsId: customerExists.organizationsId,
    },id);

    await Promise.all([
      await this.customerRepository.save(customer),
      await this.personRepository.save(person),
    ]);

    return { customer };
  }
}
