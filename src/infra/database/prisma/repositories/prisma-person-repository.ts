import { Person } from '@app/entities/person';
import { User } from '@app/entities/user';
import { PersonRepository } from '@app/repositories/person-repository';
import { Injectable } from '@nestjs/common';
import { PrismaPersonMapper } from '../mappers/prisma-person-mapper';
import { PrismaUserMapper } from '../mappers/prisma-user-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaPersonRepository implements PersonRepository {
  constructor(private prisma: PrismaService) {}

  async findById(personsId: string): Promise<Person | null> {
    const person = await this.prisma.persons.findFirst({
      where: { id: personsId, removed: null },
    });

    if (!person) {
      return null;
    }

    return PrismaPersonMapper.toDomain(person);
  }
  async findByBI(bi: string): Promise<Person | null> {
    const person = await this.prisma.persons.findFirst({
      where: { bi, removed: null },
    });

    if (!person) {
      return null;
    }

    return PrismaPersonMapper.toDomain(person);
  }
  async findByEmail(email: string): Promise<Person | null> {
    const person = await this.prisma.persons.findUnique({
      where: { email },
    });

    if (!person) {
      return null;
    }

    return PrismaPersonMapper.toDomain(person);
  }
  async findAll(): Promise<User[]> {
    const users = await this.prisma.users.findMany({
      where: { removed: null },
    });
    return await PrismaUserMapper.toDomainList(users);
  }
  async create(person: Person): Promise<void> {
    await this.prisma.persons.create({
      data: PrismaPersonMapper.toPrisma(person),
    });
  }
  async save(person: Person): Promise<void> {
    await this.prisma.persons.updateMany({
      where: { id: person.id },
      data: PrismaPersonMapper.toPrisma(person),
    });
  }
}
