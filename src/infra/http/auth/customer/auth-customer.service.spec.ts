import { InMemoryCustomerRepository } from "@test/repositories/in-memory-customer";
import { InMemoryOrganizationRepository } from "@test/repositories/in-memory-organization-repository";
import { InMemoryPersonRepository } from "@test/repositories/in-memory-person-repository";
import { makePerson } from "@test/factories/person-factory";
import { makeOrganization } from "@test/factories/organization-factory";
import { makeCustomer } from "@test/factories/customer-factory";
import { AuthCustomerService } from "./auth-customer.service";
import { JwtService } from "@nestjs/jwt";
import authConfig from '../config';


describe('Authentication Customer service', () => {
  it('should be able to authenticate a customer', async () => {
    const personRepository = new InMemoryPersonRepository();
    const customerRepository = new InMemoryCustomerRepository(personRepository);
    const organizationRepository = new InMemoryOrganizationRepository();
    const jwtService = new JwtService({
      secret: authConfig.jwt.secret,
    });

    const person = makePerson({
      email: "miguel@gmail.com",
    });

    const organization = makeOrganization({
      is_active: true,
    });
    
    const customer = await makeCustomer({
      organizationsId: organization.id,
      personsId: person.id,
      verified: true,
    });

    await Promise.all([
      personRepository.create(person),
      organizationRepository.create(organization),
      customerRepository.create(customer),
    ]);

    const authCustomerService = new AuthCustomerService(customerRepository, organizationRepository, jwtService);
  

    const token = await authCustomerService.execute({
      email:"miguel@gmail.com",
      password: "password"
    });

    expect(token).toBeTruthy();

    const decodedToken = jwtService.decode(token);
    expect(decodedToken).toBeTruthy();

    if (decodedToken) {
      expect(decodedToken.sub).toEqual(customer.id);
    }
  });
});