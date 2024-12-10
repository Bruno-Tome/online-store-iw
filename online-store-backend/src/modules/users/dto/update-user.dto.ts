import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty()
  @IsString()
  @IsOptional()
  name: string;
  @IsString()
  @IsOptional()
  @ApiProperty()
  email: string;
  @IsString()
  @IsOptional()
  @ApiProperty()
  password: string;
  @ApiProperty({
    enum: ['user', 'admin'],
    default: ['user'],
  })
  @IsOptional()
  roles: [string];

  @IsOptional()
  @IsString()
  @ApiProperty()
  CEP: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  address: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  phone: string;
}
