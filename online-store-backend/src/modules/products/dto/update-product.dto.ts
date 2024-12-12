import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  price: number;

  @IsArray()
  @IsOptional()
  images: string[];

  @IsNumber()
  @IsOptional()
  @Min(0)
  stock: number;

  @IsObject()
  @IsOptional()
  dimensions: { width: number; height: number; length: number; weight: number };
}
