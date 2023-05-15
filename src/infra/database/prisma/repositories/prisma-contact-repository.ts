import { Injectable } from "@nestjs/common";
import { Contact } from "@app/entities/contact";
import { ContactRepository } from "@app/repositories/contact-repository";
import { PrismaService } from "../prisma.service";
import { PrismaContactMapper } from "../mappers/prisma-contact-mapper";

@Injectable()
export class PrismaContactRepository implements ContactRepository {
  constructor(private prisma: PrismaService) {}

  async findByPrimaryEmail(email?: string | undefined): Promise<Contact | null> {
    const contact = await this.prisma.contacts.findFirst({
      where: {
        primaryEmail: email,
      }
    });

    if (!contact) {
      return null;
    }

    return PrismaContactMapper.toDomain(contact);
  }
  async findBySecundaryEmail(email?: string | undefined): Promise<Contact | null> {
    const contact = await this.prisma.contacts.findFirst({
      where: {
        secundaryEmail: email,
      }
    });

    if (!contact) {
      return null;
    }

    return PrismaContactMapper.toDomain(contact);
  }
  async findByPrimaryPhone(phone?: string | undefined): Promise<Contact | null> {
    const contact = await this.prisma.contacts.findFirst({
      where: {
        primaryPhone: phone,
      }
    });

    if (!contact) {
      return null;
    }

    return PrismaContactMapper.toDomain(contact);
  }
  async findBySecundaryPhone(phone?: string | undefined): Promise<Contact | null> {
    const contact = await this.prisma.contacts.findFirst({
      where: {
        secundaryPhone: phone,
      }
    });

    if (!contact) {
      return null;
    }

    return PrismaContactMapper.toDomain(contact);
  }
  async create(contact: Contact): Promise<void> {
    await this.prisma.contacts.create({
      data: PrismaContactMapper.toPrisma(contact),
    })
  }
  async save(contact: Contact): Promise<void> {
    await this.prisma.contacts.updateMany({
      where: { id: contact.id },
      data:PrismaContactMapper.toPrisma(contact),
    })
  }
}
