import { Customer } from '@app/entities/customer';
import { User } from '@app/entities/user';

export abstract class CustomerRepository {
  abstract findById(customerId: string): Promise<Customer | null>;
  abstract findByEmail(email: string): Promise<Customer | null>;
  abstract findAll(organizationsId: string): Promise<Customer[]>;
  abstract create(customer: Customer): Promise<void>;
  abstract save(customer: Customer): Promise<void>;
}
