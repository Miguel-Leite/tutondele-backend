import { InMemoryAddressRepository } from "@test/repositories/in-memory-address-repository";
import { InMemoryContactRepository } from "@test/repositories/in-memory-contact-repository";
import { InMemoryCustomerRepository } from "@test/repositories/in-memory-customer";
import { InMemoryOrganizationRepository } from "@test/repositories/in-memory-organization-repository";
import { InMemoryPersonRepository } from "@test/repositories/in-memory-person-repository";
import { CreateOrganization } from "./create-organization";
import { makeContact } from "@test/factories/contact-factory";

import { Instruction } from "@prisma/client";
import { OrganizationPhoneExists } from "./errors/organization-phone-exists";
import { OrganizationEmailExists } from "./errors/organization-email-exits";

describe('Create Organization use case', () => {
  it('should be able to create a organization', async () => {
    const personRepository = new InMemoryPersonRepository();
    const customerRepository = new InMemoryCustomerRepository(personRepository);;
    const organizationRepository = new InMemoryOrganizationRepository();
    const contactRepository = new InMemoryContactRepository();
    const addressRepository = new InMemoryAddressRepository();

    const createOrganization = new CreateOrganization(
      organizationRepository,
      addressRepository,
      contactRepository,
      personRepository,
      customerRepository,
    );
    

    const { organization } = await createOrganization.execute({
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
      licensesId: "fe4d04a6-9e2b-4ec8-affd-ba11a8cb2a61"
    });

    expect(organizationRepository.organizations).toHaveLength(1);
    expect(organizationRepository.organizations[0]).toEqual(organization);
  });
  
  it('should not be able to create an organization because of existing contact', async () => {
    const personRepository = new InMemoryPersonRepository();
    const customerRepository = new InMemoryCustomerRepository(personRepository);;
    const organizationRepository = new InMemoryOrganizationRepository();
    const contactRepository = new InMemoryContactRepository();
    const addressRepository = new InMemoryAddressRepository();

    const createOrganization = new CreateOrganization(
      organizationRepository,
      addressRepository,
      contactRepository,
      personRepository,
      customerRepository,
    );
    

    const contact = makeContact({
      primaryPhone: "123-456-78",
    });

    await contactRepository.create(contact)

    expect(async () => {
      await createOrganization.execute({
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
        licensesId: "fe4d04a6-9e2b-4ec8-affd-ba11a8cb2a61"
      })
    }).rejects.toThrow(OrganizationPhoneExists);
  });

  it('should not be able to create an organization because of existing email', async () => {
    const personRepository = new InMemoryPersonRepository();
    const customerRepository = new InMemoryCustomerRepository(personRepository);;
    const organizationRepository = new InMemoryOrganizationRepository();
    const contactRepository = new InMemoryContactRepository();
    const addressRepository = new InMemoryAddressRepository();
    
    const createOrganization = new CreateOrganization(
      organizationRepository,
      addressRepository,
      contactRepository,
      personRepository,
      customerRepository,
    );
    

    const contact = makeContact({
      primaryEmail: "person@example.com",
    });

    await contactRepository.create(contact)

    expect(async () => {
      await createOrganization.execute({
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
        licensesId: "fe4d04a6-9e2b-4ec8-affd-ba11a8cb2a61"
      })
    }).rejects.toThrow(OrganizationEmailExists);
  });
});
