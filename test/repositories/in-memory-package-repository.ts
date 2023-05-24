import { Package } from "@app/entities/package";
import { PackageRepository } from "@app/repositories/package-repository";


export class InMemoryPackageRepository implements PackageRepository {
  public packages: Package[] = [];

  async findById(id: string): Promise<Package | null> {
    const packag = this.packages.find((item) => item.id === id);

    if (!packag) {
      return null;
    }

    return packag;
  }
  async findByName(name: string): Promise<Package | null> {
    const packag = this.packages.find((item) => item.name === name);

    if (!packag) {
      return null;
    }

    return packag;
  }
  async findAll(): Promise<Package[] | null> {
    if (!this.packages) {
      return [];
    }

    return this.packages;
  }
  async totalStudents(id: string): Promise<number | null> {
    const packag = this.packages.find((item) => item.id === id);
    if (!packag) {
      return null;
    }

    return packag.students;
  }
  async totalServices(id: string): Promise<number | null> {
    const packag = this.packages.find((item) => item.id === id);
    if (!packag) {
      return null;
    }

    return packag.services;
  }
  async totalUsers(id: string): Promise<number | null> {
    const packag = this.packages.find((item) => item.id === id);
    if (!packag) {
      return null;
    }

    return packag.users;
  }
  async totalAdmins(id: string): Promise<number | null> {
    const packag = this.packages.find((item) => item.id === id);
    if (!packag) {
      return null;
    }

    return packag.admins;
  }
  async create(packag: Package): Promise<void> {
    this.packages.push(packag);
  }
  async save(packag: Package): Promise<void> {
    const packageIndex = this.packages.findIndex((item) => item.id === packag.id);

    if (packageIndex >= 0) {
      this.packages[packageIndex] = packag;
    }
  }
}
