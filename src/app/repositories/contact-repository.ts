import { Contact } from "@app/entities/contact";

export abstract class ContactRepository {
  abstract findByPrimaryEmail(email?: string): Promise<Contact | null>;
  abstract findBySecundaryEmail(email?: string): Promise<Contact | null>;
  abstract findByPrimaryPhone(phone?: string): Promise<Contact | null>;
  abstract findBySecundaryPhone(phone?: string): Promise<Contact | null>;
  abstract create(contact: Contact): Promise<void>;
  abstract save(contact: Contact): Promise<void>;
}
