import { Injectable } from "@nestjs/common";
import { Organization } from "@app/entities/organization";
import { OrganizationRepository } from "@app/repositories/organization-repository";
import { PrismaService } from "../prisma.service";
import { PrismaOrganizationMapper } from "../mappers/prisma-organization-mapper";

@Injectable()
export class PrismaOrganizationRepository implements OrganizationRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Organization[]> {
    const organizations = await this.prisma.organizations.findMany();
    return PrismaOrganizationMapper.toDomainList(organizations);
  }
  async findById(organizationsId: string): Promise<Organization | null> {
    const organization = await this.prisma.organizations.findFirst({
      where: {
        id: organizationsId,
      }
    });

    if (!organization) {
      return null;
    }

    return PrismaOrganizationMapper.toDomain(organization);
  }
  async create(organization: Organization): Promise<void> {
    await this.prisma.organizations.create({
      data: PrismaOrganizationMapper.toPrisma(organization),
    });
  }
  async save(organization: Organization): Promise<void> {
    await this.prisma.organizations.updateMany({
      where: { id: organization.id },
      data: PrismaOrganizationMapper.toPrisma(organization),
    });
  }
}
