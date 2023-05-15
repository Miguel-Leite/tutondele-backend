import { Injectable } from '@nestjs/common';
import { CustomerRepository } from '@app/repositories/customer-repository';
import { Customer } from '@app/entities/customer';

interface GetByIdCustomerResponse {
  customer: Customer | null;
}

@Injectable()
export class GetByIdCustomer {
  constructor(private customerRepository: CustomerRepository) {}

  async execute(id:string): Promise<GetByIdCustomerResponse> {
    const customer = await this.customerRepository.findById(id);
    return { customer };
  }
}
