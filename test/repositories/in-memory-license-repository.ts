import { License } from "@app/entities/license";
import { LicenseRepository } from "@app/repositories/license-repository";

export class InMemoryLicenseRepository implements LicenseRepository {
  public licenses: License[] = [];

  async findById(id: string): Promise<License | null> {
    const license = this.licenses.find((item) => item.id === id);

    if (!license) {
      return null;
    }

    return license;
  }
  async findByCode(code: string): Promise<License | null> {
    const license = this.licenses.find((item) => item.code === code);

    if (!license) {
      return null;
    }

    return license;
  }
  async findAll(): Promise<License[] | null> {
    if (!this.licenses) {
      return [];
    }

    return this.licenses;
  }

  async create(license: License): Promise<void> {
    this.licenses.push(license);
  }
  async save(license: License): Promise<void> {
    const licenseIndex = this.licenses.findIndex((item) => item.id === license.id);

    if (licenseIndex >= 0) {
      this.licenses[licenseIndex] = license;
    }
  }
}
