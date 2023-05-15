import { Injectable } from "@nestjs/common";
import { Address } from "@app/entities/address";
import { AddressRepository } from "@app/repositories/address-repository";
import { PrismaService } from "../prisma.service";
import { PrismaAddressMapper } from "../mappers/prisma-address-mapper";

@Injectable()
export class PrismaAddressRepository implements AddressRepository {
  constructor(private prisma: PrismaService) {}

  async create(address: Address): Promise<void> {
    await this.prisma.addresses.create({
      data: PrismaAddressMapper.toPrisma(address),
    });
  }
  async save({ id, location }: Address): Promise<void> {
    await this.prisma.addresses.update({
      where: { id },
      data: { location },
    });
  }
}
