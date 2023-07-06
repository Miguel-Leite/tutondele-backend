import { Injectable } from '@nestjs/common';
import { StudentRepository } from '@app/repositories/student-repository';
import { StudentNotFound } from './errors/student-not-found';
import { Customer } from '@app/entities/customer';
import { PersonRepository } from '@app/repositories/person-repository';
import { Username } from '@app/entities/username';
import { hash } from 'bcryptjs';
import { CustomerRepository } from '@app/repositories/customer-repository';
import { Student } from '@app/entities/student';

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
    const studentExists = await this.studentRepository.findById(id);

    if (!studentExists) {
      throw new StudentNotFound();
    }

    if (studentExists.customersId) {
      throw new Error(
        'Este estudante já está associado a uma conta no sistema. Se você prosseguir, a associação existente será substituída pela nova associação com a conta atual. Certifique-se de que deseja realizar essa alteração.',
      );
    }

    const person = await this.personRepository.findById(
      studentExists.personsId,
    );

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
      organizationsId: studentExists.organizationsId,
    });

    const student = new Student({
      personsId: studentExists.personsId,
      roomsId: studentExists.roomsId,
      organizationsId: studentExists.organizationsId,
      customersId: customer.id,
    });

    Promise.all([
      await this.customerRepository.create(customer),
      await this.studentRepository.save(student),
    ]);

    return {
      customer,
    };
  }
}
