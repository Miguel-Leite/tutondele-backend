import { User } from '@app/entities/user';
import { UserRepository } from '@app/repositories/user-repository';
import { Injectable } from '@nestjs/common';
import { PrismaUserMapper } from '../mappers/prisma-user-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}
  async findById(usersId: string): Promise<User | null> {
    const user = await this.prisma.users.findUnique({
      where: { id: usersId },
    });

    if (!user) {
      return null;
    }

    return PrismaUserMapper.toDomain(user);
  }
  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.users.findFirst({
      where: {
        persons: {
          email,
        }
      },
    });

    if (!user) {
      return null;
    }

    return PrismaUserMapper.toDomain(user);
  }
  async findAll(): Promise<User[]> {
    const users = await this.prisma.users.findMany();
    return await PrismaUserMapper.toDomainList(users);
  }
  async create(user: User): Promise<void> {
    await this.prisma.users.create({
      data: PrismaUserMapper.toPrisma(user),
    });
  }
  async save({ id, ...data }: User): Promise<void> {
    await this.prisma.users.update({
      where: { id },
      data,
    });
  }
}
