import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from "bcryptjs";

import { CustomerRepository } from "@app/repositories/customer-repository";
import { OrganizationRepository } from '@app/repositories/organization-repository';

interface AuthCustomerServiceRequest {
  email: string;
  password: string;
}

export interface AuthCustomerServiceResponse {
  access_token: string;
}

@Injectable()
export class AuthCustomerService {
  constructor(
    private customerRepository: CustomerRepository,
    private organizationRepository: OrganizationRepository,
    private jwtService: JwtService
  ) { }

  async execute({ email, password }: AuthCustomerServiceRequest): Promise<string> {
    const customer = await this.customerRepository.findByEmail(email);

    if (!customer) {
      throw new UnauthorizedException();
    }

    const passwordMatched = await compare(password, customer.password);

    if (!passwordMatched) {
      throw new UnauthorizedException();
    }

    if (!customer.verified) {
      throw new UnauthorizedException();
    }

    const organization = await this.organizationRepository.findById(customer.organizationsId);
    if (organization && !organization.is_active) {
      throw new Error("The school account is not active on the platform!");
    }

    if (organization && organization.removed) {
      throw new Error("The school account is not active on the platform!");
    }

    const payload = { 
      sub: customer.id, 
      level: customer.level, 
      organizationsId: customer.organizationsId 
    };
    
    return await this.jwtService.signAsync(payload);
  }
}