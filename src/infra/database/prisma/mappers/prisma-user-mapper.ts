import { Users as RawUser } from '@prisma/client';
import { User } from '@app/entities/user';

export class PrismaUserMapper {
  static toPrisma(user: User) {
    return {
      id: user.id,
      personsId: user.personsId,
      username: user.username,
      password: user.password,
      level: user.level,
      verified: user.verified,
      acceptTermsAndConditions: user.acceptTermsAndConditions,
    };
  }

  static toDomain(raw: RawUser): User {
    return new User(
      {
        username: raw.username,
        personsId: raw.personsId,
        password: raw.password,
        level: raw.level,
        removed: raw.removed,
        verified: raw.verified,
        created_at: raw.created_at,
        acceptTermsAndConditions: raw.acceptTermsAndConditions,
        ...raw.updated_at,
      },
      raw.id,
    );
  }

  static toDomainList(raw: RawUser[]): User[] {
    return raw.map((user) => this.toDomain(user));
  }
}
