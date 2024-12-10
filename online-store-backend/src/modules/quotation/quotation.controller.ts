import { Controller, Post, Body } from '@nestjs/common';
import { QuotationService } from './quotation.service';
import { QuoteDataDto } from './dto/quote-data.dto';

@Controller('quotation')
export class QuotationController {
  constructor(private readonly quotationService: QuotationService) {}

  @Post('calculate')
  async calculateQuote(@Body() quoteData: QuoteDataDto) {
    return this.quotationService.quote(quoteData);
  }
}
