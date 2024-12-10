import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsObject,
  IsArray,
  ValidateNested,
} from 'class-validator';

// {
//   "from": {
//       "postal_code": "96020360"
//   },
//   "to": {
//       "postal_code": "01018020"
//   },
//   "products": [
//       {
//           "id": "x",
//           "width": 11,
//           "height": 17,
//           "length": 11,
//           "weight": 0.3,
//           "insurance_value": 10.1,
//           "quantity": 1
//       }
//   ],

// }

class Product {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsNumber()
  @IsNotEmpty()
  width: number;

  @IsNumber()
  @IsNotEmpty()
  height: number;

  @IsNumber()
  @IsNotEmpty()
  length: number;

  @IsNumber()
  @IsNotEmpty()
  weight: number;

  @IsNumber()
  @IsNotEmpty()
  insurance_value: number;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}

export class QuoteDataDto {
  @IsObject()
  @IsNotEmpty()
  from: {
    postal_code: string;
  };

  @IsObject()
  @IsNotEmpty()
  to: {
    postal_code: string;
  };

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Product)
  products: Product[];
}
