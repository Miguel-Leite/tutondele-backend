import { Injectable } from '@nestjs/common';
import { CustomerNotFound } from './errors/customer-not-found';
import { CustomerRepository } from '@app/repositories/customer-repository';

type DeleteCustomerResponse = void;

@Injectable()
export class DeleteCustomer {
  constructor(private customerRepository: CustomerRepository) {}

  async execute(customersId): Promise<DeleteCustomerResponse> {
    const customer = await this.customerRepository.findById(customersId);
    if (!customer) {
      throw new CustomerNotFound();
    }
    customer.remove();
    await this.customerRepository.save(customer);
  }
}
