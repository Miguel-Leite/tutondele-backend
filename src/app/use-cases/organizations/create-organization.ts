import { Injectable } from "@nestjs/common";
import { Instruction } from "@prisma/client";
import { hash } from 'bcryptjs';

import { Contact } from "@app/entities/contact";
import { Address } from "@app/entities/address";
import { Customer } from "@app/entities/customer";
import { Person } from "@app/entities/person";
import { OrganizationRepository } from "@app/repositories/organization-repository";
import { Username } from "@app/entities/username";
import { AddressRepository } from "@app/repositories/address-repository";
import { ContactRepository } from "@app/repositories/contact-repository";
import { CustomerRepository } from "@app/repositories/customer-repository";
import { PersonRepository } from "@app/repositories/person-repository";
import { Organization } from "@app/entities/organization";
import { CustomerEmailExists } from "../customers/errors/customer-email-exists";
import { OrganizationEmailExists } from "./errors/organization-email-exits";
import { OrganizationPhoneExists } from "./errors/organization-phone-exists";

interface CreateOrganizationRequest {
  licensesId              : string;
  name                    : string;
  slug                    : string;
  instruction             : Instruction;
  is_active?              : boolean;
  primaryPhone            : string;
  secundaryPhone?         : string;
  primaryEmail            : string;
  secundaryEmail?         : string;
  location                : string;

  firstName: string;
  lastName: string;
  phone:  string | null;
  email:  string;
}

interface CreateOrganizationResponse {
  organization: Organization;
}

@Injectable()
export class CreateOrganization {
  constructor(
    private organizationRepository: OrganizationRepository,
    private addressRepository: AddressRepository,
    private contactRepository: ContactRepository,
    private personRepository: PersonRepository,
    private customerRepository: CustomerRepository,
  ){}

  async execute(request: CreateOrganizationRequest): Promise<CreateOrganizationResponse>{
    const {
      firstName,
      lastName,
      phone,
      email,
      
      name,
      licensesId,
      slug,
      is_active,
      instruction,
      primaryEmail,
      secundaryEmail,
      primaryPhone,
      secundaryPhone,
      location,
    } = request;

    const address = new Address({
      location
    });

    const contact = new Contact({
      primaryEmail,
      primaryPhone,
      secundaryEmail,
      secundaryPhone,
    });

    const emailUserExists = await this.personRepository.findByEmail(email);

    if (emailUserExists) {
      throw new CustomerEmailExists();
    }

    const primaryEmailOrganizationExists = await this.contactRepository.findByPrimaryEmail(primaryEmail);

    if (primaryEmailOrganizationExists) {
      throw new OrganizationEmailExists(primaryEmail);
    }

    const secundaryEmailOrganizationExists = await this.contactRepository.findBySecundaryEmail(secundaryEmail);

    if (secundaryEmailOrganizationExists) {
      throw new OrganizationEmailExists(secundaryEmail);
    }

    const primaryPhoneOrganizationExists = await this.contactRepository.findByPrimaryPhone(primaryPhone);

    if (primaryPhoneOrganizationExists) {
      throw new OrganizationPhoneExists(primaryPhone);
    }

    const secundaryPhoneOrganizationExists = await this.contactRepository.findBySecundaryPhone(secundaryPhone);

    if (secundaryPhoneOrganizationExists) {
      throw new OrganizationPhoneExists(secundaryPhone);
    }

    const organization = new Organization({
      name,
      licensesId,
      slug,
      is_active,
      instruction,
      addressesId: address.id,
      contactsId: contact.id,
    });

    const person = new Person({
      firstName,
      lastName,
      phone,
      email,
    });

    const username = new Username(email);
    const password = await hash("password", 10);

    const customer = new Customer({
      level: "ADMIN",
      organizationsId: organization.id,
      personsId: person.id,
      username: username.value,
      acceptTermsAndConditions: true,
      password,
    })

    await Promise.all([
      await this.addressRepository.create(address),
      await this.contactRepository.create(contact),
      await this.organizationRepository.create(organization),
      await this.personRepository.create(person),
      await this.customerRepository.create(customer),
    ]);

    return { organization }
  }
}
