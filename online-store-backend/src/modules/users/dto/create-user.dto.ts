import { IsString, IsEmail, IsNotEmpty, MinLength ,IsOptional, IsEnum} from 'class-validator';
import { ApiProperty, ApiBody } from '@nestjs/swagger';

export class CreateUserDto {

        
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;
    @ApiProperty()
    @IsEmail()
    email: string;
    @ApiProperty()
    @IsString()
    @MinLength(6)
    password: string;

    @IsOptional()
    @IsEnum(['user', 'admin'])
    @ApiProperty({
        enum: ['user', 'admin'],
        default: ['user'],
    })
        
    roles: [string] =[ 'user'];
}
