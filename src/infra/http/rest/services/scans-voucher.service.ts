import { Injectable } from '@nestjs/common';
import { createWorker, Worker } from 'tesseract.js';

@Injectable()
export class ScansVoucherService {
  private worker: Promise<Worker>;

  constructor() {
    this.worker = createWorker({
      langPath: './tessdata',
    });
  }

  async recognizeImage(imageBuffer: Buffer) {
    try {
      const workerInstance = await this.worker;
      await workerInstance.load();
      await workerInstance.loadLanguage('por');
      await workerInstance.initialize('por');
      const { data } = await workerInstance.recognize(imageBuffer);
      const voucherText = data.text;

      const regexID = /AOO\d{11}/;
      const matchID = voucherText.match(regexID);
      const regexTransaction = /TRANSACÇÃO: (\d{5})/;
      const matchTransaction = voucherText.match(regexTransaction);

      if (matchID && matchID[0] && matchTransaction && matchTransaction[0]) {
        const [, code] = matchTransaction[0].split('TRANSACÇÃO: ');
        const voucherId = matchID[0];
        return {
          success: true,
          id: voucherId,
          code: Number(code),
        };
      }

      return {
        success: false,
        message: 'Unable to read image or find transaction code and ID',
      };
      
    } catch (error) {

      return {
        success: false,
        message: 'Something went wrong during OCR',
      };
    }
  }

}
