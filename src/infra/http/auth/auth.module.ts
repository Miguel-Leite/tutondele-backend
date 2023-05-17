import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import authConfig from "./config";
import { DatabaseModule } from '@infra/database/database.module';
import { AuthCustomerService } from './customer/auth-customer.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: authConfig.jwt.secret,
      signOptions: { expiresIn: authConfig.jwt.expiresIn },
    }),
    DatabaseModule,
  ],
  providers: [
    AuthCustomerService,
  ],
  exports: [AuthCustomerService],
})
export class AuthModule {}
