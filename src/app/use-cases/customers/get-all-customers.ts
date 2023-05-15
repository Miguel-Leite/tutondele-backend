import { Injectable } from '@nestjs/common';
import { CustomerRepository } from '@app/repositories/customer-repository';
import { Customer } from '@app/entities/customer';

interface GetAllCustomersResponse {
  customers: Customer[];
}

@Injectable()
export class GetAllCustomers {
  constructor(private customerRepository: CustomerRepository) {}

  async execute(organizations:string): Promise<GetAllCustomersResponse> {
    const customers = await this.customerRepository.findAll(organizations);
    return { customers };
  }
}
