import { IdentityService } from '@infra/http/identity.service';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { IdentityModel } from '../dtos/models/identity-model';

@Resolver()
export class IdentityResolver {
  constructor(private identityService: IdentityService) {}

  @Query(() => IdentityModel)
  async identity(@Args('bi') bi: string) {
    return await this.identityService.execute(bi);
  }
}
