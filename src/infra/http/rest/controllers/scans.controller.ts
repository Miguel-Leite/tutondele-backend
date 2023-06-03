import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ScansVoucherService } from '../services/scans-voucher.service';

@Controller('scans')
export class ScansController {
  
  constructor(
    private scansVoucherService: ScansVoucherService,
  ) {}

  @Post('voucher/multibox')
  @UseInterceptors(FileInterceptor('file'))
  async multibox(@UploadedFile() file: Buffer) {
    return await this.scansVoucherService.recognizeImage(file);
  }
}
