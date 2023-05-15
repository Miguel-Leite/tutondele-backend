import { Customer } from "@app/entities/customer";
import { Person } from "@app/entities/person";
import { CustomerRepository } from "@app/repositories/customer-repository";
import { PersonRepository } from "@app/repositories/person-repository";

export class InMemoryCustomerRepository implements CustomerRepository {
  public customers: Customer[] = [];
  public persons: Person[] = [];
  constructor (private personRepository: PersonRepository){}
  async findById(customersId: string): Promise<Customer | null> {
    const customer = this.customers.find((item) => item.id === customersId);

    if (!customer) {
      return null;
    }

    return customer;
  }
  async findByEmail(email: string): Promise<Customer | null> {
    const person = await this.personRepository.findByEmail(email);
    
    if (!person) {
      return null;
    }

    const customer = this.customers.find((item) => item.personsId === person.id);
    
    if (!customer) {
      return null;
    }
    return customer;
  }
  async findAll(organizationsId: string): Promise<Customer[]> {
    const customers = this.customers.filter((item) => item.organizationsId === organizationsId);

    if (!customers) {
      return [];
    }

    return customers;
  }
  async create(customer: Customer): Promise<void> {
    this.customers.push(customer);
  }
  async save(customer: Customer): Promise<void> {
    const customerIndex = this.customers.findIndex((item) => item.id === customer.id);

    if (customerIndex >= 0) {
      this.customers[customerIndex] = customer;
    }
  }
}
