import { Injectable } from '@nestjs/common';
import { hash } from 'bcryptjs';

import { PersonRepository } from '@app/repositories/person-repository';
import { CustomerRepository } from '@app/repositories/customer-repository';
import { Person } from '@app/entities/person';
import { Username } from '@app/entities/username';
import { Customer } from '@app/entities/customer';

interface CreateCustomerRequest {
  firstName: string;
  lastName: string;
  phone?: string | null;
  email: string;
  password: string;
  level: string | null;
  organizationsId: string;
}

interface CreateCustomerResponse {
  customer: Customer;
}

@Injectable()
export class CreateCustomer {
  constructor(
    private customerRepository: CustomerRepository,
    private personRepository: PersonRepository,
  ) {}

  async execute(request: CreateCustomerRequest): Promise<CreateCustomerResponse> {
    const { password, level, firstName, lastName, email, phone, organizationsId } = request;

    const person = new Person({
      firstName,
      lastName,
      email,
      phone,
    });

    const username = new Username(email);

    const hashPassword = await hash(password, 10);

    const customer = new Customer({
      organizationsId: organizationsId,
      personsId: person.id,
      username: username.value,
      password: hashPassword,
      level: level ?? 'EMPLOYE',
      acceptTermsAndConditions: true,
    });

    await Promise.all([
      await this.personRepository.create(person),
      await this.customerRepository.create(customer),
    ]);

    return { customer };
  }
}
