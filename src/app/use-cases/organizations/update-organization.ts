import { Injectable } from "@nestjs/common";
import { Instruction } from "@prisma/client";

import { Contact } from "@app/entities/contact";
import { Address } from "@app/entities/address";
import { OrganizationRepository } from "@app/repositories/organization-repository";
import { AddressRepository } from "@app/repositories/address-repository";
import { ContactRepository } from "@app/repositories/contact-repository";
import { Organization } from "@app/entities/organization";

import { OrganizationNotFound } from "./errors/organization-not-found";

interface UpdateOrganizationRequest {
  id                      : string;
  packagesId              : string;
  name                    : string;
  slug                    : string;
  instruction             : Instruction;
  is_active?              : boolean;
  primaryPhone            : string;
  secundaryPhone?         : string;
  primaryEmail            : string;
  secundaryEmail?         : string;
  location                : string;
}

interface UpdateOrganizationResponse {
  organization: Organization;
}

@Injectable()
export class UpdateOrganization {
  constructor(
    private organizationRepository: OrganizationRepository,
    private addressRepository: AddressRepository,
    private contactRepository: ContactRepository,
  ){}

  async execute(request: UpdateOrganizationRequest): Promise<UpdateOrganizationResponse>{
    const {
      id,
      name,
      packagesId,
      slug,
      is_active,
      instruction,
      primaryEmail,
      secundaryEmail,
      primaryPhone,
      secundaryPhone,
      location,
    } = request;

    const organizationExists = await this.organizationRepository.findById(id);

    if (!organizationExists) {
      throw new OrganizationNotFound()
    }

    const address = new Address({
      location
    },organizationExists.addressesId);


    const contact = new Contact({
      primaryEmail,
      primaryPhone,
      secundaryEmail,
      secundaryPhone,
    },organizationExists.contactsId);

    const organization = new Organization({
      name,
      packagesId,
      slug,
      is_active,
      instruction,
      addressesId: organizationExists.id,
      contactsId: organizationExists.id,
    },organizationExists.id);

    await Promise.all([
      await this.addressRepository.save(address),
      await this.contactRepository.save(contact),
      await this.organizationRepository.save(organization),
    ]);

    return { organization }
  }
}
