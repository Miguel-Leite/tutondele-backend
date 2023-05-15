export class OrganizationEmailExists extends Error {
  constructor(email?: string) {
    super(`E-mail school ${email?email:''} already exists.`);
  }
}
