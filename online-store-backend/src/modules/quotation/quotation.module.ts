import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { QuotationService } from './quotation.service';
import { QuotationController } from './quotation.controller';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
      baseURL: 'https://www.melhorenvio.com.br/api/v2/me/',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
      },
    }),
  ],
  providers: [QuotationService],
  controllers: [QuotationController],
  exports: [QuotationService],
})
export class QuotationModule {}
