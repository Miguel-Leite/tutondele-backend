import { Injectable } from '@nestjs/common';
import { Customer } from '@app/entities/customer';
import { CustomerRepository } from '@app/repositories/customer-repository';
import { CustomerNotFound } from './errors/customer-not-found';

interface UpdateCustomerResponse {
  customer: Customer;
}

@Injectable()
export class RemoveCustomer {
  constructor(
    private customerRepository: CustomerRepository,
  ) {}

  async execute(id: string): Promise<UpdateCustomerResponse> {
    const customer = await this.customerRepository.findById(id);
    if (!customer) {
      throw new CustomerNotFound();
    }
    
    customer.remove();
    this.customerRepository.save(customer);

    return { customer }
  }
}
