export class OrganizationEmailExists extends Error {
  constructor() {
    super(`E-mail school already exists.`);
  }
}
