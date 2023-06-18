import { Contact } from '@app/entities/contact';
import { ContactRepository } from '@app/repositories/contact-repository';

export class InMemoryContactRepository implements ContactRepository {
  public contacts: Contact[] = [];
  async findById(id: string): Promise<Contact | null> {
    const contact = this.contacts.find((item) => item.id === id);

    if (!contact) {
      return null;
    }

    return contact;
  }
  async findByPrimaryEmail(
    email?: string | undefined,
  ): Promise<Contact | null> {
    const contact = this.contacts.find((item) => item.primaryEmail === email);

    if (!contact) {
      return null;
    }

    return contact;
  }

  async findBySecundaryEmail(
    email?: string | undefined,
  ): Promise<Contact | null> {
    const contact = this.contacts.find((item) => item.secundaryEmail === email);

    if (!contact) {
      return null;
    }

    return contact;
  }

  async findByPrimaryPhone(
    phone?: string | undefined,
  ): Promise<Contact | null> {
    const contact = this.contacts.find((item) => item.primaryPhone === phone);

    if (!contact) {
      return null;
    }

    return contact;
  }

  async findBySecundaryPhone(
    phone?: string | undefined,
  ): Promise<Contact | null> {
    const contact = this.contacts.find((item) => item.secundaryPhone === phone);

    if (!contact) {
      return null;
    }

    return contact;
  }
  async findByPhone(phone?: string | undefined): Promise<Contact | null> {
    throw new Error('Method not implemented.');
  }

  async create(contact: Contact): Promise<void> {
    this.contacts.push(contact);
  }
  async save(contact: Contact): Promise<void> {
    const addressIndex = this.contacts.findIndex(
      (item) => item.id === contact.id,
    );

    if (addressIndex >= 0) {
      this.contacts[addressIndex] = contact;
    }
  }
}
