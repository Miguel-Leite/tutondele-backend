import { Package } from "@app/entities/package";

export abstract class PackageRepository {
  abstract findById(id: string): Promise<Package | null>;
  abstract findByName(id: string): Promise<Package | null>;
  abstract findAll(): Promise<Package[] | null>;
  abstract totalStudents(id: string): Promise<number | null>;
  abstract totalServices(id: string): Promise<number | null>;
  abstract totalUsers(id: string): Promise<number | null>;
  abstract totalAdmins(id: string): Promise<number | null>;
  abstract create(packag: Package): Promise<void>;
  abstract save(packag: Package): Promise<void>;
}