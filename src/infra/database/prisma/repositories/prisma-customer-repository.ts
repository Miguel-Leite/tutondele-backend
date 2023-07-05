import { Injectable } from '@nestjs/common';

import { CustomerRepository } from '@app/repositories/customer-repository';
import { Customer } from '@app/entities/customer';

import { PrismaService } from '../prisma.service';
import { PrismaCustomerMapper } from '../mappers/prisma-customer-mapper';

@Injectable()
export class PrismaCustomerRepository implements CustomerRepository {
  constructor(private prisma: PrismaService) {}
  async findAll(organizationsId: string): Promise<Customer[]> {
    const customers = await this.prisma.customers.findMany({
      where: { organizationsId, removed: null },
    });

    return PrismaCustomerMapper.toDomainList(customers);
  }
  async findById(customerId: string): Promise<Customer | null> {
    const customer = await this.prisma.customers.findFirst({
      where: { id: customerId, removed: null },
    });

    if (!customer) {
      return null;
    }

    return PrismaCustomerMapper.toDomain(customer);
  }
  async findByEmail(email: string): Promise<Customer | null> {
    const customer = await this.prisma.customers.findFirst({
      where: {
        persons: {
          email,
        },
      },
    });

    if (!customer) {
      return null;
    }

    return PrismaCustomerMapper.toDomain(customer);
  }
  async create(customer: Customer): Promise<void> {
    await this.prisma.customers.create({
      data: PrismaCustomerMapper.toPrisma(customer),
    });
  }
  async save(customer: Customer): Promise<void> {
    await this.prisma.customers.updateMany({
      where: { id: customer.id },
      data: PrismaCustomerMapper.toPrisma(customer),
    });
  }
}
