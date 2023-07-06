import { Injectable } from '@nestjs/common';
import { StudentRepository } from '@app/repositories/student-repository';
import { StudentNotFound } from './errors/student-not-found';
import { Customer } from '@app/entities/customer';
import { PersonRepository } from '@app/repositories/person-repository';
import { Username } from '@app/entities/username';
import { hash } from 'bcryptjs';
import { CustomerRepository } from '@app/repositories/customer-repository';

interface AddAccountStudentResponse {
  customer: Customer | null;
}

@Injectable()
export class AddAccountStudent {
  constructor(
    private studentRepository: StudentRepository,
    private personRepository: PersonRepository,
    private customerRepository: CustomerRepository,
  ) {}

  async execute(id: string): Promise<AddAccountStudentResponse> {
    const student = await this.studentRepository.findById(id);

    if (!student) {
      throw new StudentNotFound();
    }

    const person = await this.personRepository.findById(student.personsId);

    if (!person) {
      throw new StudentNotFound();
    }

    if (!person.email) {
      throw new Error('O Estudante deve ter um e-mail.');
    }

    const hashPassword = await hash('password', 10);

    const username = new Username(person.email);

    const customer = new Customer({
      username: username.value,
      personsId: person.id,
      level: 'STUDENT',
      password: hashPassword,
      acceptTermsAndConditions: true,
      verified: true,
      organizationsId: student.organizationsId,
    });

    await this.customerRepository.create(customer);

    return {
      customer,
    };
  }
}
