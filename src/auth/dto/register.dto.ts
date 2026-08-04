import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../generated/prisma/enums';

export class RegisterDto {
  // ID for postman test only
  @IsOptional()
  id?: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'John Doe',
    description: 'User name',
  })
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'User email',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'password123',
    description: 'User password',
  })
  password: string;

  @IsOptional()
  @IsEnum(Role)
  @ApiProperty({
    example: 'user',
    description: 'User role',
  })
  role: Role;
}
