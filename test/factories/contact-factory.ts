import { Contact, ContactsProps } from '@app/entities/contact';

type Override = Partial<ContactsProps>;

export function makeContact(override: Override = {}) {
  return new Contact({
    primaryEmail: "schoolemail1@gschool.com",
    secundaryEmail: "schoolemail2@gschool.com",
    primaryPhone: "+244233478390",
    secundaryPhone: "+244944995020",
    created_at: new Date(),
    ...override,
  });
}
