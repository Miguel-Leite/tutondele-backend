import { Contact } from "./contact";

describe('Contact', () => {
  it('should be able to create contact', () => {
    const contact = new Contact({
      primaryEmail: "schoolemail1@gschool.com",
      secundaryEmail: "schoolemail2@gschool.com",
      primaryPhone: "+244233478390",
      secundaryPhone: "+244944995020",
    });

    expect(contact).toBeTruthy();
  });
});
