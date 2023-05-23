import { Instruction } from "@prisma/client";
import { InMemoryAddressRepository } from "@test/repositories/in-memory-address-repository";
import { InMemoryContactRepository } from "@test/repositories/in-memory-contact-repository";
import { InMemoryCustomerRepository } from "@test/repositories/in-memory-customer";
import { InMemoryOrganizationRepository } from "@test/repositories/in-memory-organization-repository";
import { InMemoryPersonRepository } from "@test/repositories/in-memory-person-repository";
import { CreateOrganization } from "./create-organization";
import { OrganizationNotFound } from "./errors/organization-not-found";
import { UpdateOrganization } from "./update-organization";


describe('Update Organization use case', () => {
  it('should be able to update organization', async () => {
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

    const updateOrganization = new UpdateOrganization(
      organizationRepository,
      addressRepository,
      contactRepository,
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

    const { organization } = await updateOrganization.execute({
      id: response.organization.id,
      name: "ANHERC",
      instruction: Instruction.TECHNICAL,
      location: "Luanda, Angola",
      slug: "IPPA",
      primaryEmail: "person@example.com",
      primaryPhone: "123-456-78",
      packagesId: "fe4d04a6-9e2b-4ec8-affd-ba11a8cb2a61",
    });

    expect(organization?.created_at).toEqual(expect.any(Date));
  });

  it('should not be able to update organization', async () => {
    const organizationRepository = new InMemoryOrganizationRepository();
    const contactRepository = new InMemoryContactRepository();
    const addressRepository = new InMemoryAddressRepository();

    const updateOrganization = new UpdateOrganization(
      organizationRepository,
      addressRepository,
      contactRepository,
    );


    expect(
      async () => await updateOrganization.execute({
        id: 'example-organization-id',
        name: "ANHERC",
        instruction: Instruction.TECHNICAL,
        location: "Luanda, Angola",
        slug: "IPPA",
        primaryEmail: "person@example.com",
        primaryPhone: "123-456-78",
        packagesId: "fe4d04a6-9e2b-4ec8-affd-ba11a8cb2a61",
      })
    ).rejects.toThrow(OrganizationNotFound);
  });
    
});
