import { Injectable } from '@nestjs/common';
import { ContactRepository } from '@app/repositories/contact-repository';
import { Contact } from '@app/entities/contact';
import { ContactNotFound } from './errors/organization-contact-not-found';

interface GetByIdContactResponse {
  contact: Contact | null;
}

@Injectable()
export class GetByIdContact {
  constructor(private contactRepository: ContactRepository) {}

  async execute(id: string): Promise<GetByIdContactResponse> {
    const contact = await this.contactRepository.findById(id);

    if (!contact) {
      throw new ContactNotFound();
    }

    return { contact };
  }
}
