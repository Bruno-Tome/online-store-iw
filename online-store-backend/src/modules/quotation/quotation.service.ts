import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { QuoteDataDto } from './dto/quote-data.dto';

@Injectable()
export class QuotationService {
  private api;

  constructor(private readonly httpService: HttpService) {
    this.api = this.httpService.axiosRef;
  }

  async quote(quoteData: QuoteDataDto): Promise<any> {
    try {
      quoteData.services = '1,2,3,4';
      const response = (await this.api.post(
        '/shipment/calculate',
        quoteData,
      )) as {
        data: [
          {
            id: number;
            name: string;
            price: string;
            custom_price: string;
            discount: string;
            currency: string;
            delivery_time: number;
            delivery_range: {
              min: number;
              max: number;
            };
            custom_delivery_time: number;
            custom_delivery_range: {
              min: number;
              max: number;
            };
            packages: [];
            additional_services: {
              receipt: boolean;
              own_hand: boolean;
              collect: boolean;
            };
            additional: {};
            company: {};
          },
        ];
      };

      return response.data;
    } catch (error) {
      console.log('error', error);
      throw new HttpException(
        error.response?.data || error.message,
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
