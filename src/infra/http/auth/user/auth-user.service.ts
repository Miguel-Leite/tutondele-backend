import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';

import { UserRepository } from '@app/repositories/user-repository';

interface AuthUserServiceRequest {
  email: string;
  password: string;
}

export interface AuthUserServiceResponse {
  access_token: string;
}

@Injectable()
export class AuthUserService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async execute({ email, password }: AuthUserServiceRequest): Promise<string> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException();
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new UnauthorizedException();
    }

    if (!user.verified) {
      throw new UnauthorizedException();
    }

    if (user.level !== 'MASTER') {
      throw new UnauthorizedException();
    }

    const payload = {
      sub: user.id,
      level: user.level,
    };

    return await this.jwtService.signAsync(payload);
  }
}
