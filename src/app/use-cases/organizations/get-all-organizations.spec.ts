import { Instruction } from '@prisma/client';
import { InMemoryAddressRepository } from '@test/repositories/in-memory-address-repository';
import { InMemoryContactRepository } from '@test/repositories/in-memory-contact-repository';
import { InMemoryCustomerRepository } from '@test/repositories/in-memory-customer';
import { InMemoryOrganizationRepository } from '@test/repositories/in-memory-organization-repository';
import { InMemoryPersonRepository } from '@test/repositories/in-memory-person-repository';
import { CreateOrganization } from './create-organization';
import { GetAllOrganizations } from './get-all-organizations';
import { InMemoryLicenseRepository } from '@test/repositories/in-memory-license-repository';

describe('Get All Organizations use case', () => {
  it('should be able to get all organizations', async () => {
    const licenseRepository = new InMemoryLicenseRepository();
    const personRepository = new InMemoryPersonRepository();
    const customerRepository = new InMemoryCustomerRepository(personRepository);
    const organizationRepository = new InMemoryOrganizationRepository();
    const contactRepository = new InMemoryContactRepository();
    const addressRepository = new InMemoryAddressRepository();

    const getAllOrganizations = new GetAllOrganizations(
      organizationRepository,
      licenseRepository,
    );
    const createOrganization = new CreateOrganization(
      organizationRepository,
      addressRepository,
      contactRepository,
      personRepository,
      customerRepository,
    );

    await createOrganization.execute({
      email: 'person@example.com',
      firstName: 'Miguel',
      lastName: 'Leite',
      phone: '123-456-7890',
      name: 'ANHERC',
      instruction: Instruction.TECHNICAL,
      location: 'Luanda, Angola',
      slug: 'IPPA',
      primaryEmail: 'person@example.com',
      primaryPhone: '123-456-78',
      licensesId: 'fe4d04a6-9e2b-4ec8-affd-ba11a8cb2a61',
    });

    const { organizations } = await getAllOrganizations.execute();

    expect(organizations[0].created_at).toEqual(expect.any(Date));
  });
});
