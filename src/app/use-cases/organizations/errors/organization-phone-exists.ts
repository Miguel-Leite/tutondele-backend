export class OrganizationPhoneExists extends Error {
  constructor(phone?: string) {
    super(`Number phone ${phone?phone:''} school already exists.`);
  }
}
