import { Instruction } from "@prisma/client";
import { InMemoryAddressRepository } from "@test/repositories/in-memory-address-repository";
import { InMemoryContactRepository } from "@test/repositories/in-memory-contact-repository";
import { InMemoryCustomerRepository } from "@test/repositories/in-memory-customer";
import { InMemoryOrganizationRepository } from "@test/repositories/in-memory-organization-repository";
import { InMemoryPersonRepository } from "@test/repositories/in-memory-person-repository";

import { CreateOrganization } from "./create-organization";
import { OrganizationNotFound } from "./errors/organization-not-found";
import { ActivateOrganization } from "./activate-organization";


describe('Activate organization use case', () => {
  it('should be able to activate organization', async () => {
    const personRepository = new InMemoryPersonRepository();
    const customerRepository = new InMemoryCustomerRepository(personRepository);;
    const organizationRepository = new InMemoryOrganizationRepository();
    const contactRepository = new InMemoryContactRepository();
    const addressRepository = new InMemoryAddressRepository();

    const activateOrganization = new ActivateOrganization(organizationRepository);
    const createOrganization = new CreateOrganization(
      organizationRepository,
      addressRepository,
      contactRepository,
      personRepository,
      customerRepository,
    );


    const response = await createOrganization.execute({
      email: "person@example.com",
      firstName: "Miguel",
      lastName: "Leite",
      phone: "123-456-7890",
      name: "ANHERC",
      instruction: Instruction.TECHNICAL,
      location: "Luanda, Angola",
      slug: "IPPA",
      primaryEmail: "person@example.com",
      primaryPhone: "123-456-78",
      packagesId: "fe4d04a6-9e2b-4ec8-affd-ba11a8cb2a61"
    });

    const { organization } = await activateOrganization.execute(response.organization.id);

    expect(organization?.created_at).toEqual(expect.any(Date));
  });

  it('should not be able to activate organization', async () => {
    const organizationRepository = new InMemoryOrganizationRepository();

    const activateOrganization = new ActivateOrganization(organizationRepository);


    expect(
      async () => await activateOrganization.execute('example-organization-id')
    ).rejects.toThrow(OrganizationNotFound);
  });
    
});
