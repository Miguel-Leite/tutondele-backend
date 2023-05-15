import { Customers as RawCustomer } from '@prisma/client';
import { Customer } from '@app/entities/customer';

export class PrismaCustomerMapper {
  static toPrisma(customer: Customer) {
    return {
      id: customer.id,
      organizationsId: customer.organizationsId,
      personsId: customer.personsId,
      username: customer.username,
      password: customer.password,
      level: customer.level,
      verified: customer.verified,
      acceptTermsAndConditions: customer.acceptTermsAndConditions,
      removed: customer.removed,
      updated_at: customer.updated_at,
    };
  }

  static toDomain(raw: RawCustomer): Customer {
    return new Customer(
      {
        organizationsId: raw.organizationsId,
        username: raw.username,
        personsId: raw.personsId,
        password: raw.password,
        level: raw.level,
        removed: raw.removed,
        verified: raw.verified,
        created_at: raw.created_at,
        acceptTermsAndConditions: raw.acceptTermsAndConditions,
        ...raw.updated_at,
      },
      raw.id,
    );
  }

  static toDomainList(raw: RawCustomer[]): Customer [] {
    return raw.map((customer) => this.toDomain(customer));
  }
}
