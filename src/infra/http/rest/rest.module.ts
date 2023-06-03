import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';

import { ScansController } from './controllers/scans.controller';
import { ScansVoucherService } from './services/scans-voucher.service';
import multer from 'multer';

// const storage = multer.memoryStorage();
@Module({
  imports: [
    MulterModule.register({
      dest: './public',
    }),
  ],
  controllers: [
    ScansController
  ],
  providers: [
    ScansVoucherService,
  ]
})
export class RestModule {}
