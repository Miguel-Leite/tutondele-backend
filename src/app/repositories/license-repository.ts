import { License } from "@app/entities/license";

export abstract class LicenseRepository {
  abstract findById(id: string): Promise<License | null>;
  abstract findByCode(id: string): Promise<License | null>;
  abstract findAll(): Promise<License[] | null>;
  abstract create(license: License): Promise<void>;
  abstract save(license: License): Promise<void>;
}